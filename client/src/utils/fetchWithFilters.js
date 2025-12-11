import { axiosInstance } from '../api/apiConfig';

export const fetchWithFilters = async ({
  endpoint,
  page = 1,
  page_size = 10,
  search = '',
  ordering = '',
  extraParams = {},
}) => {
  try {
    const params = {
      page,
      page_size,
      search: search || undefined,
      ordering: ordering || undefined,
      ...extraParams, // e.g., category, status, date_from
    };

    const res = await axiosInstance.get(endpoint, { params });
    return {
      results: res.data.results,
      count: res.data.count,
      next: res.data.next,
      previous: res.data.previous,
    };
  } catch (err) {
    console.error('Error fetching data:', err);
    return { results: [], count: 0, next: null, previous: null };
  }
};
