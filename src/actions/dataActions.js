import axios from "axios";

const baseUrl = "https://dev6.dansmultipro.com/api/recruitment/positions.json";

export const getLists = async (page, desc, location, fulltime) => {
  try {
    const response = await axios.get(baseUrl, {
      params: {
        page: page,
        description: desc,
        location: location,
        full_time: fulltime,
      },
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getListsByCompany = async (desc) => {
  try {
    const response = await axios.get(baseUrl, {
      params: {
        description: desc,
      },
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getDetail = async (id) => {
  try {
    const response = await axios.get(
      "https://dev6.dansmultipro.com/api/recruitment/positions/" + id,
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
