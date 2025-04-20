import { useEffect, useState } from "react";
import Answer from "./Answer.tsx";
import ReplyCreator from "../ReplyCreator.tsx";

import * as answerClient from "./AnswerClient.ts";
import * as userClient from '../../../Kambaz/Account/client.ts';
import { useSelector } from "react-redux";

export default function FollowUpDiscussion({ post, instructor }: { post: any, instructor: boolean }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [answer, setAnswer] = useState<any>([]);
    const [replying, setReplying] = useState<boolean>(false);

    const fetchAnswers = async (pid: string) => {
        const answers = instructor
                        ? await answerClient.fetchInstructorAnswers(pid)
                        : await answerClient.fetchStudentAnswers(pid);
        const answer = answers[0];
        if (!answer) return setAnswer([]);
        answer.author = await userClient.findUserById(answer.createdBy);
        setAnswer(answer);
    };

    useEffect(() => {
        if (!post._id) return;
        fetchAnswers(post._id);
    }, [post]);

    const createAnswer = async (content: any) => {
        const newAnswer = {
            content,
            createdBy: currentUser._id,
            instructor
        };
        await answerClient.createAnswer(newAnswer, post._id);
        await fetchAnswers(post._id);
        setReplying(false);
    }

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
            {answer.content ? (
                <Answer 
                    answer={answer} 
                    deleteAnswer={deleteAnswer} 
                    editAnswer={editAnswer}
                />
            ) : (
                <div>
                    {!replying && (
                        <div>                            
                        {(instructor && !["ADMIN", "FACULTY", "TA"].includes(currentUser.role)) ? (
                            <div className="m-3"> No instructor answer yet </div>
                        ) : (
                            <div
                                className="bg-white rounded px-2 py-1 m-3"
                                style={{ cursor: "pointer", border: "1px solid #ccc" }}
                                onClick={() => setReplying(true)}
                            >
                                Click to start off an answer
                            </div>
                        )}
                        </div>
                    )}
                    {replying && (
                        <div className="mt-2 mx-2">
                            <ReplyCreator 
                                onCancel={() => setReplying(false)}
                                onSubmit={(content) => createAnswer(content)}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}