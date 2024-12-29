import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Breadcrumbs from "./components/breadCrumbs";
import LeftSidebar from "./components/LeftSidebar";
import RightSideBar from "./components/RightSidebar";
import Sidebar from "./components/Sidebar";
import SubPhaseDetailsSidebar from "./components/SubPhaseDetailsSidebar";
import DataTable from "./components/dataTable";
import Filters from "./components/filters";
import { Box, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { selectFolders } from "./redux/slices/folderSlice";
import { ReactComponent as RightArrowIcon } from "./assets/Icons/rightArrow.svg";

const App = () => {
  const [expandedFolderId, setExpandedFolderId] = useState(null); // Start with no folder expanded
  const [searchQuery, setSearchQuery] = useState("");
  const [folderFilter, setFolderFilter] = useState("all"); // Default to show all folders
  const [statusFilter, setStatusFilter] = useState("all"); // Default to show all statuses
  const [dateRange, setDateRange] = useState([null, null]); // State for date range picker
  const [responsiblePartyFilter, setResponsiblePartyFilter] = useState("all"); // State for responsible party filter
  const [filterModalOpen, setFilterModalOpen] = useState(false); // State for modal
  const folders = useSelector(selectFolders); // Get folders from the store
  const [selectedSubPhase, setSelectedSubPhase] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleRowClick = (rowId) => {
    const subPhase = flattenedPhases.find(
      (phase) => phase.id === rowId && phase.type === "subPhase"
    );
    if (subPhase?.document) {
      setSelectedSubPhase(subPhase);
      setIsSidebarOpen(true);
    }
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedSubPhase(null);
  };

  const handleFolderToggle = (folderId) => {
    setExpandedFolderId((prevId) => (prevId === folderId ? null : folderId));
  };

  const flattenPhases = () => {
    let phases = [];
    folders.forEach((folder) => {
      phases.push({
        id: folder.id,
        serialNo: folder.serialNo,
        phase: folder.phase || `Stage ${folder.serialNo}`,
        status: folder.status || "N/A",
        document: folder.document || "-",
        responsibleParty: folder.responsibleParty || "N/A",
        updateDate: folder.updateDate || "N/A",
        type: "folder",
        parentFolderId: null,
      });
      folder.subPhases?.forEach((subPhase) => {
        phases.push({
          id: subPhase.id,
          serialNo: subPhase.serialNo,
          phase: subPhase.name || `Sub-Phase ${subPhase.serialNo}`,
          status: subPhase.status || "N/A",
          document: subPhase.document || "N/A",
          responsibleParty: subPhase.responsibleParty || "N/A",
          updateDate: subPhase.updateDate || "N/A",
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
  const uniqueFolderNames = Array.from(
    new Set(
      flattenedPhases
        .filter((phase) => phase.type === "folder") // Include only phases
        .map((phase) => phase.phase)
    )
  );

  // Get unique status values for status filter
  const uniqueStatusValues = Array.from(
    new Set(flattenedPhases.map((phase) => phase.status))
  );

  // Get unique responsible parties
  const uniqueResponsibleParties = Array.from(
    new Set(flattenedPhases.map((phase) => phase.responsibleParty))
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
    (row) => row.parentFolderId === expandedFolderId || row.type === "folder"
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" height="100vh" overflow="hidden">
        {/* First Sidebar */}
        <Box
          width={isSidebarVisible ? "250px" : "70px"} // Adjust width based on sidebar visibility
          height="100%"
          backgroundColor="#00274d"
          boxShadow="2px 0px 5px rgba(0,0,0,0.1)"
          zIndex={2}
          position="relative"
          transition="width 0.3s ease" // Smooth transition for sidebar width
        >
          <LeftSidebar />
        </Box>

        {/* Second Sidebar */}
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
              expandedFolderId={expandedFolderId}
              onFolderToggle={handleFolderToggle}
              onClose={toggleSidebar}
            />
          </Box>
        )}

        {/* Main Content */}
        <Box
          flex={1} // Fill remaining space
          display="flex"
          flexDirection="column"
          sx={{
            transition: "padding-left 0.3s ease", // Smooth transition for padding
            paddingLeft: isSidebarVisible ? "320px" : "70px", // Adjust padding based on sidebar visibility
            paddingTop: "16px", // Add padding to prevent overlap with breadcrumbs
          }}
        >
          {/* Sidebar Toggle Button */}
          {!isSidebarVisible && (
            <IconButton
              onClick={toggleSidebar}
              sx={{
                position: "absolute",
                top: "16px",
                left: "80px", // Positioned to the right of the first sidebar
                zIndex: 10,
              }}
            >
              <RightArrowIcon width={20} height={20} />
            </IconButton>
          )}

          {/* Breadcrumbs Section */}
          <Box
            padding="16px"
            borderBottom="1px solid #ddd"
            backgroundColor="#f9f9f9"
          >
            <Breadcrumbs />
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
            <DataTable
              rows={rowsToDisplay}
              onRowClick={(id) => {
                handleRowClick(id);
                handleFolderToggle(id);
              }}
            />
          </Box>
        </Box>

        {/* Right Sidebar */}
        <Box
          sx={{
            position: "absolute",
            top: "80px", // Adjust to start below the breadcrumbs section
            right: "0",
            width: "70px", // Adjust width as needed
            height: "calc(100vh - 80px)", // Ensure it takes up the rest of the screen height below breadcrumbs
            backgroundColor: "#f5f5f5",
            boxShadow: "2px 0px 5px rgba(0,0,0,0.1)",
            zIndex: 2,
            overflowY: "auto", // Optional: Allows scrolling if content overflows
            transition: "width 0.3s ease", // Smooth transition for right sidebar
          }}
        >
          <RightSideBar />
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
