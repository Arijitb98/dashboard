import React from "react";
import { Drawer, Box, Typography, Divider, Button } from "@mui/material";

const SubPhaseDetailsSidebar = ({ open, onClose, subPhase }) => {
  if (!subPhase) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ style: { width: "400px" } }}
    >
      <Box padding={2}>
        <Typography variant="h5" gutterBottom>
          Sub-Phase Details
        </Typography>
        <Divider />
        <Box marginTop={2}>
          <Typography variant="subtitle1">
            <strong>Serial No:</strong> {subPhase.serialNo}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Name:</strong> {subPhase.phase}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Status:</strong> {subPhase.status}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Document:</strong> {subPhase.document}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Responsible Party:</strong> {subPhase.responsibleParty}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Update Date:</strong> {subPhase.updateDate}
          </Typography>
        </Box>
        <Box marginTop={4}>
          <Button variant="contained" color="primary" fullWidth>
            View Document
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default SubPhaseDetailsSidebar;
