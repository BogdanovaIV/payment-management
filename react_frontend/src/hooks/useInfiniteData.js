import { useTranslation } from "react-i18next";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getData, getNextPage } from "../api/axiosURL";
import { useToast } from "../contexts/ToastContext";
import { handleRequestError } from "../utils/errorHandler";

const useInfiniteData = ({ queryKey, filters, searchQuery, url }) => {
  const { t } = useTranslation();
  const showToast = useToast();
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, refetch } =
    useInfiniteQuery({
      queryKey: [[queryKey], filters],
      queryFn: async ({ pageParam = null }) => {
        try {
          const processedFilters = filters
            ? Object.fromEntries(
                Object.entries(filters).map(([key, value]) => [
                  key,
                  typeof value === "object" && value !== null
                    ? value.id
                    : value,
                ])
              )
            : searchQuery
            ? { search: searchQuery }
            : undefined;
          const response = pageParam
            ? await getNextPage(pageParam)
            : await getData(url, processedFilters);
          return response.data;
        } catch (err) {
          if (process.env.NODE_ENV === "development") {
            console.log(err);
          }
          handleRequestError(err, showToast, t);
        }
      },
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    });

  const objects = data?.pages.flatMap((page) => page.results) || [];

  return {
    data,
    objects,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    refetch,
  };
};

export default useInfiniteData;
