import { List, Divider, ListSubheader } from "@mui/material";
import { ReactNode } from "react";

interface INavSectionProps {
  title: string;
  children: ReactNode;
  subtitle?: string;
}

export function NavSection({children, title}: INavSectionProps) {
  return (
    <>  
      <List 
      sx={{
        padding: '0 10px',
      }}
        subheader={
          <ListSubheader component="div">
            {title}
          </ListSubheader>
        }
      >
        {children}
      </List>
      <Divider />
    </>
  )
}''