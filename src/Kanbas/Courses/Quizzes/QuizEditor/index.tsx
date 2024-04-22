import { Routes, Route, Navigate, useParams, useNavigate } from "react-router";
import Nav from "./nav";
import QuizQuestion from "./Questions";
import QuizDetail from "./Details";
import QuestionEditor from "./Questions/QuestionEditor";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { addQuiz, updateQuiz, clearQuiz, setQuiz } from "../reducer";
import Quiz from "../..";
import * as client from "../client";
import * as questionsClient from "./Questions/client";
import { Button } from "react-bootstrap";
import { useEffect } from "react";

function QuizEditor() {
  const { quizId } = useParams();
  const isAddNew = quizId === "QuizDetail";
  const { courseId } = useParams();
  const navigate = useNavigate();
  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz);

  const questionList = useSelector(
    (state: KanbasState) => state.questionsReducer.questions
  );

  const textBox = useSelector(
    (state: KanbasState) => state.textBoxReducer.textBox
  );
  const handleSave = async () => {
    console.log(textBox.text);
    handleUpdate();
    await updateQuestions();
    navigate(`/Kanbas/Courses/${courseId}/quizzes`);
  };

  useEffect(() => {
    dispatch(setQuiz({ ...quiz, instructions: textBox.text }));
  }, [textBox]);
  const updateQuestions = async () => {
    const res = await questionsClient.updateAllQuestions(quizId, questionList);
    navigate(`/Kanbas/Courses/${courseId}/quizzes`);
  };

  const handleSaveAndPublish = async() => {
    handleAddingNew();
    await updateQuestions();
    quiz.published = true;
    navigate(`/Kanbas/Courses/${courseId}/quizzes`);
  };

  const dispatch = useDispatch();

  const handleAddingNew = () => {
    client.createQuiz(courseId, quiz).then((q) => dispatch(addQuiz(q)));
  };

  const handleUpdate = async () => {
    console.log(quiz);
    const res = await client.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };

  return (
    <div>
      
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="details" />} />
        <Route path="details" element={<QuizDetail />} />
        <Route path="questions" element={<QuizQuestion />} />
      </Routes>
      <br />
      <br />
      <hr style={{ marginLeft: "10px" }} />
      <div style={{ marginLeft: "10px" }}>
        <div
          className="d-flex justify-content-between"
          style={{ paddingTop: "15px" }}
        >
          <span style={{ marginLeft: "10px", paddingTop: "5px" }}>
            <input type="checkbox" />
            Notify users that this content has changed
          </span>
          <span>
            <Link
              to={`/Kanbas/Courses/${courseId}/quizzes`}
              onClick={(e) => dispatch(clearQuiz())}
              className="btn me-2"
              style={{ height: "fit-content", backgroundColor: "#E0E0E0" }}
            >
              Cancel
            </Link>
            <Link
              to={`/Kanbas/Courses/${courseId}/quizzes`}
              onClick={handleSaveAndPublish}
              className="btn me-2"
              style={{ height: "fit-content", backgroundColor: "#E0E0E0" }}
            >
              Save and Publish
            </Link>

            <Button
              className="btn btn-danger"
              style={{ marginRight: "5px" }}
              onClick={handleSave}
            >
              Save
            </Button>
          </span>
        </div>

        <hr style={{ marginLeft: "10px" }} />
      </div>
    </div>
  );
}
export default QuizEditor;
