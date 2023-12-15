import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import EventIcon from "@mui/icons-material/Event";
import { getAuth, signOut } from "firebase/auth";
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import { MdLocationOn } from 'react-icons/md';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      // You can add additional logic here, such as redirecting to the login page
      navigate("/");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  InnoManage
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Home"
              to="/Dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contact"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography"
              to="/geography"
              icon={<MdLocationOn />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="My work"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <hr
              style={{
                width: "80%",
                margin: "10px auto",
                border: "none",
                borderBottom: "1px solid #ddd",
              }}
            />
            <Item
              title="Main workspace"
              icon={<EventIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Projet 1"
              to="/Task"
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
          {/* Logout button */}
          <MenuItem
            style={{
              color: colors.grey[100],
              cursor: "pointer",
              margin: "auto",
            }}
            sx={{ height: 400, width: '100%' }}
            onClick={handleLogout}
          >
            <Button variant="outlined" color="primary" >
              Logout
            </Button>
          </MenuItem>
        </Menu>

      </ProSidebar>

    </Box>
  );
};

export default Sidebar;
