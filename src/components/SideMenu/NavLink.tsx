import { ListItem, ListItemText, List, IconProps, ListItemIcon} from "@mui/material";
import Link, {LinkProps}  from 'next/link'

interface ILinkProps extends LinkProps {
  text: string;
  icon: any;
}

export function NavLink({text, icon, ...rest}: ILinkProps) {
  return (
    <Link {...rest}>
      <ListItem button >
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </Link>
  )
}