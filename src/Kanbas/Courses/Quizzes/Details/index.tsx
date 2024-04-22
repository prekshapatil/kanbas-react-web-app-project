import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import * as client from "../client";
import { useEffect, useState } from "react";
import { setQuiz, updateQuiz } from "../quizzesReducer";
import * as clientProfile from "../../../../Users/client";

function QuizDetails() {
    const [profile, setProfile] = useState();
    const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
    const user = useSelector((state: KanbasState) => state.userReducer.user);
    const quizId = useParams().quizId;
    const courseId = useParams().courseId;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        clientProfile.profile()
        .then((account) => {
          setProfile(account);
        })
        .catch((error) => {
          // Handle errors, if any
          console.error("Error fetching profile:");
        });
        client.findQuizById(quizId)
            .then((q:any) => {
                dispatch(setQuiz(q));
            });
    }
    , [quizId]);

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

    const handlePublishToggle = () => {
        const updatedQuiz = { ...quiz, isPublished: !quiz.isPublished };
        client.updateQuiz(updatedQuiz).then(() => {
          dispatch(setQuiz(updatedQuiz));
        });
      };
    return (
        <div className="me-5">
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-end">
            {user.role !== "STUDENT" && (<button type="button" className={`btn ${quiz.isPublished ? "btn-danger" : "btn-success"}`} onClick={() => handlePublishToggle()}>
                                <i className="fa fa-check-circle" style={{ color: "white" }} aria-hidden="true"></i> {quiz.isPublished ? "Unpublish" : "Publish"}
                            </button>    )}
                {user.role !== "STUDENT" && (<Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/Preview/0` } ><button type="button" className="btn btn-light">Preview</button></Link>)}
                &nbsp; 
                {user.role !== "STUDENT" && (<Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/edit`}><button type="button" className="btn btn-light"><i className="fa fa-pencil" aria-hidden="true"></i> Edit</button></Link>)}
                {user.role === "STUDENT" && (<Link to={`#`}><button type="button" className="btn btn-success"><i className="fa fa-pencil" aria-hidden="true"></i> Start Quiz</button></Link>)}
                <button type="button" className="btn btn-light"><i className="fa fa-ellipsis-v ms-2"></i></button>
            </div>
            <hr />
            <h2>{quiz.title}</h2>
            <br />
            <br />
            <div className="container">
                <div className="row">
                    <div className="col-3" style={{paddingBottom:"0.3em"}}>
                        <div className="float-end" ><b>Quiz Type</b></div>
                    </div>
                    <div className="col-7">
                        {quiz.quizType}
                    </div>
                </div>
                <div className="row">
                    <div className="col-3" style={{paddingBottom:"0.3em"}}>
                        <div className="float-end"><b>Points</b></div>
                    </div>
                    <div className="col-7">
                        {quiz.points}
                    </div>
                </div>
                <div className="row">
                    <div className="col-3" style={{paddingBottom:"0.3em"}}>
                        <div className="float-end"><b>Assignment Group</b></div>
                    </div>
                    <div className="col-7">
                        {quiz.assignmentGroup}
                    </div>
                </div>
                <div className="row">
                    <div className="col-3" style={{paddingBottom:"0.3em"}}>
                        <div className="float-end"><b>Shuffle Answer</b></div>
                    </div>
                    <div className="col-7">
                        {quiz.isShuffled ? "Yes" : "No"}
                    </div>
                </div>
                <div className="row">
                    <div className="col-3" style={{paddingBottom:"0.3em"}}>
                        <div className="float-end"><b>Time Limit</b></div>
                    </div>
                    <div className="col-7">
                        {quiz.timeLimit} Minutes
                    </div>
                    </div>
                <div className="row">
                    <div className="col-3" style={{paddingBottom:"0.3em"}}>
                        <div className="float-end"><b>Multiple Attemps</b></div>
                    </div>
                    <div className="col-7" style={{paddingBottom:"0.3em"}}>
                        {quiz.ismultipleAttempts ? "Yes" : "No"}
                    </div>
                </div>
                <div className="row">
                    <div className="col-3" style={{paddingBottom:"0.3em"}}>
                        <div className="float-end"><b>View Response</b></div>
                    </div>
                    <div className="col-7">
                        {quiz.viewResponse}
                    </div>
                </div>
                <div className="row">
                    <div className="col-3" style={{paddingBottom:"0.3em"}}>
                        <div className="float-end"><b>Show Correct Answers</b></div>
                    </div>
                    <div className="col-7">
                        {quiz.showCorrectAnswers}
                    </div>
                    </div>
                <div className="row">
                    <div className="col-3" style={{paddingBottom:"0.3em"}}>
                        <div className="float-end"><b>Access Code</b></div>
                    </div>
                    <div className="col-7">
                        {quiz.accessCode}
                    </div>
                </div>
                <div className="row">
                    <div className="col-3" style={{paddingBottom:"0.3em"}}>
                        <div className="float-end"><b>One Question At a Time</b></div>
                    </div>
                    <div className="col-7">
                        {quiz.onQuestionAtaTime ? "Yes" : "No"}
                    </div>
                </div>
                <div className="row">
                    <div className="col-3" style={{paddingBottom:"0.3em"}}>
                        <div className="float-end"><b>Webcam Required</b></div>
                    </div>
                    <div className="col-7">
                        {quiz.webcamRequired ? "Yes" : "No"}
                    </div>
                </div>
                <div className="row">
                    <div className="col-3" style={{paddingBottom:"0.3em"}}>
                        <div className="float-end"><b>Lock Questions After Answering</b></div>
                    </div>
                    <div className="col-7">
                        {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
                    </div>                
                </div>
                <br />
                <br />
                <div className="row">
                    <div className="col-3">
                        <div className="float-start"><b>Due Date</b></div>
                    </div>
                    <div className="col-3">
                        <div className="float-start"><b>For</b></div>
                    </div>
                    <div className="col-3">
                        <div className="float-start"><b>Available From</b></div>
                    </div>
                    <div className="col-3">
                        <div className="float-start"><b>Until</b></div>
                    </div> 
                </div>     
                <hr />
                <div className="row">
                    <div className="col-3">
                        <div className="float-start">{quiz.dueDate}</div>
                    </div>
                    <div className="col-3">
                        <div className="float-start">Everyone</div>
                    </div>
                    <div className="col-3">
                        <div className="float-start">{quiz.availabilityDate}</div>
                    </div>
                    <div className="col-3">
                        <div className="float-start">{quiz.untilDate}</div>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    );
}

export default QuizDetails;
