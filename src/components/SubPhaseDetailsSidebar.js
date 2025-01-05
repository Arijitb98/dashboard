import React from "react";
import {
  Drawer,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import { ReactComponent as WordIcon } from "../assets/Icons/word.svg";
import { ReactComponent as NoteIcon } from "../assets/Icons/note-sticky-3.svg";

const SubPhaseDetailsSidebar = ({ open, onClose, subPhase }) => {
  if (!subPhase) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ style: { width: "600px" } }}
    >
      <Box p={2}>
        {/* Header Section */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {/* Title and Status */}
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {subPhase.phase}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {subPhase.document} | (Current Version)
            </Typography>
          </Box>
          {/* Status and Icons */}
          <Box display="flex" alignItems="center" gap={1}>
            <Typography
              variant="body2"
              color="success.main"
              fontWeight="bold"
              mr={1}
            >
              ● {subPhase.status}
            </Typography>
            <IconButton size="small">
              <MoreVertIcon />
            </IconButton>
            <IconButton size="small" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* Tabs Section */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          {["Detail", "Versions", "Processes", "Notes", "Authors"].map(
            (tab, index) => (
              <Button
                key={index}
                variant={tab === "Versions" ? "contained" : "text"}
                color={tab === "Versions" ? "primary" : "default"}
                size="small"
              >
                {tab}
              </Button>
            )
          )}
        </Box>
        <Divider />

        {/* Versions List */}
        <Box mt={2} flex={1} overflow="auto">
          <Typography variant="subtitle1" fontWeight="bold">
            4 Registration
          </Typography>
          <List>
            {[
              {
                version: "V.1.4",
                current: true,
                name: "Fatma Gözde Kardes",
                date: "02.07.2022 / 23:40",
                note: "loaded while loading document",
                size: "95,7 kb",
              },
              {
                version: "V.1.3",
                current: false,
                name: "Fatma Gözde Kardes",
                date: "02.07.2022 / 23:40",
                note: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                size: "95,7 kb",
              },
              {
                version: "V.1.2",
                current: false,
                name: "Ali Sefa Türkmen",
                date: "12.05.2022 / 23:40",
                note: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                size: "65,1 kb",
              },
              {
                version: "V.1.1",
                current: false,
                name: "Yiğit Aksoy",
                date: "12.05.2022 / 23:40",
                note: "",
                size: "54,4 kb",
              },
            ].map((item, index) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemAvatar>
                  <WordIcon width={25} height={25} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {item.version} {item.current && "(Current Version)"}
                      </Typography>
                      <Typography variant="caption">
                        {item.size}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="span"
                      >
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Last Update Date: {item.date}
                      </Typography>
                      {item.note && (
                        <Box display="flex" alignItems="center" mt={1}>
                          <NoteIcon width={20} height={20} />
                          <Typography variant="body2" ml={1}>
                            <strong>Note:</strong> {item.note}
                          </Typography>
                        </Box>
                      )}
                    </>
                  }
                />
                <Box display="flex" alignItems="center">
                  {/* <Typography variant="caption" color="textSecondary" mr={1}>
                    {item.size}
                  </Typography> */}
                  <IconButton size="small">
                    <MoreVertIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};

export default SubPhaseDetailsSidebar;
