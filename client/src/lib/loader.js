import apiRequest from "./apiRequest.js";

const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest.get(`/posts/${params.id}`);
  return res.data;
};

const listPageLoader = async ({ request, params }) => {
  console.log(request);
  const query = request.url.split("?")[1];
  const res = await apiRequest.get(`/posts?${query}`);
  console.log("Response data:", res.data); // Check the data received from API
  return res.data; // Return the fetched data
};

export { singlePageLoader, listPageLoader };
