import axios from "axios";

const BASE_URL = "http://firefly.citurair.com";

const options = {
  url: BASE_URL,
};

export const fetchFromAPI = async (url: string) => {
  const data = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};
