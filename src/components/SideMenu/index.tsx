import { Drawer,  Box } from "@mui/material";
import { TreeItem, TreeView } from '@mui/lab/'
import { useSidebarDrawer } from "../../contexts/SideBarContext";
import { NavSection } from "./NavSection";
import { NavLink } from "./NavLink";
import { NavTreeLink } from "./NavTreeLink";

import HomeIcon from '@mui/icons-material/Home';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export function SideMenu() {

  const { isOpen, handleDrawer } = useSidebarDrawer()

  return (
    <Drawer
      open={isOpen}
      onClose={() => {handleDrawer()}}
      >
      <Box
        sx={{ width: 250 }}
        role="presentation"
      >
        {/* TreeItemSection */}
      {/* <NavSection title="Chapeira" subtitle="Lojas" >
        <NavTreeLink subtitle={"lojas"} defaultIcon={<Mail />}>
              <TreeItem nodeId="2" label="Lista" />
              <TreeItem nodeId="3" label="Criar" />
        </NavTreeLink>
        <NavTreeLink subtitle={"Faturas"} defaultIcon={<Mail />}>
              <TreeItem nodeId="2" label="Lista" />
              <TreeItem nodeId="3" label="Criar" />
        </NavTreeLink>
      </NavSection> */}

      <NavSection title="Estabelecimentos" >
      <NavLink href={'/home'} icon={<HomeIcon />} text="Home" />
        <NavLink href={'/search'} icon={<ManageSearchIcon />} text="Pesquisar" />
        <NavLink href={'/table'} icon={<FormatListBulletedIcon />} text="Lista" />
      </NavSection>
      
    
    </Box>
    </Drawer>
  )
}
