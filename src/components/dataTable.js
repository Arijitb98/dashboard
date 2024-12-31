import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({ rows, onRowClick }) => {

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case "Completed":
        return "green";
      case "Not Started":
        return "red";
      case "Continuing":
        return "yellow";
      default:
        return "gray";
    }
  };
  
  const columns = [
    { field: "serialNo", headerName: "#", width: 100 },
    { field: "phase", headerName: "Phase", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <div
          style={{
            backgroundColor: getStatusBackgroundColor(params.value),
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            textAlign: "center",
            width: "100%",
          }}
        >
          {params.value || "Undefined"}
        </div>
      ),
    },    
    { field: "document", headerName: "Document", width: 150 },
    { field: "responsibleParty", headerName: "Responsible Party", width: 200 },
    { field: "updateDate", headerName: "Update Date", width: 150 },
  ];

  // Function to handle row click event
  const handleRowClick = (params) => {
    const { id } = params.row; // Extract row id
    onRowClick(id); // Call the onRowClick function passed via props with the row id
  };

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        onRowClick={handleRowClick}
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default DataTable;
