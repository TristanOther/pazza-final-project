import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export const findRepliesForDiscussion = async (discussionId: string) => {
  const response = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/discussions/${discussionId}/replies`);
  return response.data;
};

export const getReply = async (replyId: string) => {
  const response = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/replies/${replyId}`);
  return response.data;
};

export const createReply = async (discussionId: string, reply: any) => {
  const response = await axiosWithCredentials.post(`${REMOTE_SERVER}/api/discussions/${discussionId}/replies`, reply);
  return response.data;
};

export const updateReply = async (replyId: string, reply: any) => {
  const response = await axiosWithCredentials.put(`${REMOTE_SERVER}/api/replies/${replyId}`, reply);
  return response.data;
};

export const deleteReply = async (replyId: string) => {
  const response = await axiosWithCredentials.delete(`${REMOTE_SERVER}/api/replies/${replyId}`);
  return response.data;
};

export const markAsGoodComment = async (replyId: string) => {
  const response = await axiosWithCredentials.put(`${REMOTE_SERVER}/api/replies/${replyId}/good-comment`, {});
  return response.data;
};