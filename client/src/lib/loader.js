import apiRequest from "./apiRequest.js";

const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest.get(`/posts/${params.id}`);
  return res.data;
};

const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  console.log(query)
  try {
    const res = await apiRequest.get(`/posts?${query}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    throw error; // Ensure any errors are propagated
  }
};

export { singlePageLoader, listPageLoader };
