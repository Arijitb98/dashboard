import React, { useState } from "react";
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

const RightNavBar = () => {
  const [selectedItem, setSelectedItem] = useState("Contents");

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
        width: "80px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 0",
      }}
    >
      {/* Menu Items */}
      <List
        sx={{
          flexGrow: 1,
          width: "100%",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            sx={{
              flexDirection: "column",
              alignItems: "center",
              padding: "12px 0",
              "&:hover": { backgroundColor: "#E8F4FF" },
              backgroundColor:
                selectedItem === item.label ? "#E8F4FF" : "transparent", // Highlight selected item
              borderRadius: "8px",
            }}
            button
            onClick={() => setSelectedItem(item.label)} // Set the clicked item as selected
          >
            {/* Change icon color based on selected state */}
            {React.cloneElement(item.icon, {
              fill: selectedItem === item.label ? "#1F94FF" : "inherit", // Change icon color for selected item
            })}
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                textAlign: "center",
                fontSize: "8px",
                color: selectedItem === item.label ? "#1F94FF" : "inherit", // Change text color for selected item
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RightNavBar;
