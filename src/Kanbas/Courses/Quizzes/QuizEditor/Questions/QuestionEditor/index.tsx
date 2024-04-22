import { useEffect, useState } from "react";
import TextBox from "../../../../../Common/TextBox";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import FillInTheBlank from "./FillInTheBlank";
import TrueFalse from "./TrueFalse";
import { Button } from "react-bootstrap";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuestions,
  setQuestion,
  addOption,
  updateQuestion,
} from "../reducer";
import { KanbasState } from "../../../../../store";
import * as client from "../client";

function QuestionEditor() {
  const navigate = useNavigate();
  const { courseId, quizId } = useParams();

  const dispatch = useDispatch();
  const [questionType, setQuestionType] = useState("MultipleChoice");
  const [currentQuestionType, setCurrentQuestionType] = useState(<></>);

  const question = useSelector(
    (state: KanbasState) => state.questionsReducer.question
  );

  const textBox = useSelector(
    (state: KanbasState) => state.textBoxReducer.textBox
  );

  useEffect(() => {
    //setQuestionType(question.type);
    checkType();
  }, [questionType]);

  useEffect(() => {
    dispatch(setQuestion({ ...question, question: textBox.text }));
  }, [textBox]);

  useEffect(() => {
    console.log("Question Updated", question);
    setQuestionType(question.type);
    checkType();
  }, []);

  const updateQues = () => {
    dispatch(updateQuestion(question));
    //var response = await client.updateQuestion(question);
    navigate(
      `/Kanbas/Courses/${courseId}/Quizzes/${quizId}/QuizEditor/questions`
    );
    //navigate back to the question list
  };

  const cancelQues = () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/QuizEditor/questions`);
  }

  const checkType = () => {
    let temp = <></>;
    if (questionType.includes("MultipleChoice")) {
      temp = <MultipleChoiceQuestion />;
    } else if (questionType.includes("TrueFalse")) {
      temp = <TrueFalse />;
    } else {
      temp = <FillInTheBlank />;
    }
    setCurrentQuestionType(temp);
  };

  return (
    <div>
      <div className="col d-flex align-items-center">
        <input
          className="form-control me-2"
          type="text"
          placeholder="Question Name"
          style={{ width: "200px" }}
          value={question.title}
          onChange={(e) => {
            dispatch(setQuestion({ ...question, title: e.target.value }));
          }}
        />
        <select
          className="form-control me-2"
          value={questionType}
          style={{ width: "200px" }}
          onChange={(e) => {
            console.log("Hello");
            setQuestionType(e.target.value);
            dispatch(setQuestion({ ...question, type: e.target.value }));
            dispatch(setQuestion({ ...question, options: [] }));
          }}
        >
          <option value="MultipleChoice">Multiple Choice</option>
          <option value="TrueFalse">True/False</option>
          <option value="FillBlank">Fill in the Blank</option>
        </select>
        <span
          className="float-end"
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            marginRight: "10px",
            marginLeft: "550px",
          }}
        >
          pts:
        </span>
        <input
          value={question.points}
          onChange={(e) => {
            dispatch(setQuestion({ ...question, points: e.target.value }));
          }}
          className="form-control"
          style={{ width: "50px" }}
          type="number"
        />
      </div>

      <hr />
      <p>
        Enter your question text, then define all possible correct answers for
        the blank.
        <br />
        Students will see the question followed by a small text box to type
        their answer.
      </p>
      <h2>Question:</h2>
      <TextBox textData={question?.question}/>
      {currentQuestionType}
      {!questionType.includes("TrueFalse") && (
        <div className="float-end me-2">
          <Button
            type="button"
            onClick={() => dispatch(addOption("Empty Option"))}
            style={{ color: "red", textDecoration: "none" }}
            className="btn btn-link"
          >
            <FaPlus className="me-2" style={{ color: "red" }} />
            Add Another Answer
          </Button>
        </div>
      )}

      <br />
      <Button className="btn btn-secondary" onClick={()=>{cancelQues()}}>Cancel</Button>
      <Button onClick={() => updateQues()} className="btn btn-danger ms-2">
        Update Question
      </Button>
    </div>
  );
}

export default QuestionEditor;
