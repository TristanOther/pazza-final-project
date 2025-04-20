import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const DISCUSSION_POSTS_API = `${REMOTE_SERVER}/api/discussionpost`;

export const fetchDiscussionPosts = async (pid: string) => {
    const { data } = await axiosWithCredentials.get(`${DISCUSSION_POSTS_API}/${pid}`);
    return data;
};

export const getDiscussionPost = async (dpid: string) => {
    const { data } = await axiosWithCredentials.get(`${DISCUSSION_POSTS_API}/${dpid}`);
    return data;
}

export const createDiscussionPost = async (discussionPost: any, pid: string) => {
    const { data } = await axiosWithCredentials.post(`${DISCUSSION_POSTS_API}/${pid}`, discussionPost);
    return data;
}

export const updateDiscussionPost = async (discussionPost: any) => {
    const { data } = await axiosWithCredentials.put(`${DISCUSSION_POSTS_API}/${discussionPost._id}`, discussionPost);
    return data;
}

export const deleteDiscussionPost = async (pid: string) => {
    const { data } = await axiosWithCredentials.delete(`${DISCUSSION_POSTS_API}/${pid}`);
    return data;
}

