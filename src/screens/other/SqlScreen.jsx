import React, { useState } from 'react';
import axios from 'axios';
import { REACT_APP_API_URL } from "../../router"; // Ensure this is correctly set


const SqlScreen = () => {
  const [query, setQuery] = useState('SELECT * FROM dbo.XXXX'); // Default SQL query
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  // Handle input changes in the query text area
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle the form submission (query execution)
  const handleSubmitQuery = async () => {
    try {
      // Make sure the query is a valid string and not an empty input
      if (!query.trim()) {
        setError('Please enter a valid SQL query');
        setResults([]);
        return;
      }

      // Make the API request to execute the query
      const response = await axios.post(`${REACT_APP_API_URL}/api/other/sql-queries`, { query });
      console.log('Query Result:', response.data.results);

      // Check if the response contains results and update the state
      if (response.data && response.data.results) {
        setResults(response.data.results); // Set the results to display
        setError(''); // Clear any previous error
      } else {
        setError('No results found');
        setResults([]);
      }
    } catch (err) {
      // Improve error handling for undefined error response
      const errorMsg = err.response?.data?.error || err.message || 'Unknown error occurred';
      setError('Error executing query: ' + errorMsg);
      setResults([]); // Clear any previous results
    }
  };

  return (
    <div className="max-w-1xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6">SQL Query Executor</h1>

      {/* Query input */}
      <textarea
        className="w-full h-48 p-4 bg-white border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none mb-6"
        placeholder="Enter your SQL query here (e.g., SELECT * FROM users WHERE age > 30)"
        value={query}
        onChange={handleQueryChange}
      />

      {/* Submit button */}
      <button
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105"
        onClick={handleSubmitQuery}
      >
        Execute Query
      </button>

      {/* Error message */}
      {error && <p className="text-red-600 text-center mt-4">{error}</p>}

      {/* Query Results */}
      {results.length > 0 && (
        <div className="mt-8 text-left" md-6>
          <h2 className="text-2xl font-semibold mb-4">Query Results</h2>
          <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                {Object.keys(results[0]).map((key) => (
                  <th key={key} className="p-2 text-left font-medium">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-100 transition-all`}>
                  {Object.values(row).map((value, idx) => (
                    <td key={idx} className="p-2 text-gray-700 border-t">{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SqlScreen;
