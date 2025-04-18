import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const TAGS_API = `${REMOTE_SERVER}/api/tags`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const fetchTags = async (cid: string) => {
    const { data } = await axiosWithCredentials.get(`${COURSES_API}/${cid}/tags`);
    return data;
};

export const getTag = async (tid: string) => {
    const { data } = await axiosWithCredentials.get(`${TAGS_API}/${tid}`);
    return data;
}

export const createTag = async (tag: any, cid: string) => {
    const { data } = await axiosWithCredentials.post(`${COURSES_API}/${cid}/tags`, tag);
    return data;
}

export const deleteTag = async (tid: string) => {
    const { data } = await axiosWithCredentials.delete(`${TAGS_API}/${tid}`);
    return data;
}

export const updateTag = async (tag: any) => {
    const { data } = await axiosWithCredentials.put(`${TAGS_API}/${tag._id}`, tag);
    return data;
}

