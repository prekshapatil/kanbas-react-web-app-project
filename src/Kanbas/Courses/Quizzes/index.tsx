import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../store";
import { setQuiz, deleteQuiz, addQuiz, updateQuiz, setQuizzes } from "./quizzesReducer";
import { useEffect, useRef, useState } from "react";
import * as clientProfile from "../../../Users/client";
import * as client from "./client";

function Quizzes() {
  const initialQuiz = {
    title: "New Quiz Title",
    description: "New Quiz Description",
    courseId: "Course ID",
    points: 0,
    quizType: "Graded Quiz",
    timeLimit: 20,
    assignmentGroup: "Quizzes",
    isShuffled: true,
    ismultipleAttempts: false,
    isPublished: false,
    viewResponse: "Always",
    showCorrectAnswers: "Immediately",
    accessCode: "",
    onQuestionAtaTime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "2023-09-18",
    availabilityDate: "2023-09-11",
    untilDate: "2023-09-18",
    questions: [],
  };

  const { courseId } = useParams();
  const [profile, setProfile] = useState();
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
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

    client.findQuizzesForCourse(courseId)
      .then((quizzes) => {
        dispatch(setQuizzes(quizzes));
      })
      .catch((error) => {
        // Handle errors, if any
        console.error("Error fetching quizzes:", error);
      });
  }, [courseId]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleClickOutside = (event:any) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowContextMenu(false);
    }
  };

  const handleDeleteQuiz = (quizId:any) => {
    client.deleteQuiz(quizId).then(() => {
      dispatch(deleteQuiz(quizId));
    });
  };

  const handlePublishToggle = (quizId:any) => {
    const quizToUpdate = quizzes.find(quiz => quiz._id === quizId);
    const updatedQuiz = { ...quizToUpdate, isPublished: !quizToUpdate.isPublished };
    client.updateQuiz(updatedQuiz).then(() => {
      dispatch(updateQuiz(updatedQuiz));
    });
  };

  const quizzes = useSelector((state: KanbasState) =>
    state.quizzesReducer.quizzes
  );
  const quiz = useSelector((state: KanbasState) =>
    state.quizzesReducer.quiz
  );
  const user = useSelector((state: KanbasState) => state.userReducer.user);

  const dispatch = useDispatch();

  const toggleContextMenu = (quizId:any, event:any) => {
    setMenuPosition({ x: event.clientX-80, y: event.clientY });
    setShowContextMenu(!showContextMenu);
    setSelectedQuizId(quizId);
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
          navigate('/Kanbas/Account/Signin');
        });
    }
  }, [profile, navigate]);

  console.log(quizzes);
  return (
    
    <div className="wd-left-margin-10 me-5">
      <div>
      <input
        className="form-control w-25 float-start"
        placeholder="Search for Quiz"
      />
      <a href="#">
        <button type="submit" className="btn btn-light float-end">
          <i className="fa fa-ellipsis-v mt-1"></i>
        </button>
      </a>
      {user.role !== "STUDENT" && (<Link to={`/Kanbas/Courses/${courseId}/Quizzes/new/edit`}>
        <button
          type="submit"
          className="btn btn-danger float-end me-1 wd-kanbas-save-profile btn-danger"
          onClick={() => dispatch(setQuiz(initialQuiz))}
          >
          <i className="fa fa-plus"></i>
          <span className="wd-left-margin-10">Quiz</span>
        </button>
      </Link>)}
      <br />
      <br />
      <hr />
      <br />
      <>
        {quizzes.length > 0 && (<ul className="list-group rounded-0">
          <li className="list-group-item list-group-item-secondary wd-kanbas-module-header-padding wd-kanbas-list-group-header">
            <div className="mt-2">
              <b>Assignment Quizzes</b>
            </div>
          </li>
          <br />
          <ul className="list-group">
            {quizzes 
              .filter((quiz) => quiz.courseId === courseId)
              .map((quiz) => (
                <li key={quiz._id} className={`${user.role === "STUDENT"? !quiz.isPublished?"list-group-item":"list-group-item wd-kanbas-assignment-border":"list-group-item wd-kanbas-assignment-border"}`}>
                  <div className=" ms-3">
                    <i className="fa fa-pencil-square-o fa-2x float-start mt-3  mb-3 icon-front wd-kanbas-green"></i>
                    <i className="fa fa-ellipsis-v fa-2x float-end mt-3 ms-2" onClick={(event) => toggleContextMenu(quiz._id, event)}></i>
                    {user.role !== "STUDENT" && (<i className={`${quiz.isPublished?"fa fa-check-circle fa-2x float-end mt-3 me-4 wd-kanbas-green":"fa fa-check-circle fa-2x float-end mt-3 me-4 wd-kanbas-faded-green"}`} onClick={() => handlePublishToggle(quiz._id)}></i>)}
                    {user.role === "STUDENT" && (<i className={`${quiz.isPublished?"fa fa-check-circle fa-2x float-end mt-3 me-4 wd-kanbas-green":"fa fa-times-circle-o fa-2x float-end mt-3 me-4 wd-kanbas-red"}`}></i>)}
                    <h4 className=" mt-1 mb-1">
                      <Link
                        to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}
                        className="wd-kanbas-no-underline wd-kanbas-black"
                        onClick={() => dispatch(setQuiz(quiz))}
                      >
                        {quiz.title}
                      </Link>
                    </h4>
                    <div>
                      {quiz.description}
                      <br />
                      <b>{new Date(quiz.untilDate) < new Date() ? "Closed" : (new Date(quiz.availabilityDate) < new Date() && quiz.untilDate > new Date(new Date())) ? "Available" : `Not available until ${quiz.availabilityDate}`}</b> &nbsp;  |  &nbsp; <b>Due</b>  {quiz.dueDate} at 11:59pm  {(quiz.isPublished || user.role !== "STUDENT") && <>&nbsp; |  &nbsp; {quiz.points} points  &nbsp; |  &nbsp; {quiz.questions.length} questions</>}
                    </div>
                  </div>
                  {user.role !== "STUDENT" && showContextMenu && selectedQuizId == quiz._id && (
                <div ref={menuRef} className="floating-menu" style={{ top: menuPosition.y, left: menuPosition.x }}>
                  <ul>
                    <li onClick={() => handleDeleteQuiz(quiz._id)}>Delete</li>
                    <li>
                      <Link style={{textDecoration:"None", color:"black"}} to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/edit`}>Edit</Link>
                    </li>
                    <li onClick={() => handlePublishToggle(quiz._id)}>
                      {quiz.isPublished ? "Unpublish" : "Publish"}
                    </li>
                  </ul>
                  </div>
                  )}
                </li>
              ))}
          </ul>
        </ul>)}
        <br />
        {quizzes.length === 0 && (
          <div className="d-flex justify-content-center">
            <p> Click <b>+ Quiz</b> button to add new Quiz.</p>
            </div>
            )}
      </>
      </div>
    </div>
  );
}

export default Quizzes;
