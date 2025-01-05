import React from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import { ReactComponent as ArrowDownToLineIcon } from "../assets/Icons/arrow-down-to-line.svg";
import { ReactComponent as FilterIcon } from "../assets/Icons/filter.svg";

const Filters = ({
  searchQuery,
  setSearchQuery,
  folderFilter,
  setFolderFilter,
  statusFilter,
  setStatusFilter,
  dateRange,
  setDateRange,
  responsiblePartyFilter,
  setResponsiblePartyFilter,
  uniqueFolderNames,
  uniqueStatusValues,
  uniqueResponsibleParties,
  filterModalOpen,
  setFilterModalOpen,
}) => {
  return (
    <>
      {/* Filters Section */}
      <Box
        display="flex"
        alignItems="center"
        padding={2}
        gap={2}
        zIndex={0}
        backgroundColor="white"
      >
        <FormControl variant="outlined" size="small" style={{ minWidth: 200 }}>
          <InputLabel>Filter Folders</InputLabel>
          <Select
            value={folderFilter}
            onChange={(e) => setFolderFilter(e.target.value)}
            label="Filter Folders"
          >
            <MenuItem value="all">All Folders</MenuItem>
            {uniqueFolderNames.map((folderName, index) => (
              <MenuItem key={index} value={folderName}>
                {folderName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchQuery}
          className="filter-search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <FormControl variant="outlined" size="small" style={{ minWidth: 200 }}>
          <InputLabel>Filter by Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Filter by Status"
          >
            <MenuItem value="all">All Status</MenuItem>
            {uniqueStatusValues.map((status, index) => (
              <MenuItem key={index} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box display="flex" alignItems="center" gap={1}>
          <IconButton>
            <ArrowDownToLineIcon width={20} height={20} />
          </IconButton>

          <IconButton onClick={() => setFilterModalOpen(true)}>
            <FilterIcon width={20} height={20} />
          </IconButton>
        </Box>
      </Box>

      {/* Modal for Filters */}
      <Modal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        aria-labelledby="filter-modal-title"
      >
        <Box
          position="absolute"
          top="50%"
          left="50%"
          style={{
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "16px",
            borderRadius: "8px",
            width: "400px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* Header Section */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={2}
          >
            <Typography variant="h6" id="filter-modal-title">
              Filters
            </Typography>
            <Box display="flex" gap={1}>
              <Button
                variant="text"
                color="primary"
                onClick={() => {
                  setDateRange([null, null]);
                  setResponsiblePartyFilter("all");
                }}
              >
                Clear Filters
              </Button>
              <Button
                variant="text"
                onClick={() => setFilterModalOpen(false)}
                style={{ minWidth: "32px", padding: "0" }}
              >
                X
              </Button>
            </Box>
          </Box>

          {/* Responsible Party Dropdown */}
          <FormControl
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
          >
            <InputLabel>Responsible Party</InputLabel>
            <Select
              value={responsiblePartyFilter}
              onChange={(e) => setResponsiblePartyFilter(e.target.value)}
              label="Responsible Party"
            >
              <MenuItem value="all">Everyone</MenuItem>
              {uniqueResponsibleParties.map((party, index) => (
                <MenuItem key={index} value={party}>
                  {party}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Text Label for Date Range */}
          <Typography variant="body2" marginTop={2}>
            Select Date Range
          </Typography>

          {/* Date Range Picker */}
          <DateRangePicker
            startText="Start Date"
            endText="End Date"
            value={dateRange}
            onChange={(newValue) => setDateRange(newValue)}
            renderInput={(startProps, endProps) => (
              <>
                <TextField {...startProps} fullWidth margin="dense" />
                <Box marginX={2}>to</Box>
                <TextField {...endProps} fullWidth margin="dense" />
              </>
            )}
          />

          {/* Footer Section */}
          <Box display="flex" justifyContent="flex-end" marginTop={2} gap={1}>
            <Button
              variant="contained"
              onClick={() => setFilterModalOpen(false)}
              style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid rgba(0, 0, 0, 0.23)",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setFilterModalOpen(false)}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Filters;
