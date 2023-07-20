// DataService.ts path: C:\Users\nguye\OneDrive\Desktop\project-managment-website\fullstackcapstone\client\src\problemdomain\DataService\DataService.ts
import axios from "axios";
import config from "../../config";

export const fetchUserData = async () => {
  const response = await axios.get(`${config.backend}/api/users`);
  return response.data;
};

export const fetchCompanyData = async () => {
  const response = await axios.get(`${config.backend}/api/companies`);
  return response.data;
};

