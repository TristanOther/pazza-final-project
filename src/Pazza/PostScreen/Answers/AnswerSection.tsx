import { useEffect, useState } from "react";

import * as answerClient from "./AnswerClient.ts";
import * as userClient from '../../../Kambaz/Account/client.ts';
import Answer from "./Answer.tsx";
//import AnswerCreator from "./AnswerCreator.tsx";
//import { useSelector } from "react-redux";

export default function FollowUpDiscussion({ post, instructor }: { post: any, instructor: boolean }) {
    //const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [answer, setAnswer] = useState<any>([]);

    const fetchAnswers = async (pid: string) => {
        const answers = instructor
                        ? await answerClient.fetchInstructorAnswers(pid)
                        : await answerClient.fetchStudentAnswers(pid);
        const answer = answers[0];
        if (!answer) return;
        answer.author = await userClient.findUserById(answer.createdBy);
        setAnswer(answer);
    };

    useEffect(() => {
        if (!post._id) return;
        fetchAnswers(post._id);
    }, [post]);

    // const createAnswer = async (content: any) => {
    //     const newAnswer = {
    //         content,
    //         createdBy: currentUser._id,
    //         instructor
    //     };
    //     await answerClient.createAnswer(newAnswer, post._id);
    //     await fetchAnswers(post._id);
    // }

    const deleteAnswer = async (aid: string) => {
        await answerClient.deleteAnswer(aid);
        await fetchAnswers(post._id);
    }

    const editAnswer = async (answer: any) => {
        await answerClient.updateAnswer(answer);
        await fetchAnswers(post._id);
    }

    return (
        <div>
            {answer.content && (
                <Answer 
                    answer={answer} 
                    deleteAnswer={deleteAnswer} 
                    editAnswer={editAnswer}
                />
            )}
        </div>
    )
}