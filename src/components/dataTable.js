import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({ rows, onRowClick }) => {
  const columns = [
    { field: "serialNo", headerName: "#", width: 100 },
    { field: "phase", headerName: "Phase", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "document", headerName: "Document", width: 150 },
    { field: "responsibleParty", headerName: "Responsible Party", width: 200 },
    { field: "updateDate", headerName: "Update Date", width: 150 },
  ];

  const handleRowClick = (params) => {
    const { id } = params.row; // Get the id of the clicked row
    onRowClick(id); // Trigger the folder toggle for the clicked folder or sub-phase
  };

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        onRowClick={handleRowClick} // Add row click handler
      />
    </div>
  );
};

export default DataTable;
