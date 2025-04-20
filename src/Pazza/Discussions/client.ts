import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export const findDiscussionsForPost = async (postId: string) => {
  const response = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/posts/${postId}/discussions`);
  return response.data;
};

export const getDiscussion = async (discussionId: string) => {
  const response = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/discussions/${discussionId}`);
  return response.data;
};

export const createDiscussion = async (postId: string, discussion: any) => {
  const response = await axiosWithCredentials.post(`${REMOTE_SERVER}/api/posts/${postId}/discussions`, discussion);
  return response.data;
};

export const updateDiscussion = async (discussionId: string, discussion: any) => {
  const response = await axiosWithCredentials.put(`${REMOTE_SERVER}/api/discussions/${discussionId}`, discussion);
  return response.data;
};

export const deleteDiscussion = async (discussionId: string) => {
  const response = await axiosWithCredentials.delete(`${REMOTE_SERVER}/api/discussions/${discussionId}`);
  return response.data;
};

export const toggleResolved = async (discussionId: string) => {
  const response = await axiosWithCredentials.put(`${REMOTE_SERVER}/api/discussions/${discussionId}/resolve`, {});
  return response.data;
};

export const markAsHelpful = async (discussionId: string) => {
  const response = await axiosWithCredentials.put(`${REMOTE_SERVER}/api/discussions/${discussionId}/helpful`, {});
  return response.data;
};