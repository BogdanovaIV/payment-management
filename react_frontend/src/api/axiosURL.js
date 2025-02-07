import { axiosReq, axiosRes } from "./axiosDefaults";


export const getNextPage = (url) => {
    return axiosRes.get(url);
};

export const getPartners = (filters) => {
    return axiosRes.get("partners/", { params: filters });
};

export const getPartnerTypes = () => {
    return axiosRes.get("partner-types/");
};