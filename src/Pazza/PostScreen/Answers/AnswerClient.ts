import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ANSWERS_API = `${REMOTE_SERVER}/api/answers`;

export const fetchStudentAnswers = async (pid: string) => {
    const { data } = await axiosWithCredentials.get(`${ANSWERS_API}/${pid}/student`);
    return data;
};

export const fetchInstructorAnswers = async (pid: string) => {
    const { data } = await axiosWithCredentials.get(`${ANSWERS_API}/${pid}/instructor`);
    return data;
};

export const fetchAnswersForCourse = async (cid: string) => {
    const { data } = await axiosWithCredentials.get(`${ANSWERS_API}/${cid}/course`);
    return data;
};

export const fetchStudentAnswersForCourse = async (cid: string) => {
    const { data } = await axiosWithCredentials.get(`${ANSWERS_API}/${cid}/course/student`);
    return data;
};

export const fetchInstructorAnswersForCourse = async (cid: string) => {
    const { data } = await axiosWithCredentials.get(`${ANSWERS_API}/${cid}/course/instructor`);
    return data;
};

export const getAnswer = async (aid: string) => {
    const { data } = await axiosWithCredentials.get(`${ANSWERS_API}/${aid}`);
    return data;
}

export const createAnswer = async (answer: any, pid: string) => {
    const { data } = await axiosWithCredentials.post(`${ANSWERS_API}/${pid}`, answer);
    return data;
}

export const updateAnswer = async (answer: any) => {
    const { data } = await axiosWithCredentials.put(`${ANSWERS_API}/${answer._id}`, answer);
    return data;
}

export const deleteAnswer = async (aid: string) => {
    const { data } = await axiosWithCredentials.delete(`${ANSWERS_API}/${aid}`);
    return data;
}

