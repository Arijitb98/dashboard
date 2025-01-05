export const dummyFolders = [
  {
    id: 1,
    serialno: 1,
    phase: "Initiation",
    status: "Completed",
    document: null,
    responsibleparty: "John Doe",
    updatedate: "2024-12-28",
    subphases: [
      {
        id: 2,
        serialno: "1.1",
        phase: "Requirement Gathering",
        status: "Completed",
        document: "V1.2",
        responsibleparty: "Alice",
        updatedate: "2024-12-20",
      },
      {
        id: 3,
        serialno: "1.2",
        phase: "Initial Approval",
        status: "Completed",
        document: null,
        responsibleparty: "Bob",
        updatedate: "2024-12-22",
      },
    ],
  },
  {
    id: 4,
    serialno: 2,
    phase: "Planning",
    status: "Not Started",
    document: null,
    responsibleparty: "Jane Smith",
    updatedate: "2024-12-27",
    subphases: [
      {
        id: 5,
        serialno: "2.1",
        phase: "Resource Allocation",
        status: "Not Started",
        document: "V6.0",
        responsibleparty: "Charlie",
        updatedate: "2024-12-26",
      },
      {
        id: 6,
        serialno: "2.2",
        phase: "Budget Planning",
        status: "Not Started",
        document: null,
        responsibleparty: "Diana",
        updatedate: "2024-12-25",
      },
    ],
  },
  {
    id: 7,
    serialno: 3,
    phase: "Execution",
    status: "Not Started",
    document: null,
    responsibleparty: "Edward",
    updatedate: "2024-12-29",
    subphases: [
      {
        id: 8,
        serialno: "3.1",
        phase: "Task Assignment",
        status: "Not Started",
        document: "V0.6",
        responsibleparty: "Fiona",
        updatedate: "2024-12-30",
      },
    ],
  },
  {
    id: 9,
    serialno: 4,
    phase: "Monitoring",
    status: "Completed",
    document: null,
    responsibleparty: "George",
    updatedate: "2024-12-24",
    subphases: [],
  },
  {
    id: 10,
    serialno: 5,
    phase: "Closure",
    status: "Continuing",
    document: null,
    responsibleparty: "Hannah",
    updatedate: "2024-12-23",
    subphases: [
      {
        id: 11,
        serialno: "5.1",
        phase: "Final Review",
        status: "Continuing",
        document: null,
        responsibleparty: "Ian",
        updatedate: "2024-12-22",
      },
      {
        id: 12,
        serialno: "5.2",
        phase: "Sign-Off",
        status: "Continuing",
        document: "V2.3",
        responsibleparty: "Jack",
        updatedate: "2024-12-21",
      },
    ],
  },
  {
    id: 13,
    serialno: 6,
    phase: "Post Deployment",
    status: "Undefined",
    document: null,
    responsibleparty: "Kevin",
    updatedate: "2024-12-24",
    subphases: [],
  },
];
