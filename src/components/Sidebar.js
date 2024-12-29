import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFolders,
  selectFolders,
  selectStatus,
} from "../redux/slices/folderSlice";
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  CircularProgress,
  Collapse,
  Box,
  IconButton,
} from "@mui/material";
import { ReactComponent as FolderIcon } from "../assets/Icons/stageFile.svg";
import { ReactComponent as WordIcon } from "../assets/Icons/word.svg";
import { ReactComponent as ExpandMoreIcon } from "../assets/Icons/chevron-right.svg";
import { ReactComponent as ExpandLessIcon } from "../assets/Icons/chevron-down.svg";
import { ReactComponent as RightArrowIcon } from "../assets/Icons/rightArrow.svg";

const Sidebar = ({ expandedFolderId, onFolderToggle, onClose }) => {
  const dispatch = useDispatch();
  const folders = useSelector(selectFolders);
  const status = useSelector(selectStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchFolders());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <CircularProgress />;
  }

  if (status === "failed") {
    return <p>Error loading folders. Please try again later.</p>;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        width: "250px",
        backgroundColor: "#f4f4f4",
        height: "100vh",
        borderRight: "1px solid #ddd",
        position: "relative",
      }}
    >
      {/* Header with Close Button */}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <ListSubheader
          sx={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#333",
            backgroundColor: "#f4f4f4",
            padding: "16px",
          }}
        >
          Transaction Contents
        </ListSubheader>
        <IconButton onClick={onClose} sx={{ marginRight: "8px" }}>
          <RightArrowIcon width={20} height={20} />
        </IconButton>
      </Box>

      {/* Summary Section */}
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        padding={1}
        sx={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Box textAlign="center">
          <Box fontWeight="bold" fontSize="16px">
            {folders.length}
          </Box>
          <Box fontSize="12px" color="#555">
            Stages
          </Box>
        </Box>
        <Box textAlign="center">
          <Box fontWeight="bold" fontSize="16px">
            {folders.reduce(
              (total, folder) => total + (folder.subPhases?.length || 0),
              0
            )}
          </Box>
          <Box fontSize="12px" color="#555">
            Subfolders
          </Box>
        </Box>
        <Box textAlign="center">
          <Box fontWeight="bold" fontSize="16px">
            {folders.reduce(
              (total, folder) => total + (folder.documentsCount || 0),
              0
            )}
          </Box>
          <Box fontSize="12px" color="#555">
            Documents
          </Box>
        </Box>
      </Box>

      {/* Folder List */}
      <List sx={{ flex: 1, overflowY: "auto" }}>
        {folders.map((folder) => (
          <React.Fragment key={folder.id}>
            <ListItem
              button
              onClick={() => onFolderToggle(folder.id)}
              sx={{
                padding: "8px 16px",
                display: "flex",
                alignItems: "center",
                backgroundColor:
                  expandedFolderId === folder.id ? "#e6f7ff" : "transparent",
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
            >
              <FolderIcon style={{ marginRight: "8px" }} />
              <ListItemText
                primary={folder.phase || `Stage ${folder.serialNo}`}
                sx={{ fontSize: "14px", color: "#333", fontWeight: "500" }}
              />
              {expandedFolderId === folder.id ? (
                <ExpandLessIcon style={{ marginLeft: "auto" }} />
              ) : (
                <ExpandMoreIcon style={{ marginLeft: "auto" }} />
              )}
            </ListItem>
            <Collapse
              in={expandedFolderId === folder.id}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {folder.subPhases?.map((subPhase) => (
                  <ListItem
                    key={subPhase.id}
                    sx={{
                      padding: "8px 32px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {subPhase.isDocument ? (
                      <WordIcon style={{ marginRight: "8px" }} />
                    ) : (
                      <FolderIcon style={{ marginRight: "8px" }} />
                    )}
                    <ListItemText
                      primary={
                        subPhase.name || `Sub-Phase ${subPhase.serialNo}`
                      }
                      sx={{ fontSize: "14px", color: "#555" }}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
