import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Breadcrumbs from "./components/breadCrumbs";
import LeftNavBar from "./components/LeftNavBar";
import RightNavBar from "./components/RightNavBar";
import Sidebar from "./components/LeftSidebar";
import SubPhaseDetailsSidebar from "./components/SubPhaseDetailsSidebar";
import DataTable from "./components/dataTable";
import Filters from "./components/filters";
import { Box, IconButton, CircularProgress, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFolders,
  selectFolders,
  selectStatus,
  selectError,
} from "./redux/slices/folderSlice";
import "./App.css";

const App = () => {
  const [expandedFolderIds, setExpandedFolderIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [folderFilter, setFolderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState([null, null]);
  const [responsiblePartyFilter, setResponsiblePartyFilter] = useState("all");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedSubPhase, setSelectedSubPhase] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  // Selectors to get data from Redux store
  const folders = useSelector(selectFolders);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  // Fetch folders data when the component mounts or when the status changes to 'idle'
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchFolders());
    }
  }, [dispatch, status]);

  // Handle row click to set the selected sub-phase details
  const handleRowClick = (rowId) => {
    // Handle phase row click to expand/collapse subphases if needed
    const subPhase = flattenedPhases.find(
      (phase) => phase.id === rowId && phase.type === "subPhase"
    );

    if (subPhase?.document) {
      setSelectedSubPhase(subPhase);
    }
  };

  const openSidebar = (params) => {
    const subPhase = flattenedPhases.find(
      (phase) => phase.id === params && phase.type === "subPhase"
    );

    if (subPhase?.document) {
      setSelectedSubPhase(subPhase);
      setIsSidebarOpen(true);
    }
  };

  // Close the sidebar and clear the selected sub-phase
  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedSubPhase(null);
  };

  // Toggle the expanded state of a folder
  const handleFolderToggle = (folderId) => {
    setExpandedFolderIds((prevIds) =>
      prevIds.includes(folderId)
        ? prevIds.filter((id) => id !== folderId)
        : [...prevIds, folderId]
    );
  };

  // Flatten phases and sub-phases into a single array
  const flattenPhases = () => {
    let phases = [];
    folders.forEach((folder) => {
      // Add the main phase
      phases.push({
        id: folder.id,
        serialNo: folder.serialno,
        phase: folder.phase || `Stage ${folder.serialno}`,
        status: folder.status || "N/A",
        document: folder.document,
        responsibleParty: folder.responsibleparty || "N/A",
        updateDate: folder.updatedate || "N/A",
        type: "folder",
        parentFolderId: null,
      });

      // Add the sub-phases
      folder.subphases?.forEach((subPhase) => {
        phases.push({
          id: `${folder.id}-${subPhase.serialno}`,
          serialNo: subPhase.serialno,
          phase: subPhase.phase || `Sub-Phase ${subPhase.serialno}`,
          status: subPhase.status || "N/A",
          document: subPhase.document,
          responsibleParty: subPhase.responsibleparty || "N/A",
          updateDate: subPhase.updatedate || "N/A",
          parentFolderId: folder.id,
          type: "subPhase",
        });
      });
    });
    return phases;
  };

  const flattenedPhases = flattenPhases();

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  // Get unique folder names for folder filter
  const uniqueFolderNames = flattenedPhases
    .filter((phase) => phase.type === "folder")
    .map((phase) => phase.phase);

  // Get unique status values for status filter
  const uniqueStatusValues = Array.from(
    new Set(flattenedPhases.map((phase) => phase.status))
  );

  // Get unique responsible parties
  const uniqueResponsibleParties = Array.from(
    new Set(
      flattenedPhases
        .filter((phase) => phase.type === "folder") // Include only phases
        .map((phase) => phase.responsibleParty)
    )
  );

  // Apply folder filter
  const filteredByFolder =
    folderFilter === "all"
      ? flattenedPhases
      : flattenedPhases.filter((phase) => phase.phase === folderFilter);

  // Apply status filter
  const filteredByStatus =
    statusFilter === "all"
      ? filteredByFolder
      : filteredByFolder.filter((phase) => phase.status === statusFilter);

  // Apply responsible party filter
  const filteredByResponsibleParty =
    responsiblePartyFilter === "all"
      ? filteredByStatus
      : filteredByStatus.filter(
          (phase) => phase.responsibleParty === responsiblePartyFilter
        );

  // Apply date range filter
  const filteredByDateRange = filteredByResponsibleParty.filter((phase) => {
    if (!dateRange[0] || !dateRange[1]) return true;
    const updateDate = new Date(phase.updateDate);
    return updateDate >= dateRange[0] && updateDate <= dateRange[1];
  });

  // Filter by search query
  const filteredPhases = filteredByDateRange.filter((phase) =>
    Object.values(phase).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Filter data based on expandedFolderId
  const rowsToDisplay = filteredPhases.filter(
    (row) =>
      expandedFolderIds.includes(row.parentFolderId) || row.type === "folder"
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" height="100vh" overflow="hidden">
        {/* Navbar */}
        <Box
          // width={isSidebarVisible ? "250px" : "70px"}
          height="100%"
          backgroundColor="#00274d"
          boxShadow="2px 0px 5px rgba(0,0,0,0.1)"
          zIndex={2}
          position="relative"
          transition="width 0.3s ease"
        >
          <LeftNavBar />
        </Box>

        {/* Sidebar */}
        {isSidebarVisible && (
          <Box
            width="250px"
            height="100%"
            backgroundColor="#f5f5f5"
            boxShadow="2px 0px 5px rgba(0,0,0,0.1)"
            zIndex={1}
            position="relative"
          >
            <Sidebar
              expandedFolderIds={expandedFolderIds}
              onFolderToggle={handleFolderToggle}
              onClose={toggleSidebar}
            />
          </Box>
        )}

        {/* Main Content */}
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          sx={{
            transition: "padding-left 0.3s ease",
          }}
        >
          {/* Breadcrumbs Section */}
          <Box
            padding="16px"
            borderBottom="1px solid #ddd"
            backgroundColor="#f9f9f9"
          >
            <Breadcrumbs
              isSidebarVisible={isSidebarVisible}
              toggleSidebar={toggleSidebar}
            />
          </Box>

          {/* Filters Section */}
          <Box
            padding="16px"
            borderBottom="1px solid #ddd"
            backgroundColor="#ffffff"
          >
            <Filters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              folderFilter={folderFilter}
              setFolderFilter={setFolderFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              dateRange={dateRange}
              setDateRange={setDateRange}
              responsiblePartyFilter={responsiblePartyFilter}
              setResponsiblePartyFilter={setResponsiblePartyFilter}
              uniqueFolderNames={uniqueFolderNames}
              uniqueStatusValues={uniqueStatusValues}
              uniqueResponsibleParties={uniqueResponsibleParties}
              filterModalOpen={filterModalOpen}
              setFilterModalOpen={setFilterModalOpen}
            />
          </Box>

          {/* DataTable Section */}
          <Box flex={1} padding={2} overflow="auto">
            {status === "loading" && <CircularProgress />}
            {status === "failed" && (
              <Alert severity="error">
                {error || "An error occurred while fetching data."}
              </Alert>
            )}
            <DataTable
              rows={rowsToDisplay}
              onRowClick={(id) => {
                handleRowClick(id);
                handleFolderToggle(id);
              }}
              onDocumentClick={(params) => {
                openSidebar(params);
              }}
            />
          </Box>
        </Box>

        {/* Right navbar */}
        <Box
          sx={{
            width: "80px",
            backgroundColor: "#f5f5f5",
            boxShadow: "2px 0px 5px rgba(0,0,0,0.1)",
            zIndex: 2,
            transition: "width 0.3s ease",
          }}
        >
          <RightNavBar />
        </Box>

        {/* SubPhaseDetailsSidebar */}
        <SubPhaseDetailsSidebar
          open={isSidebarOpen}
          onClose={closeSidebar}
          subPhase={selectedSubPhase}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default App;
