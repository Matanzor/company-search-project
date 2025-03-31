const express = require('express');
const cors = require('cors');
const sql = require('mssql/msnodesqlv8');

const app = express();
app.use(cors());
app.use(express.json());

const config = {
  connectionString: 'Driver=SQL Server;Server=DESKTOP-SL2PA16\\SQLEXPRESS;Database=Northwind;Trusted_Connection=true',
  driver: 'msnodesqlv8'
}

console.log('Attempting to connect with the following configuration:');
console.log(config);

// Utility function to build search clause
function buildClause(field, value, searchType) {
  if (!value) return '';
  value = value.trim();
  switch (searchType) {
    case 'equal':
      return `${field} = @${field}`;
    case 'startwith':
      return `${field} LIKE @${field}`;
    case 'endwith':
      return `${field} LIKE @${field}`;
    case 'middle':
      return `${field} LIKE @${field}`;
    default:
      return `${field} = @${field}`;
  }
}

// Endpoint for search
app.get('/api/companies', async (req, res) => {
  try {
    console.log('Received request for /api/companies with query:', req.query);
    const {
      companyName = '',
      companyNameSearchType = 'equal',
      contactName = '',
      contactNameSearchType = 'equal',
      phone = ''
    } = req.query;

    let whereClauses = [];
    let requestParams = {};

    if (companyName) {
      whereClauses.push(buildClause('CompanyName', companyName, companyNameSearchType));
      if (companyNameSearchType === 'equal') {
        requestParams['CompanyName'] = companyName;
      } else if (companyNameSearchType === 'startwith') {
        requestParams['CompanyName'] = companyName + '%';
      } else if (companyNameSearchType === 'endwith') {
        requestParams['CompanyName'] = '%' + companyName;
      } else if (companyNameSearchType === 'middle') {
        requestParams['CompanyName'] = '%' + companyName + '%';
      }
    }

    if (contactName) {
      whereClauses.push(buildClause('ContactName', contactName, contactNameSearchType));
      if (contactNameSearchType === 'equal') {
        requestParams['ContactName'] = contactName;
      } else if (contactNameSearchType === 'startwith') {
        requestParams['ContactName'] = contactName + '%';
      } else if (contactNameSearchType === 'endwith') {
        requestParams['ContactName'] = '%' + contactName;
      } else if (contactNameSearchType === 'middle') {
        requestParams['ContactName'] = '%' + contactName + '%';
      }
    }

    if (phone) {
      whereClauses.push(`Phone = @Phone`);
      requestParams['Phone'] = phone;
    }

    const whereClause = whereClauses.length > 0 ? "WHERE " + whereClauses.join(" AND ") : "";

    // Query joining Customers and Orders and grouping to count Total Orders
    const query = `
      SELECT c.CompanyName, c.ContactName, c.Phone, c.Address,
             COUNT(o.OrderID) as TotalOrders
      FROM Customers c
      LEFT JOIN Orders o ON c.CustomerID = o.CustomerID
      ${whereClause}
      GROUP BY c.CompanyName, c.ContactName, c.Phone, c.Address
      ORDER BY c.CompanyName
    `;

    console.log('Query to be executed:');
    console.log(query);
    console.log('With parameters:', requestParams);

    // Connect to SQL Server
    let pool = await sql.connect(config);
    console.log('Connected to SQL Server successfully.');

    let requestQuery = pool.request();
    Object.keys(requestParams).forEach(param => {
      requestQuery.input(param, requestParams[param]);
    });

    let result = await requestQuery.query(query);
    console.log('Query executed successfully. Rows returned:', result.recordset.length);
    res.json(result.recordset);


    sql.close();
  } catch (err) {
    console.error('Error during SQL operation:', err);
    res.status(500).send("Error executing query: " + err.message);
    sql.close();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
