import { axiosReq, axiosRes } from "./axiosDefaults";

export const getNextPage = (url) => {
  return axiosRes.get(url);
};

export const getData = (url, filters) => {
  if (filters) {
    const response = axiosRes.get(url, { params: filters });
    return response;
  }
  const response = axiosRes.get(url);
  return response;
};

export const postData = (url, data) => {
  return axiosReq.post(url, data);
};

export const putData = (url, data) => {
  const { request } = axiosReq.put(url, data);
  return request;
};

export const deleteData = (url) => {
  const { response } = axiosRes.delete(url);
  return response;
};

export const getPartnersUrl = () => {
  return "/partners/";
};

export const getPartnerTypesUrl = () => {
  return "/partner-types/";
};
