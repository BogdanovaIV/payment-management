import { axiosReq, axiosRes } from "./axiosDefaults";

/**
 * Fetches the next page of data.
 * @param {string} url - The request URL.
 * @returns {Promise<Object>} The response.
 */
export const getNextPage = async (url) => {
  try {
    const response = await axiosRes.get(url);
    return response;
  } catch (err) {
    throw err;
  }
};

/**
 * Fetches data with optional filters.
 * @param {string} url - The request URL.
 * @param {Object} [filters] - Query parameters.
 * @returns {Promise<Object>} The response.
 */
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

/**
 * Sends a POST request.
 * @param {string} url - The request URL.
 * @param {Object} data - The request body.
 * @returns {Promise<Object>} The response.
 */
export const postData = async (url, data) => {
  try {
    const response = await axiosReq.post(url, data);
    return response;
  } catch (err) {
    throw err;
  }
};

/**
 * Sends a PUT request.
 * @param {string} url - The request URL.
 * @param {Object} data - The updated data.
 * @returns {Promise<Object>} The request object.
 */
export const putData = async (url, data) => {
  try {
    const { request } = await axiosReq.put(url, data);
    return request;
  } catch (err) {
    throw err;
  }
};

/**
 * Sends a DELETE request.
 * @param {string} url - The request URL.
 * @returns {Promise<Object>} The response.
 */
export const deleteData = async (url) => {
  try {
    const { response } = await axiosRes.delete(url);
    return response;
  } catch (err) {
    throw err;
  }
};

/** @returns {string} Partners API URL. */
export const getPartnersUrl = () => {
  return "/partners/";
};

/** @returns {string} Partner types API URL. */
export const getPartnerTypesUrl = () => {
  return "/partner-types/";
};

/** @returns {string} Payment requests API URL. */
export const getPaymentRequestsUrl = () => {
  return "/payment-request/";
};

/** @returns {string} Payment request statuses API URL. */
export const getPaymentRequestStatusesUrl = () => {
  return "/payment-request-statuses/";
};

/** @returns {string} User profiles API URL. */
export const getUserProfileUrl = () => {
  return "/user-profiles/";
};
