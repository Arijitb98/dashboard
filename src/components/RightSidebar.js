import React from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

// Import SVGs as React components
import { ReactComponent as Home } from "../assets/Icons/house.svg";
import { ReactComponent as Contents } from "../assets/Icons/contents.svg";
import { ReactComponent as Tasks } from "../assets/Icons/tasks.svg";
import { ReactComponent as Phases } from "../assets/Icons/phases.svg";
import { ReactComponent as SignTracking } from "../assets/Icons/signTracking.svg";
import { ReactComponent as CriticalInfoSeting } from "../assets/Icons/bookmark.svg";
import { ReactComponent as AnalysisPhases } from "../assets/Icons/analysis.svg";
import { ReactComponent as Calenders } from "../assets/Icons/transactionCalander.svg";
import { ReactComponent as ActivityLog } from "../assets/Icons/reports.svg";
import { ReactComponent as More } from "../assets/Icons/ellipsis.svg";

const RightSideBar = () => {
  const menuItems = [
    { label: "Home", icon: <Home width={20} height={20} /> },
    { label: "Contents", icon: <Contents width={20} height={20} /> },
    { label: "Tasks", icon: <Tasks width={20} height={20} /> },
    { label: "Phases", icon: <Phases width={20} height={20} /> },
    { label: "Sign Tracking", icon: <SignTracking width={20} height={20} /> },
    {
      label: "Critical Info Setting",
      icon: <CriticalInfoSeting width={20} height={20} />,
    },
    {
      label: "Analysis Phases",
      icon: <AnalysisPhases width={20} height={20} />,
    },
    {
      label: "Calenders",
      icon: <Calenders width={20} height={20} />,
    },
    {
      label: "Activity Log",
      icon: <ActivityLog width={20} height={20} />,
    },
    {
      label: "",
      icon: <More width={20} height={20} />,
    },
  ];

  return (
    <Box
      sx={{
        width: "70px", // Adjust as per design
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 0",
      }}
    >
      {/* Menu Items */}
      <List sx={{ flexGrow: 1, width: "100%", padding: 0 }}>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            sx={{
              flexDirection: "column",
              alignItems: "center",
              padding: "12px 0",
              color: "white",
              "&:hover": { backgroundColor: "#004080" },
            }}
          >
            <ListItemIcon
              sx={{
                justifyContent: "center",
                minWidth: "unset",
                marginBottom: "8px",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              sx={{
                textAlign: "center",
                fontSize: "12px",
                color: "white",
                fontWeight: "500",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RightSideBar;
