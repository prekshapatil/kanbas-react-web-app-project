import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { setQuiz } from "../quizzesReducer"; // Only import necessary actions
import { useEffect, useState } from "react";
import * as client from "../client";
import * as clientProfile from "../../../../Users/client";

function PreviewQuiz() {
    const [question, setQuestion] = useState<any>({});
    const [profile, setProfile] = useState();
    const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
    const quizId = useParams().quizId;
    const questionIndex = useParams().qIndex?.toString() || "0";
    const courseId = useParams().courseId;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        clientProfile.profile()
        .then((account) => {
          setProfile(account);
        })
        .catch((error) => {
          console.error("Error fetching profile:");
        });

        client.findQuizById(quizId)
            .then((q: any) => {
                dispatch(setQuiz(q));
                setQuestion(q.questions[parseInt(questionIndex)] || {});
            });
        clientProfile.profile().then((account) => {
            setProfile(account);
        });
    }, [quizId, questionIndex]);

    useEffect(() => {
        if (profile === null) {
        navigate("/Kanbas/Account/Signin");
        } else if (profile === undefined) {
        clientProfile.profile()
            .then((account) => {
            setProfile(account);
            })
            .catch((error) => {
            navigate('/Kanbas/Account/Signin');
            });
        }
    }, [profile, navigate]);
    return (
        <div >
            {quiz.questions.length > 0 && (<div className="container" style={{ display: 'flex', flexWrap: 'wrap' }}>
            <div className="main-content">
                <h2 style={{marginBottom:"15px"}}>{quiz.title}</h2>
                <div className="full-length-text-box"><i className="fa fa-info-circle" aria-hidden="true" style={{color:"rgb(171, 11, 11)"}}></i> This is a preview of the published version of the quiz.</div>
                <p style={{marginBottom:"5px"}}>Started: Nov 29 12:00 AM</p>
                <h2>Quiz Instructions</h2>
                <hr />
                <div className="grey-border question-box-margin">
                    <div className="transparent-grey-background grey-border-bottom " style={{display:"flex"}}>
                        <h4>{question.title}</h4>
                        <div style={{marginLeft: "auto", color:"grey"}}>{question.points} pts</div>
                    </div>
                    <div className="question-box" >
                        <p style={{marginBottom:"28px"}}>{question.questionVal}</p>
                        <hr className="hr-margin"/>
                        {question.questionType === "Multiple Choice" && (
                            <div>
                                {question.choices.map((choice: any, index: number) => (
                                    <div key={index}>
                                        <input type="radio" id={index.toString()} name="choice" value={choice.text} />
                                        <label htmlFor={index.toString()}>&nbsp; {choice.text} </label>
                                        {index != question.choices.length - 1 && <hr className="hr-margin"/>}
                                    </div>
                                ))}
                            </div>
                        )}
                        {question.questionType === "True/False" && (
                            <div>
                                <input type="radio" id="true" name="choicetrue" value="true" />
                                <label htmlFor="true">&nbsp; True </label>
                                <hr className="hr-margin"/>
                                <input type="radio" id="false" name="choicefalse" value="false" />
                                <label htmlFor="false">&nbsp; False </label>
                            </div>
                        )}
                        {question.questionType === "Fill in the Blanks" && (
                            <div>
                                {question.blanks.map((blank: any, index: number) => (
                                    <div key={index}>
                                        <label htmlFor={index.toString()}>{index + 1}</label>
                                        &nbsp;
                                        <input type="text" id={index.toString()} name="blank" />
                                        {index != question.blanks.length - 1 && <hr className="hr-margin"/>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div style={{marginRight:"42px", marginLeft:"42px" ,overflow:"hidden"}}>
                {parseInt(questionIndex) != 0 && <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Preview/${parseInt(questionIndex) - 1}`}> <button className="btn btn-light"><i className="fa fa-caret-left" aria-hidden="true"></i> Previous</button></Link>}
                {parseInt(questionIndex) != quiz.questions.length - 1 && <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Preview/${parseInt(questionIndex)+1}`}> <button className="btn btn-light float-end">Next <i className="fa fa-caret-right" aria-hidden="true"></i></button></Link>}
                </div>
                <div className="grey-border" style={{padding:"10px", marginTop:"35px", display:"flex"}}>
                    <div style={{marginLeft: "auto", display: "flex", alignItems: "center"}}>
                        <p className="float-end" style={{paddingTop:"5px",marginBottom:"10px", marginRight: "10px"}}>Quiz saved at 12:00 am</p>
                        <button className="btn btn-light">Submit Quiz</button>
                    </div>
                </div>
                <Link className="react-router-link" to={`#`}>
                    <div className="grey-border transparent-grey-background" style={{padding:"10px", marginTop:"35px", color:"grey", textDecoration: "none"}}>
                        <i className="fa fa-pencil" aria-hidden="true"></i> Keep Editing This Quiz
                    </div>
                </Link>
            </div>
            <div className="question-menu">
                <h3>Questions</h3>
                <ul>
                    {quiz.questions.map((q: any, index: number) => (
                        <li key={index}>
                            <i className="fa fa-question-circle-o" aria-hidden="true"></i>
                            <Link
                                to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Preview/${index}`}
                                className={ parseInt(questionIndex) === index ? 'selected-question react-router-link' : 'react-router-link'}
                                style={{ color: "rgb(140, 2, 2)" }}
                            > {q.title}
                            </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            )}
            {quiz.questions.length === 0 && (
                <div>
                    <p>No questions found</p>
                </div>)}
        </div>
    );
}

export default PreviewQuiz;
