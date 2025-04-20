import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export const findAnswersForPost = async (postId: string) => {
  const response = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/posts/${postId}/answers`);
  return response.data;
};

export const createAnswer = async (postId: string, answer: any) => {
  const response = await axiosWithCredentials.post(`${REMOTE_SERVER}/api/posts/${postId}/answers`, answer);
  return response.data;
};

export const updateAnswer = async (answerId: string, answer: any) => {
  const response = await axiosWithCredentials.put(`${REMOTE_SERVER}/api/answers/${answerId}`, answer);
  return response.data;
};

export const deleteAnswer = async (answerId: string) => {
  const response = await axiosWithCredentials.delete(`${REMOTE_SERVER}/api/answers/${answerId}`);
  return response.data;
};