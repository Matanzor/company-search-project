# company-search-project 🚀

Welcome to **company-search-project** – a modern Backend For Frontend (BFF) solution that powers a dynamic Angular user interface to search for companies using the classic Northwind database hosted on SQL Server. This project simplifies data retrieval by exposing a single, dedicated API that aggregates and processes data from multiple tables, ensuring a smooth and efficient user experience.


---

## Table of Contents 📚

- [Overview](#overview)
- [Features ✨](#features-)
- [Requirements 🛠️](#requirements-)
- [Installation & Setup ⚙️](#installation--setup-)
- [Configuration 🔧](#configuration-)
- [Running the Project ▶️](#running-the-project-)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Angular Frontend UI 🔍](#angular-frontend-ui-)
- [API Endpoints 🌐](#api-endpoints-)
- [BFF Methodology 💡](#bff-methodology-)
- [License 📄](#license-)

---

## Overview

**company-search-project** implements a BFF layer that bridges the frontend and the Northwind database. The backend exposes a single API endpoint to search for companies (customers) based on criteria like company name, contact name, or phone. This design helps simplify the frontend’s responsibilities by aggregating and processing data on the server side.

---

## Features ✨

- **Dedicated API:** Tailored endpoints for frontend needs.
- **Dynamic Query Building:** Constructs SQL queries based on search criteria.
- **Data Aggregation:** Joins Customers and Orders to provide aggregated order counts.
- **Windows Authentication:** Uses `msnodesqlv8` for secure SQL Server connectivity.
- **Angular Frontend:** A user-friendly UI for performing company searches.
- **Customizable Search Options:** Dropdown menus allow choosing between Equal, Start With, End With, and Middle for both Company Name and Contact Name.
- **Separation of Concerns:** Clear division between backend business logic and frontend presentation.

---

## Requirements 🛠️

- **Backend:**
  - [Node.js](https://nodejs.org/) (v12+)
  - SQL Server with the Northwind database installed
  - Windows OS (for Windows Authentication)
- **Frontend:**
  - [Angular CLI](https://angular.io/cli)
- npm

---

## Installation & Setup ⚙️

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/company-search-project.git
cd company-search-project
```

### 2. Setup the Backend
**- 1. Navigate to the backend folder:**

```bash
cd backend
```
#### - 2. Install dependencies:

```bash
npm install
```

#### - 3. (Optional) Update the SQL Server connection string in app.js if your environment differs.

### 3. Setup the Frontend
#### - 1. Navigate to the frontend folder:

```bash
cd ../frontend
```
#### - 2. Install dependencies:

```bash
npm install
```

## Configuration 🔧

- **Backend:**
The backend uses a connection string with Windows Authentication. In app.js, you'll find:

```bash
const config = {
  connectionString: 'Driver=SQL Server;Server=DESKTOP-SL2PA16\\SQLEXPRESS;Database=Northwind;Trusted_Connection=true',
  driver: 'msnodesqlv8'
};
```
Ensure this connection string reflects your environment.

- **Frontend:**
The Angular project is configured with standard Angular CLI files. The frontend code handles UI logic and calls the backend API. You can modify the search component if needed.

## Running the Project ▶️

- **Backend▶️**
**- 1. Navigate to the backend folder:**

```bash
cd backend
```
#### - 2. Install dependencies:

```bash
node app.js
```

- **Frontend▶️**
#### - 1. Navigate to the frontend folder:

```bash
cd ../frontend
```
#### - 2. Install dependencies:

```bash
ng serve
```

#### - 3. Open your browser and navigate to:
```bash
http://localhost:4200
```

## Angular Frontend UI 🔍
The Angular frontend provides a simple and intuitive user interface for searching companies. Key features include:
- Search Form:
  - Input Fields: Users can enter a Company Name, Contact Name, and Phone number.
  - Dropdown Menus: For both Company Name and Contact Name, dropdowns let you select the search type:
    - Equal: Matches exactly.
    - Start With: Matches records starting with the provided text.
    - End With: Matches records ending with the provided text.
    - Middle: Matches records containing the provided text.
- Search Button:
  On clicking the search button, the form data is sent as query parameters to the backend API (/api/companies).
- Results Table:
  The UI displays a list of companies along with details such as Company Name, Contact Name, Phone, Address, and Total Orders.
- Responsive Design:
  The UI is designed to be responsive and user-friendly, ensuring a smooth search experience.
![image](https://github.com/user-attachments/assets/bccb0ffb-400d-459b-bd6e-58800b6d2e2b)

## API Endpoints 🌐
### GET /api/companies

#### Description:
Search for companies (customers) in the Northwind database.

#### Query Parameters:
- companyName (optional): The company name to search for.
- companyNameSearchType (optional): The search type for the company name. Options: equal, startwith, endwith, middle. (Default: equal)
- contactName (optional): The contact name to search for.
- contactNameSearchType (optional): The search type for the contact name. Options: equal, startwith, endwith, middle. (Default: equal)
- phone (optional): The phone number to match exactly.

#### Example Request:
```bash
GET http://localhost:3000/api/companies?companyName=Alfreds&companyNameSearchType=startwith
```
#### Response:
A JSON array with fields: CompanyName, ContactName, Phone, Address, and TotalOrders.

## BFF Methodology 💡
- Dedicated API:
The Node.js Express backend acts as a dedicated API layer for the Angular frontend, abstracting direct database interactions.
- Dynamic Data Aggregation:
The backend builds dynamic SQL queries based on user input, joins data from multiple tables (e.g., Customers and Orders), and returns only the necessary data.
- Simplified Frontend:
The Angular application interacts with a single API endpoint, reducing complexity and coupling.
- Separation of Concerns:
By isolating business logic and database access in the backend, the frontend code remains clean, maintainable, and easier to evolve.

## License 📄
This project is licensed under the MIT License. See the LICENSE file for details.

