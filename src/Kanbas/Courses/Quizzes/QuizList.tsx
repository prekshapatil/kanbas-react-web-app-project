import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import {
  FaCheckCircle,
  FaEllipsisV,
  FaPlus,
  FaCaretDown,
  FaRocket,
  FaBan,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import * as client from "./client";
import { useSelector, useDispatch } from "react-redux";
import {
  addQuiz,
  updateQuiz,
  deleteQuiz,
  clearQuiz,
  setQuiz,
  setQuizzes,
} from "./reducer";
import { KanbasState } from "./../../store";

type MenuVisibleState = {
  [key: string]: boolean;
};

function QuizList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const [menuVisible, setMenuVisible] = useState<MenuVisibleState>({});
  /// const [published, setPublished] = useState(false); // State to track the published status

  const navigateToAddQuiz = () => {
    dispatch(clearQuiz());
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/QuizEditor/QuizEditor/details`);
  };

  const handleDelete = () => {
    const result = window.confirm("Are you sure you want to delete this Quiz?");
    if (result) {
      return true;
    } else {
      return false;
    }
  };

  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz);

  const quizList = useSelector(
    (state: KanbasState) => state.quizReducer.quizzes
  );

  const formatDate = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };


  const handleDeleteQuiz = async (quizId: string) => {
    const res = await client.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };

  const handleEditQuiz = () => {
    console.log("Navigating to Quiz Details screen");
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/QuizEditor`);
  };

  const handleTogglePublish = (qz: any) => {
    // Toggle the published status
    dispatch(
      updateQuiz({
        ...qz,
        published: !qz.published,
      })
    );
  };

  const toggleMenu = (quiz: any) => {
    setMenuVisible((prev) => ({
      ...prev,
      [quiz._id]: !prev[quiz._id]
    }));
  };

  useEffect(() => {
    client.findQuizForCourse(courseId).then((quizzes) => {
      dispatch(setQuizzes(quizzes));
    });
  }, [courseId]);

  const handleAvailabiltiy = (quiz : any) => {
    if (quiz.availableUntilDate && formatDate(new Date()) > quiz.availableUntilDate) {
      return 'Closed';
    } else if (quiz.availableFromDate && quiz.availableUntilDate && formatDate(new Date()) >= quiz.availableFromDate && formatDate(new Date()) <= quiz.availableUntilDate) {
      return 'Available';
    } else if (quiz.availableFromDate && formatDate(new Date()) < quiz.availableFromDate) {
      return `Not available until ${formatDate(quiz.availableFromDate)}`; // Use toDateString() for a readable format
    } else {
      return 'Not available';
    }
  }


  return (
    <div className="col me-2">
      <div className="row wd-margin-top">
        <div className="float-end wd-margin-right">
          <div className="wd-button float-end">
            <a
              className="btn btn-secondary btn-sm ms-2"
              role="button"
              style={{ backgroundColor: "lightgray" }}
            >
              <FaEllipsisV />
            </a>
          </div>
          <div className="wd-button float-end">
            <Button variant="danger btn-sm" onClick={navigateToAddQuiz}>
              <FaPlus className="me-1" />
              Quiz
            </Button>{" "}
          </div>

          <div className="float-start w-25">
            <input
              className="form-control"
              id="input1"
              placeholder="Search for Quiz"
            />
          </div>
        </div>
      </div>
      <hr></hr>

      <div className="wd-assignments-list">
        <ul
          className="list-group wd-margin-left"
          style={{ borderRadius: "0%" }}
        >
          <li className="list-group-item list-group-item-secondary">
            <div>
              <FaCaretDown className="me-2" />
              <b>Assignment Quizzes</b>
            </div>
          </li>
            {(quizList.length === 0 ||  quizList === null ) ? 
            (<div style = {{borderStyle: "solid", textAlign: "center", marginTop: "10px", marginLeft: "200px", marginRight: "200px"}}>
              No quizzes available. Click on Add Quiz Button to create a quiz.
            </div>) : (
          <ul className="list-group" style={{ borderRadius: "0%" }}>
            {quizList.map((quiz) => (
              <li className="list-group-item">
                <div className="row">
                  <div
                    className="col-auto"
                    style={{ margin: "auto", display: "flex" }}
                  >
                    <FaRocket style={{ color: "green" }} />
                  </div>
                  <div className="col wd-fg-color-gray ps-0 ms-2">
                    <Link
                      onClick={(e) => dispatch(setQuiz(quiz))}
                      style={{ color: "green", textDecoration: "none" }}
                      className="fw-bold ps-0"
                      to={`${quiz._id}`}
                    >
                      {/* Q1 - HTML */}
                      {quiz.title}
                    </Link>
                    <br />
                    {handleAvailabiltiy(quiz)} |<b> Due</b> {formatDate(quiz.dueDate)} |{" "}
                    {quiz.points} pts | {quiz.numberOfQuestions} Questions
                    {/* Sep 21 at 1pm | 29 pts | 11 questions */}
                  </div>
                  <div
                    className="col-auto"
                    style={{ margin: "auto", display: "flex" }}
                  >
                    {quiz.published ? (
                      <FaCheckCircle
                        className="ms-4"
                        style={{
                          color: "green",
                          cursor: "pointer",
                          verticalAlign: "middle",
                          marginTop: "5px",
                        }}
                        onClick={() => handleTogglePublish(quiz)}
                      />
                    ) : (
                      <FaBan
                        className="ms-4"
                        style={{
                          color: "red",
                          cursor: "pointer",
                          verticalAlign: "middle",
                          marginTop: "5px",
                        }}
                        onClick={() => handleTogglePublish(quiz)}
                      />
                    )}

                    <div
                      className="dropdown"
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <a>
                        <FaEllipsisV
                          className="ms-4"
                          role="button"
                          style={{ verticalAlign: "middle" }}
                          onClick={() => toggleMenu(quiz)}
                        />
                        {menuVisible[quiz._id] && (
                          <div
                            className="menu"
                            style={{
                              position: "absolute",
                              top: "100%",
                              left: "-50%",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              backgroundColor: "white",
                              padding: "8px",
                              opacity: 0.9,
                              zIndex: 1000,
                            }}
                          >
                            <option onClick={handleEditQuiz}>Edit</option>
                            <option
                              onClick={() => {
                                if (handleDelete()) {
                                  handleDeleteQuiz(quiz._id);
                                }
                              }}
                            >
                              Delete
                            </option>
                            <option onClick={() => handleTogglePublish(quiz)}>
                              {quiz.published ? "Unpublish" : "Publish"}{" "}
                              {/* Toggle the description based on the published status */}
                            </option>
                          </div>
                        )}
                      </a>
                    </div>

                    <div className="dropdown"></div>
                  </div>
                </div>
              </li>
            ))}
          </ul> ) }
        </ul>
      </div>
    </div>
  );
}

export default QuizList;
