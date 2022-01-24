import { TreeItem, TreeView, TreeItemProps, treeItemClasses } from '@mui/lab/'
import { ReactNode } from 'react'
import { styled } from '@mui/material/styles';
import { Box, Typography, SvgIconProps } from '@mui/material';

interface INavTreeProps {
  children: ReactNode;
  subtitle: string;
  defaultIcon: ReactNode;
}

declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon?: React.ElementType<SvgIconProps>;
  labelText: string;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)',
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
  
}));

function StyledTreeItem(props: StyledTreeItemProps) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box 
          sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              p: 0.5, 
              pr: 0,
              color: 'rgba(0,0,0,0.87)',
            }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 4 }} />
          <Typography 
            variant="body2" 
            sx={{ 
                fontWeight: 400, 
                flexGrow: 1,
                fontSize: 16,
              }}>
            {labelText}
          </Typography>
        </Box>
      }
     
      {...other}
    />
  );
}


export function NavTreeLink({defaultIcon, children, subtitle}:INavTreeProps) {
  return (
    <TreeView
        aria-label="menu tree"
        sx={{ 
          height: 'auto', 
          flexGrow: 1,
          overflowY: 'auto', 
          marginBottom: 2 ,
          color: 'rgba(0,0,0,0.87)',
          fontSize: 14,
          padding: '4px 16px',
          width: '100% '
        }}
        defaultCollapseIcon={defaultIcon}
        defaultExpandIcon={defaultIcon }
      >
      <StyledTreeItem 
        nodeId="1" 
        labelText={subtitle}
        bgColor="#fcefe3"
        >
        {children}
      </StyledTreeItem>

    </TreeView>
  )
}