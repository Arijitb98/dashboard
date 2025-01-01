## Description

This is a React-based application. Follow the steps below to run the project locally and set it up with or without the backend.

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** (Node Package Manager)

## Steps to Run Locally

### 1. Clone the Repository

First, clone the repository to your local machine using the following command:

```bash
git clone https://github.com/Arijitb98/dashboard.git
```

### 2. Install Dependencies

Navigate into the project directory and install the necessary dependencies:

```bash
cd <project_directory>
npm install
```

### 3. Optional: Set Up Backend API (If Applicable)

If you want to use the backend for API calls, follow these steps:

1. Open the file `src/redux/slices/folderslice.js`.
2. Uncomment lines 14 and 15 to enable the backend API configuration.
3. Comment line 18 to disable any mock data or other default API configurations.

```js
// In src/redux/slices/folderslice.js

// Uncomment these lines to enable the backend API
// const response = await axios.get('${API_BASE_URL}/records');
// return response.data;

// Comment this line to disable mock data and use the backend
// return dummyFolders;
```

> **Note:** Make sure you have the correct API URL, and that the backend is running.

### 4. Start the Application

Once you've set up the project and (optionally) configured the backend, start the development server:

```bash
npm start
```

This will start the application and open it in your default web browser. If it doesn't open automatically, navigate to:

[http://localhost:3000](http://localhost:3000)

### 5. Verify the Application

After the app has started, you should be able to see the application running locally at [http://localhost:3000](http://localhost:3000). You can start interacting with it and verify that everything is working as expected.

## Assumptions

- All the dropdown filters in the app will only consider and show the names/values from the phases (e.g., "Initiation", "Planning", etc.) and **not** from the sub-phases.
- Search will only show results from phases when all the subphases are closed. Subphases will be searched when they are expanded.

## Troubleshooting

If you encounter issues related to missing dependencies, try deleting the `node_modules` folder and `package-lock.json` file, then run `npm install` again.

```bash
rm -rf node_modules package-lock.json
npm install
```

If the application fails to start or throws an error, check the terminal for error messages, which can often point to the cause of the problem.

---

## Live Demo

You can access the live application
[here](https://chimerical-piroshki-6bbe4b.netlify.app/).
