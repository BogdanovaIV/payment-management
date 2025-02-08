import { axiosReq, axiosRes } from "./axiosDefaults";

export const getNextPage = (url) => {
  return axiosRes.get(url);
};

export const getData = (url, filters) => {
  if (filters) {
    return axiosRes.get(url, { params: filters });
  }

  return axiosRes.get(url);
};

export const getPartnersUrl = () => {
  return "/partners/";
};

export const getPartnerTypesUrl = () => {
  return "/partner-types/";
};
