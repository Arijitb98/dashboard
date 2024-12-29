import React from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

// Import SVGs as React components
import { ReactComponent as PanoramaIcon } from "../assets/Icons/panorama.svg";
import { ReactComponent as TransactionIcon } from "../assets/Icons/transaction.svg";
import { ReactComponent as DocumentsIcon } from "../assets/Icons/Documents.svg";
import { ReactComponent as EmailsIcon } from "../assets/Icons/email.svg";
import { ReactComponent as ReportsIcon } from "../assets/Icons/report.svg";
import { ReactComponent as ManagementPanelIcon } from "../assets/Icons/managementPanel.svg";
import { ReactComponent as TransactionCalendarIcon } from "../assets/Icons/transactionCalander.svg";
import { ReactComponent as UserCircle } from "../assets/Icons/user-circle.svg";
import { ReactComponent as MuamelatLogo } from "../assets/Icons/Muamelat logo.svg";

const LeftSidebar = () => {
  const menuItems = [
    { label: "Panorama", icon: <PanoramaIcon width={20} height={20} /> },
    { label: "Transaction", icon: <TransactionIcon width={20} height={20} /> },
    { label: "Documents", icon: <DocumentsIcon width={20} height={20} /> },
    { label: "E-Mails", icon: <EmailsIcon width={20} height={20} /> },
    { label: "Reports", icon: <ReportsIcon width={20} height={20} /> },
    {
      label: "Management Panel",
      icon: <ManagementPanelIcon width={20} height={20} />,
    },
    {
      label: "Transaction Calendar",
      icon: <TransactionCalendarIcon width={20} height={20} />,
    },
  ];

  return (
    <Box
      sx={{
        width: "70px", // Adjust as per design
        backgroundColor: "#00274d", // Match the dark blue background
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 0",
      }}
    >
      {/* Logo Section */}
      <Box sx={{ width: "40px", marginBottom: "16px" }}>
        <MuamelatLogo style={{ width: "100%", height: "auto" }} />
      </Box>

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

      {/* Profile Section */}
      <Box display="flex" alignItems="center">
        <UserCircle
          width="40px"
          height="40px"
          sx={{
            borderRadius: "50%",
            border: "2px solid white",
          }}
        />
      </Box>
    </Box>
  );
};

export default LeftSidebar;
