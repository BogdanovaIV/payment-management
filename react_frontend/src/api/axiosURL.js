import { axiosReq, axiosRes } from "./axiosDefaults";

export const getNextPage = async (url) => {
  try {
    const response = await axiosRes.get(url);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getData = async (url, filters) => {
  try {
    if (filters) {
      const response = await axiosRes.get(url, { params: filters });
      return response;
    }
    const response = axiosRes.get(url);
    return response;
  } catch (err) {
    throw err;
  }
};

export const postData = async (url, data) => {
  try {
    const response = await axiosReq.post(url, data);
    return response;
  } catch (err) {
    throw err;
  }
};

export const putData = async (url, data) => {
  try {
    const { request } = await axiosReq.put(url, data);
    return request;
  } catch (err) {
    throw err;
  }
};

export const deleteData = async (url) => {
  try {
    const { response } = await axiosRes.delete(url);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getPartnersUrl = () => {
  return "/partners/";
};

export const getPartnerTypesUrl = () => {
  return "/partner-types/";
};
