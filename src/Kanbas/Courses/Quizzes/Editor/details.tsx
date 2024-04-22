import React, { useEffect, useState } from "react"
import { useNavigate, useParams, Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import * as client from "../client";
import { FaBan } from "react-icons/fa";
import './index.css'
import { addQuiz, setQuiz, updateQuiz } from "../quizzesReducer";

function QuizEditor() {
    const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
    const dispatch = useDispatch();
    var { quizId } = useParams();
    const { courseId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (quizId !== "new") {
            client.findQuizById(quizId).then((q: any) => {
                dispatch(setQuiz(q));
            });
        } else {
            dispatch(setQuiz({ title: "", description: "", points: 0, ...quiz }));
        }
    }, [quizId, dispatch]);


    const [quizType, setQuizType] = useState("Graded Quiz");
    const [assignmentGroup, setAssignmentGroup] = useState("Quizzes");
    const [multipleAttempts, setMultipleAttempts] = useState(false);
    const [showCorrectAnswers, setShowCorrectAnswers] = useState("Always");
    const [accessCode, setAccessCode] = useState("");

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

    const aFrom = quiz.availableFromDate;
    const aUntil = quiz.availableUntilDate;
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
                                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                    aria-current="page"
                                    to='#'>
                                    Details
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                    to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/questions`}>
                                    Questions
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <hr />
            <label htmlFor="input-1" className="form-label fw-bold"> Quiz Name </label>
            <input value={quiz?.title}
                className="form-control mb-2" onChange={(e) => dispatch(setQuiz({ ...quiz, title: e.target.value }))} />
            <br />
            <div className="row ">
            </div>
            <hr />
            <label htmlFor="input-1" className="form-label fw-bold"> Quiz Instructions: </label>
            <div className="row ms-2">
                <div className="p-0" style={{ width: '5%' }}>
                    <p>Edit</p>
                </div>
                <div className="p-0" style={{ width: '5%' }}>
                    <p>View</p>
                </div>
                <div className="p-0" style={{ width: '5%' }}>
                    <p>Insert</p>
                </div>
                <div className="p-0" style={{ width: '5%' }}>
                    <p>Format</p>
                </div>
                <div className="p-0" style={{ width: '5%' }}>
                    <p>Tools</p>
                </div>
                <div className="p-0" style={{ width: '5%' }}>
                    <p>Table</p>
                </div>
                <div className="col">
                    <div className="row float-end mx-3">
                        <p>100%</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="p-1" style={{ width: '8%' }}>
                    <select className="form-select border-0">
                        <option>12pt</option>
                        <option>14pt</option>
                    </select>
                </div>
                <div className="p-1" style={{ width: '11%' }}>
                    <select className="form-select border-0">
                        <option>Paragraph</option>
                    </select>
                </div>
                <div className="p-0 pt-2" style={{ width: '3%' }}>
                    <i className="fa fa-bold" aria-hidden="true"></i>
                </div>
                <div className="p-0 pt-2" style={{ width: '3%' }}>
                    <i className="fa fa-italic" aria-hidden="true"></i>
                </div>
                <div className="p-0 pt-2" style={{ width: '3%' }}>
                    <i className="fa fa-underline" aria-hidden="true"></i>
                </div>
                <div className="p-0 pt-2" style={{ width: '2%' }}>
                    <i className="fa fa-font" aria-hidden="true"></i>
                </div>
                <div className="p-0 pt-1" style={{ width: '3%' }}>
                    <i className="fa fa-sort-desc" aria-hidden="true"></i>
                </div>
                <div className="p-0 pt-2" style={{ width: '2%' }}>
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                </div>
                <div className="p-0 pt-1" style={{ width: '3%' }}>
                    <i className="fa fa-sort-desc" aria-hidden="true"></i>
                </div>
                <div className="p-0 pt-2" style={{ width: '3%' }}>
                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                </div>
            </div>
            <br />
            <textarea
                className="form-control p-3"
                placeholder="New Description"
                value={quiz.description}
                onChange={(e) => {
                    const newValue = e.target.value;
                    dispatch(setQuiz({ ...quiz, description: newValue }));
                }}
            />

            <div className="row float-end mx-3">
                <div className="col-auto pt-1">
                    <i className="fa fa-keyboard-o text-danger" aria-hidden="true"></i>
                </div>
                <div className="col-auto pt-1">
                    <p className="text-danger ">6 Words</p>
                </div>
                <div className="col-auto pt-1">
                    <i className="fa fa-code text-danger " aria-hidden="true"></i>
                </div>
                <div className="col-auto pt-1">
                    <i className="fa fa-expand text-danger " aria-hidden="true"></i>
                </div>
                <div className="col-auto pt-1">
                    <i className="fa fa-ellipsis-v " aria-hidden="true"></i>
                </div>
            </div>
            <br />
            <br />
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-2 text-center">
                        <label className="fw-bold" htmlFor="quiz-type">Quiz Type</label>
                    </div>
                    <div className="col-7">
                        <select
                            id="quiz-type"
                            className="form-control"
                            value={quiz.quizType}
                            onChange={(e) => dispatch(setQuiz({ ...quiz, quizType: e.target.value }))}
                        >
                            <option value="Graded Quiz">Graded Quiz</option>
                            <option value="Practice Quiz">Practice Quiz</option>
                            <option value="Graded Survey">Graded Survey</option>
                            <option value="Ungraded Survey">Ungraded Survey</option>
                        </select>
                    </div>
                </div>
                <br />

                <div className="row justify-content-center align-items-center">
                    <div className="col-2 text-center">
                        <label className="fw-bold" htmlFor="assignment-Group">Assignment Group</label>
                    </div>
                    <div className="col-7">
                        <select
                            id="assignment-Group"
                            className="form-control"
                            value={quiz.assignmentGroup}
                            onChange={(e) => dispatch(setQuiz({ ...quiz, assignmentGroup: e.target.value }))}
                        >
                            <option value="Quizzes">Quizzes</option>
                            <option value="Exams">Exams</option>
                            <option value="Assignments">Assignments</option>
                            <option value="Project">Project</option>
                        </select>
                    </div>
                </div>
                <br />

                <div className="row justify-content-center align-items-center">
                    <div className="col-2 text-center">
                        <label className="fw-bold" htmlFor="input-2">Points</label>
                    </div>
                    <div className="col-7">
                        <input
                            className="form-control"
                            id="input-2"
                            value={quiz.points}
                            onChange={(e) => dispatch(setQuiz({ ...quiz, points: e.target.value }))}
                        />
                    </div>
                </div>
                <br />
            </div>

            <br />
            <br />
            <div className="container">

                <br />
                <br />

                <div className="container">
                    <h3 className="row justify-content-center">Quiz Options</h3>
                    <div className="row justify-content-center">
                        <div className="col-8">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={quiz.isShuffled}
                                    onChange={(e) => dispatch(setQuiz({ ...quiz, isShuffled: e.target.checked }))}
                                    id="shuffleAnswers"
                                />
                                <label htmlFor="shuffleAnswers" className="form-check-label fw-bold">Shuffle Answers</label>
                            </div>
                            <br />
                            <div className="form-group">
                                <label className="fw-bold" htmlFor="timeLimit">Time Limit (minutes)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="timeLimit"
                                    value={quiz.timeLimit}
                                    onChange={(e) => dispatch(setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) }))}
                                />
                            </div>
                            <br />
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={quiz.ismultipleAttempts}
                                    onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        setMultipleAttempts(isChecked);
                                        dispatch(setQuiz({ ...quiz, ismultipleAttempts: isChecked }));
                                    }}
                                    id="multipleAttempts"
                                />
                                <label htmlFor="multipleAttempts" className="form-check-label fw-bold">Multiple Attempts</label>
                            </div>
                            <br />
                            <div className="form-group">
                                <label className="fw-bold" htmlFor="showCorrectAnswers">Show Correct Answers</label>
                                <select
                                    id="showCorrectAnswers"
                                    className="form-select"
                                    value={quiz.showCorrectAnswers}
                                    onChange={(e) => {
                                        const newValue = e.target.value;
                                        setShowCorrectAnswers(newValue);
                                        dispatch(setQuiz({ ...quiz, showCorrectAnswers: newValue }));
                                    }}
                                >
                                    <option value="Immediately">Immediately</option>
                                    <option value="After all attempts are graded">After all attempts are graded</option>
                                    <option value="After due date">After due date</option>
                                </select>
                            </div>
                            <br />
                            <div className="form-group">
                                <label className="fw-bold" htmlFor="accessCode">Access Code</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="accessCode"
                                    value={quiz.accessCode}
                                    onChange={(e) => {
                                        const newValue = e.target.value;
                                        setAccessCode(newValue);
                                        dispatch(setQuiz({ ...quiz, accessCode: newValue }));
                                    }}
                                />
                            </div>
                            <br />
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={quiz.onQuestionAtaTime}
                                    onChange={(e) => dispatch(setQuiz({ ...quiz, onQuestionAtaTime: e.target.checked }))}
                                    id="onQuestionAtaTime"
                                />
                                <label htmlFor="onQuestionAtaTime" className="form-check-label fw-bold">One Question at a Time</label>
                            </div>
                            <br />
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={quiz.webcamRequired}
                                    onChange={(e) => dispatch(setQuiz({ ...quiz, webcamRequired: e.target.checked }))}
                                    id="webcamRequired"
                                />
                                <label htmlFor="webcamRequired" className="form-check-label fw-bold">Webcam Required</label>
                            </div>
                            <br />
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={quiz.lockQuestionsAfterAnswering}
                                    onChange={(e) => dispatch(setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked }))}
                                    id="lockQuestionsAfterAnswering"
                                />
                                <label htmlFor="lockQuestionsAfterAnswering" className="form-check-label fw-bold">Lock Questions After Answering</label>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-2 text-end">
                                    <div>Assign</div>
                                </div>
                                <div className="col-8">
                                    <ul className="list-group list-group-item wd-kanbas-edit-section">
                                        <li className="list-group-item border-0">
                                            <b>Due</b>
                                        </li>
                                        <li className="list-group-item border-0">
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="input-4"
                                                value={quiz.dueDate}
                                                onChange={(e) => dispatch(setQuiz({ ...quiz, dueDate: e.target.value }))}
                                            />
                                        </li>
                                        <li className="list-group-item border-0">
                                            <div className="row">
                                                <div className="col-6 text-start">
                                                    <b className="wd-kanbas-width-45">Available from</b>
                                                </div>
                                                <div className="col-6 text-start">
                                                    <b className="wd-kanbas-width-45">Until</b>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item border-0">
                                            <div className="row">
                                                <div className="col-6">
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="input-5"
                                                        value={quiz.availabilityDate}
                                                        onChange={(e) => dispatch(setQuiz({ ...quiz, availabilityDate: e.target.value }))}
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="input-6"
                                                        value={quiz.untilDate}
                                                        onChange={(e) => dispatch(setQuiz({ ...quiz, untilDate: e.target.value }))}
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-2"></div>
                            </div>
                        </div>
                    </div>
                </div>


                <hr />
                <br />
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

            </div>


        </div>)
};
export default QuizEditor;