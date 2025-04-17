import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const POSTS_API = `${REMOTE_SERVER}/api/posts`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const fetchPosts = async (cid: string) => {
    const { data } = await axiosWithCredentials.get(`${COURSES_API}/${cid}/posts`);
    return data;
};

export const getPost = async (pid: string) => {
    const { data } = await axiosWithCredentials.get(`${POSTS_API}/${pid}`);
    return data;
}

export const createPost = async (post: any, cid: string) => {
    const { data } = await axiosWithCredentials.post(`${COURSES_API}/${cid}/posts`, post);
    return data;
}

export const deletePost = async (pid: string) => {
    const { data } = await axiosWithCredentials.delete(`${POSTS_API}/${pid}`);
    return data;
}

export const updatePost = async (post: any) => {
    const { data } = await axiosWithCredentials.put(`${POSTS_API}/${post._id}`, post);
    return data;
}

