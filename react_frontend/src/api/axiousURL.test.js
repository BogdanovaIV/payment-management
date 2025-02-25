import { axiosReq, axiosRes } from "./axiosDefaults";
import {
  getNextPage,
  getData,
  postData,
  putData,
  deleteData,
  getPartnersUrl,
  getPartnerTypesUrl,
  getPaymentRequestsUrl,
  getPaymentRequestStatusesUrl,
  getUserProfileUrl,
} from "./axiosURL";

jest.mock("./axiosDefaults", () => ({
  axiosReq: {
    post: jest.fn(),
    put: jest.fn(),
  },
  axiosRes: {
    get: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("API functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getNextPage makes a GET request", async () => {
    const mockResponse = { data: "next page data" };
    axiosRes.get.mockResolvedValueOnce(mockResponse);

    const result = await getNextPage("/next-page");

    expect(axiosRes.get).toHaveBeenCalledWith("/next-page");
    expect(result).toEqual(mockResponse);
  });

  test("getNextPage throws an error when request fails", async () => {
    const error = new Error("Network Error");
    axiosRes.get.mockRejectedValueOnce(error);

    await expect(getNextPage("/next-page")).rejects.toThrow("Network Error");
  });

  test("getData makes a GET request without filters", async () => {
    const mockResponse = { data: "data response" };
    axiosRes.get.mockResolvedValueOnce(mockResponse);

    const result = await getData("/data");

    expect(axiosRes.get).toHaveBeenCalledWith("/data");
    expect(result).toEqual(mockResponse);
  });

  test("getData throws an error when request fails", async () => {
    const error = new Error("Failed to fetch data");
    axiosRes.get.mockRejectedValueOnce(error);

    await expect(getData("/data")).rejects.toThrow("Failed to fetch data");
  });

  test("getData makes a GET request with filters", async () => {
    const mockResponse = { data: "filtered data" };
    const filters = { key: "value" };
    axiosRes.get.mockResolvedValueOnce(mockResponse);

    const result = await getData("/data", filters);

    expect(axiosRes.get).toHaveBeenCalledWith("/data", { params: filters });
    expect(result).toEqual(mockResponse);
  });

  test("getData with filters throws an error when request fails", async () => {
    const error = new Error("Failed to fetch data");
    axiosRes.get.mockRejectedValueOnce(error);
    const filters = { key: "value" };

    await expect(getData("/data", filters)).rejects.toThrow("Failed to fetch data");
  });

  test("postData throws an error when request fails", async () => {
    const error = new Error("Failed to post data");
    axiosReq.post.mockRejectedValueOnce(error);

    await expect(postData("/post", { key: "value" })).rejects.toThrow("Failed to post data");
  });

  test("postData makes a POST request", async () => {
    const mockResponse = { data: "post response" };
    const payload = { key: "value" };
    axiosReq.post.mockResolvedValueOnce(mockResponse);

    const result = await postData("/post", payload);

    expect(axiosReq.post).toHaveBeenCalledWith("/post", payload);
    expect(result).toEqual(mockResponse);
  });

  test("putData makes a PUT request", async () => {
    const mockRequest = { status: 200 };
    const payload = { key: "updated value" };
    axiosReq.put.mockResolvedValueOnce({ request: mockRequest });

    const result = await putData("/put", payload);

    expect(axiosReq.put).toHaveBeenCalledWith("/put", payload);
    expect(result).toEqual(mockRequest);
  });

  test("putData throws an error when request fails", async () => {
    const error = new Error("Failed to update data");
    axiosReq.put.mockRejectedValueOnce(error);

    await expect(putData("/put", { key: "updated value" })).rejects.toThrow("Failed to update data");
  });

  test("deleteData makes a DELETE request", async () => {
    const mockResponse = { status: 204 };
    axiosRes.delete.mockResolvedValueOnce({ response: mockResponse });

    const result = await deleteData("/delete");

    expect(axiosRes.delete).toHaveBeenCalledWith("/delete");
    expect(result).toEqual(mockResponse);
  });

  test("deleteData throws an error when request fails", async () => {
    const error = new Error("Failed to delete data");
    axiosRes.delete.mockRejectedValueOnce(error);

    await expect(deleteData("/delete")).rejects.toThrow("Failed to delete data");
  });

  test("getPartnersUrl returns correct URL", () => {
    expect(getPartnersUrl()).toBe("/partners/");
  });

  test("getPartnerTypesUrl returns correct URL", () => {
    expect(getPartnerTypesUrl()).toBe("/partner-types/");
  });

  test("getPaymentRequestsUrl returns correct URL", () => {
    expect(getPaymentRequestsUrl()).toBe("/payment-request/");
  });

  test("getPaymentRequestStatusesUrl returns correct URL", () => {
    expect(getPaymentRequestStatusesUrl()).toBe("/payment-request-statuses/");
  });

  test("getUserProfileUrl returns correct URL", () => {
    expect(getUserProfileUrl()).toBe("/user-profiles/");
  });
});
