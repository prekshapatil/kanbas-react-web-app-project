import Nav from "./QuizEditor/nav";
import QuizEditor from "./QuizEditor";
import { Routes, Route } from "react-router";
import QuizQuestion from "./QuizEditor/Questions";
import QuizDetail from "./QuizEditor/Details";
import { Link, useLocation } from "react-router-dom";
import QuizList from "./QuizList";

function Quiz() {
  return (
    <div>
      <h2>Quiz</h2>
      {/* <button>
        <Link to="1">Edit Quiz</Link>
      </button> */}
      <QuizList/>
    </div>
  );
}
export default Quiz;
