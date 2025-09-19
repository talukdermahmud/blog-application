import axios from "axios";
import { Post, User } from "@/types/types";

// Create an axios instance without baseURL or cookie-based authentication
export const httpClient = async () => {
  const config = axios.create({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return config;
};

// Fetch all posts
export const fetchPosts = async (): Promise<Post[]> => {
  const getHttpClient = await httpClient();
  const response = await getHttpClient.get<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
};

// Fetch a single post by ID
export const fetchPostById = async (postData: {
  id: number;
}): Promise<Post> => {
  const getHttpClient = await httpClient();
  const response = await getHttpClient.get<Post>(
    `https://jsonplaceholder.typicode.com/posts/${postData.id}`
  );
  return response.data;
};

// Fetch all users
export const fetchUsers = async (): Promise<User[]> => {
  const getHttpClient = await httpClient();
  const response = await getHttpClient.get<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
};
