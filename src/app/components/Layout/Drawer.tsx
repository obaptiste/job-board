import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import Link from "next/link";

const MyDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navItems = [
    {
      label: "Dashboard",
      icon: <DashboardIcon />,
      link: "/dashboard",
    },
    {
      label: "Jobs",
      icon: <WorkIcon />,
      link: "/jobs",
    },
  ];

  return (
    <>
      <IconButton onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer}>
        <List>
          {navItems.map((item, index) => (
            <Link href={item.link} key={index}>
              <ListItem button>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default MyDrawer;
