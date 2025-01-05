import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ReactComponent as WordIcon } from "../assets/Icons/Group 193548.svg";
import { selectFolders } from "../redux/slices/folderSlice";
import { useSelector } from "react-redux";

const DataTable = ({ rows, onRowClick, onDocumentClick }) => {
  const folders = useSelector(selectFolders);

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case "Completed":
        return "#00BD8B";
      case "Not Started":
        return "#F66079";
      case "Continuing":
        return "#FBD652";
      default:
        return "#7E8B9F";
    }
  };

  // Function to format date to DD.MM.YYYY
  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const columns = [
    { field: "serialNo", headerName: "#", flex: 0.3, minWidth: 50 },
    {
      field: "phase",
      headerName: "Phase",
      flex: 2,
      minWidth: 180,
      renderCell: (params) => {
        // Find the folder that matches the current phase id
        const folder = folders.find((folder) => folder.id === params.id);

        // Get the count of subphases for the found folder
        const subPhasesCount = folder ? folder.subphases.length : 0;

        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Phase Name */}
            <div>{params.value}</div>

            {/* Display the number of subphases below the phase */}
            {folder && (
              <div
                style={{ fontSize: "0.8em", color: "gray", marginTop: "4px" }}
              >
                {subPhasesCount} subphases
              </div>
            )}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 150,
      align: "center",
      renderCell: (params) => (
        <div
          className="status"
          style={{
            backgroundColor: getStatusBackgroundColor(params.value),
            color: "white",
            padding: "4px 8px",
            borderRadius: "6px",
            textAlign: "center",
            lineHeight: "1.2",
            width: "85%",
          }}
        >
          {params.value || "Undefined"}
        </div>
      ),
    },
    {
      field: "document",
      headerName: "Document",
      flex: 0.5,
      minWidth: 150,
      renderCell: (params) => {
        if (params.row.type === "phase") {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "gray" }}>-</span>
            </div>
          );
        }

        const hasDocument = params.value != null;

        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: hasDocument ? "pointer" : "default",
            }}
            onClick={(event) => {
              if (hasDocument) {
                event.stopPropagation(); // Prevent triggering row click
                onDocumentClick(params.row.id); // Trigger document-specific click
              }
            }}
          >
            {hasDocument ? (
              <WordIcon width={20} height={20} style={{ fill: "#226FEA" }} />
            ) : (
              <span style={{ color: "gray" }}>-</span>
            )}
            <span style={{ marginLeft: 8, color: "#226FEA" }}>
              {params.value || ""}
            </span>
          </div>
        );
      },
    },
    {
      field: "responsibleParty",
      headerName: "Responsible Party",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return (
          <div
          className="responsible-party"
            style={{
              backgroundColor: "#F1F5F9",
              padding: "4px 8px",
              borderRadius: "6px",
              textAlign: "center",
              lineHeight: "1.2",
              width: "85%",
              fontWeight: "bold",
            }}
          >
            {params.value}
          </div>
        );
      },
    },
    {
      field: "updateDate",
      headerName: "Update Date",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "85%",
              height: "100%",
              textAlign: "center",
            }}
          >
            {formatDate(params.value)}
          </div>
        );
      },
    },
  ];

  // Function to handle row click event (expand/collapse phases)
  const handleRowClick = (params) => {
    const { id } = params.row;
    onRowClick(id);
  };

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        style={{ width: "100%" }}
        rows={rows}
        columns={columns}
        pageSize={10}
        onRowClick={handleRowClick}
        disableRowSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export default DataTable;
