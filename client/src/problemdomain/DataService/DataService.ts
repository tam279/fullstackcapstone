/**
 * The above code is a TypeScript module that uses Axios to fetch user and company data from a backend
 * API.
 * @returns The functions `fetchUserData` and `fetchCompanyData` are returning the data retrieved from
 * the backend.
 */
import axios from "axios";
import config from "../../config";

// Fetch user data from the backend
export const fetchUserData = async () => {
    // Use Axios to send a GET request to retrieve user data
  const response = await axios.get(`${config.backend}/api/users`);
  return response.data;
};

// Fetch company data from the backend
export const fetchCompanyData = async () => {
    // Use Axios to send a GET request to retrieve company data
  const response = await axios.get(`${config.backend}/api/companies`);
  return response.data;
};

