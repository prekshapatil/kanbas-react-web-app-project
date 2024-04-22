import { useNavigate, useParams, Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import * as client from "../client";
import { FaBan, FaPlus, FaSearch } from "react-icons/fa";
import './index.css';
import { useEffect, useState } from "react";
import * as clientProfile from "../../../../Users/client";
import { addQuiz, setQuiz, updateQuiz } from "../quizzesReducer";

function Questions() {
    const quiz = useSelector((state: KanbasState) =>
        state.quizzesReducer.quiz);
    const dispatch = useDispatch();
    const { quizId } = useParams();
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState();

    const calculatePoints = (questions: any) => {
        let points = 0;
        questions.forEach((question: any) => {
            points += question.points;
        });
        return points;
    }

    const handleAddQuiz = (isPublished: any) => {
        const newQuiz = { ...quiz, isPublished: isPublished, points: calculatePoints(quiz.questions)};
        dispatch(setQuiz(newQuiz));
        if (isPublished) {
            client.createQuiz(courseId, newQuiz).then((newQ) => {
                dispatch(addQuiz(newQ));
                dispatch(setQuiz(newQ));
                navigate(`/Kanbas/Courses/${courseId}/Quizzes/`); // Navigate after receiving the response
            });
        } else {
            client.createQuiz(courseId, newQuiz).then((newQ) => {
                dispatch(addQuiz(newQ));
                dispatch(setQuiz(newQ));
                navigate(`/Kanbas/Courses/${courseId}/Quizzes/${newQ._id}}`); // Navigate after receiving the response
            });
        }
    };

    const handleNavigate = (id: any) => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/question/${id}`)
    }

    const handleUpdateQuiz = (isPublished: any) => {
        const newQuiz = { ...quiz, isPublished: isPublished, points: calculatePoints(quiz.questions)};
        dispatch(setQuiz(newQuiz));
        if (isPublished) {
            dispatch(setQuiz(newQuiz));
            client.updateQuiz(newQuiz).then(() => {
                dispatch(updateQuiz(newQuiz));
                navigate(`/Kanbas/Courses/${courseId}/Quizzes/`); // Navigate after receiving the response
            });
        } else {
            client.updateQuiz(newQuiz).then(() => {
                dispatch(updateQuiz(newQuiz));
                dispatch(setQuiz(newQuiz));
                navigate(`/Kanbas/Courses/${courseId}/Quizzes/${newQuiz._id}`); // Navigate after receiving the response
            });
        }
    };

    const handleSave = (isPublished: any) => {
        if (quizId === "new") {
            handleAddQuiz(isPublished);
        } else {
            handleUpdateQuiz(isPublished);
        }
    };


    useEffect(() => {
        if (profile === null) {
            navigate("/Kanbas/Account/Signin");
        } else if (profile === undefined) {
            clientProfile.profile()
                .then((account) => {
                    setProfile(account);
                })
                .catch((error) => {
                    navigate("/Kanbas/Account/Signin");
                });
        }
    }, [profile, navigate]);
    return (
        <div className="me-5">
            <div className="float-end mt-2 ">
                Points : {quiz.points} &nbsp; &nbsp;
                {quiz.isPublished ? <i className="fa fa-check-circle" style={{ color: "green" }} aria-hidden="true"></i> : <FaBan style={{ color: "grey" }} className="text-danger" aria-hidden="true" />}&nbsp;
                {quiz.isPublished ? "Published" : "Not Published"}
                <button type="button" className="btn btn-light"><i className="fa fa-ellipsis-v ms-2"></i></button>
            </div>
            <br />
            <br />
            <hr />
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                            <NavLink
                                    end={true}
                                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                    aria-current="page"
                                    to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit`}>
                                    Details
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    end={true}
                                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                    to={"#"}>
                                    Questions
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <hr />
            <br />

            <ul style={{ listStyleType: "none" }}>
                {quiz.questions.map((question: any, index: number) => (
                    <li key={index} className="grey-border question-box-margin">
                        <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "lightgray" }}>
                            <h4 className="m-2">{question.title}</h4>
                            <div className="m-2">{question.points} pts</div>
                        </div>
                        <div className="question-box" style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>{question.questionVal}</p>
                            <button className="btn btn-danger float-end"
                            onClick={() => handleNavigate(question._id)}
                            >Edit</button>
                        </div>
                    </li>
                ))}
            </ul>

            <br />
            <br />
            <div >

                <button className="btn btn-secondary ms-2 float-end">
                    <FaSearch aria-hidden="true" />
                    Find Questions
                </button>

                <button className="btn btn-secondary ms-2 float-end">
                    <FaPlus aria-hidden="true" />
                    New Question Group
                </button>
                <Link
                    to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Question/new`}
                >
                    <button className="btn btn-secondary ms-2 float-end " >
                        <FaPlus aria-hidden="true" />
                        New Question
                    </button>
                </Link>
            </div>
            <br />
            <br />
            <hr />
            <div>
                    <div className="float-start">
                        <input className="form-check-input" type="checkbox" id="check-9" />
                        <label className="form-check-label" htmlFor="check-9"
                        >Notify users that this content has changed</label>
                    </div>
                    <div>
                        <button
                            onClick={() => handleSave(false)}
                            className="btn btn-success ms-2 float-end"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => handleSave(true)}
                            className="btn btn-primary ms-2 float-end"
                        >
                            Save & Publish
                        </button>
                        <Link to={`/Kanbas/Courses/${courseId}/Quizzes`}
                            className="btn btn-danger float-end">
                            Cancel
                        </Link>
                    </div>
                </div>
            <br />
            <br />
            <hr />
        </div >

    )
};
export default Questions;