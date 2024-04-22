import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../store";
import { LabState } from "../../../Labs/store";
import * as client from "./client";

import { useEffect, useState } from "react";
import { addQuestion, deleteQuestion, setQuestion, setQuestions, updateQuestion, QuestionType } from "./questionsReducer";

import { setChoices } from './choicesReducer';
import { setBlanks } from './blanksReducer';

import { setQuiz, updateQuiz } from "../Quizzes/quizzesReducer";

function Question() {
  const question = useSelector((state: KanbasState) =>
    state.questionsReducer.question);
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz)
  const navigate = useNavigate();
  let newQuestion = false;
  const { courseId } = useParams();
  const { quizId } = useParams();
  const { id } = useParams();
  console.log("QuesId" + id);
  if (id == "new") {
    newQuestion = true;
  }
  const [isMcq, setIsMcq] = useState(true);
  const [isTrueFalse, setIsTrueFalse] = useState(false);
  const [isBlanks, setIsBlanks] = useState(false);
  const choices = useSelector((state: KanbasState) => state.choicesReducer.choices)
  const blanks = useSelector((state: KanbasState) => state.blanksReducer.blanks)
  const [isDisabled, setDisabled] = useState(false);

  const dispatch = useDispatch();

  const intialQuestion = {
    title: "",
    quizID: "",
    points: 100,
    questionVal: "",
    questionType: QuestionType.MultipleChoice,
    choices: [{ text: "", isCorrect: false }],
    trueFalse: true,
    blanks: [{  answer: "" }]
}

  useEffect(() => {
    if (id !== "new") {
      const fetchQuestion = async () => {
        const ques = await client.findQuestionById(quizId, id);
        dispatch(setQuestion(ques));
        dispatch(setChoices(ques.choices));
        dispatch(setBlanks(ques.blanks));
        if (ques.questionType === QuestionType.MultipleChoice) {
          setDisabled(true)
          setIsMcq(true);
          setIsTrueFalse(false);
          setIsBlanks(false);
        } else if (ques.questionType === QuestionType.TrueFalse) {
          setDisabled(true)
          setIsMcq(false);
          setIsTrueFalse(true);
          setIsBlanks(false);
        } else if (ques.questionType === QuestionType.FillInBlanks) {
          setDisabled(true)
          setIsMcq(false);
          setIsTrueFalse(false);
          setIsBlanks(true);
        }
      };
      fetchQuestion();
    }
    else{
      dispatch(setQuestion(intialQuestion));
      dispatch(setChoices(intialQuestion.choices));
      dispatch(setBlanks(intialQuestion.blanks));
    }
  }, [id, dispatch]);

  const handleAddQuestion = async () => {
    // Create the new question
    const createdQuestion = await client.createQuestion(quizId, question);
    dispatch(addQuestion(createdQuestion));
    var questionList = quiz.questions
    // questionList.push(createdQuestion._id);
    const newQuiz = { ...quiz, questions: [...questionList, createdQuestion] }
    dispatch(setQuiz(newQuiz))
    dispatch(updateQuiz({ _id: quizId, questions: [...quiz.questions, createdQuestion._id] }));
    dispatch(setQuestion(""));
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/questions`);
  };

  const handleUpdateQuestion = async () => {
    const status = await client.updateQuestion(quizId, question);
    dispatch(updateQuestion(question));
    // var questionList = quiz.questions
    const questionList = quiz.questions.filter((q: { _id: any; }) => q._id !== question._id);
    // questionList.push(createdQuestion._id);
    const newQuiz = { ...quiz, questions: [...questionList, question] }
    dispatch(setQuiz(newQuiz))
    dispatch(updateQuiz({ _id: quizId, questions: [...quiz.questions, question._id] }));
    dispatch(setQuestion(""));
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/questions`);
  };

  useEffect(() => {
    if (quizId !== "new" && question.quizId !== quizId) {
      dispatch(setQuestion({ ...question, quizId: quizId }));
    }
  }, [quizId, dispatch, question]);

  // Function to handle adding a new choice
  const handleAddChoice = () => {
    const newChoice = { text: "", isCorrect: false };
    dispatch(setChoices([...choices, newChoice]));
    dispatch(setQuestion({
      ...question,
      choices: [...choices, newChoice]
    }));
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/questions`);
  }

  // Function to handle changing choice text
  const handleChoiceTextChange = (index: number, newText: any) => {
    const updatedChoices = choices.map((choice, i) =>
      i === index ? { ...choice, text: newText } : choice
    );
    dispatch(setChoices(updatedChoices));
    dispatch(setQuestion({
      ...question,
      choices: updatedChoices // Use updatedChoices instead of choices
    }));
    console.log(updatedChoices);
  };

  // Function to handle changing correct answer
  const handleCorrectAnswerChange = (index: number) => {
    const updatedChoices = choices.map((choice, i) => ({
      ...choice,
      isCorrect: i === index,
    }));
    dispatch(setChoices(updatedChoices));
    dispatch(setQuestion({
      ...question,
      choices: updatedChoices // Use updatedChoices instead of choices
    }));
  };

  // Function to handle deleting a choice
  const handleDeleteChoice = (index: number) => {
    const updatedChoices = choices.filter((_, i) => i !== index);
    dispatch(setChoices(updatedChoices));
    dispatch(setQuestion({
      ...question,
      choices: updatedChoices // Use updatedChoices instead of choices
    }));
  };

  // Function to handle adding a new blank
  const handleAddBlank = () => {
    const newBlank = { answer: "" };
    const updatedBlanks = [...blanks, newBlank];
    dispatch(setBlanks(updatedBlanks));
    dispatch(setQuestion({
      ...question,
      blanks: updatedBlanks
    }));
  };

  // Function to handle changing blank answer text
  const handleBlanksTextChange = (index: number, newText: string) => {
    const updatedBlanks = blanks.map((blank, i) =>
      i === index ? { ...blank, answer: newText } : blank
    );
    dispatch(setBlanks(updatedBlanks));
    dispatch(setQuestion({
      ...question,
      blanks: updatedBlanks // Use updatedBlanks instead of blanks
    }));
  };

  // Function to handle deleting a blank
  const handleDeleteBlank = (index: number) => {
    const updatedBlanks = blanks.filter((_, i) => i !== index);
    dispatch(setBlanks(updatedBlanks));
    dispatch(setQuestion({
      ...question,
      blanks: updatedBlanks // Use updatedBlanks instead of blanks
    }));
  };


  return (
    <div >
      <div className="row ">
        <div className="col-3">
          <input
            placeholder="Question Title"
            type="text"
            value={question.title}
            onChange={(e) =>
              dispatch(setQuestion({ ...question, title: e.target.value }))
            }
            className="form-control"
          />
        </div>
        <div className="col-3">
          <select
            className="form-select"
            value={question.questionType}
            disabled={isDisabled}
            onChange={(e) => {
              dispatch(
                setQuestion({
                  ...question,
                  questionType: e.target.value as QuestionType
                })
              );
              if (e.target.value === QuestionType.MultipleChoice) {

                setIsMcq(true);
                setIsTrueFalse(false);
                setIsBlanks(false);
              } else if (e.target.value === QuestionType.TrueFalse) {
                setIsMcq(false);
                setIsTrueFalse(true);
                setIsBlanks(false);
              } else if (e.target.value === QuestionType.FillInBlanks) {
                setIsMcq(false);
                setIsTrueFalse(false);
                setIsBlanks(true);
              }
            }

            }
          >
            <option value={QuestionType.MultipleChoice}>Multiple Choice</option>
            <option value={QuestionType.TrueFalse}>True/False</option>
            <option value={QuestionType.FillInBlanks}>Fill in the blanks</option>
          </select>
        </div>
        <div className="col">
          <div className="row g-2 float-end">
            <div className="col-2 pt-2">
              <label htmlFor="points">Pts:</label>
            </div>
            <div className="col-4">
              <input className="form-control" type="number" id="points" value={question.points}
                onChange={(e) =>
                  dispatch(setQuestion({ ...question, points: e.target.value }))
                } />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <small>Enter your question text, then define all possible correct answers for the blank.</small>
      <br />
      <small>Students will see the question followed by a small text box to type their answers.</small>
      <br />
      <br />
      <label htmlFor="input-1" className="form-label"> Question: </label>
      <div className="row ms-2">
        <div className="p-2 col-auto">
          <p>Edit</p>
        </div>
        <div className="p-2 col-auto">
          <p>View</p>
        </div>
        <div className="p-2 col-auto" >
          <p>Insert</p>
        </div>
        <div className="p-2 col-auto" >
          <p>Format</p>
        </div>
        <div className="p-2 col-auto" >
          <p>Tools</p>
        </div>
        <div className="p-2 col-auto" >
          <p>Table</p>
        </div>
        <div className="col">
          <div className="row float-end mx-3">
            <p>100%</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="p-1 col-auto">
          <select className="form-select border-0">
            <option>12pt</option>
            <option>14pt</option>
          </select>
        </div>
        <div className="p-1 col-auto">
          <select className="form-select border-0">
            <option>Paragraph</option>
          </select>
        </div>
        <div className="p-2 col-auto">
          <i className="fa fa-bold" aria-hidden="true"></i>
        </div>
        <div className="p-2 col-auto">
          <i className="fa fa-italic" aria-hidden="true"></i>
        </div>
        <div className="p-2 col-auto">
          <i className="fa fa-underline" aria-hidden="true"></i>
        </div>
        <div className="p-2 col-auto">
          <i className="fa fa-font" aria-hidden="true"></i>
        </div>
        <div className="p-2 col-auto">
          <i className="fa fa-sort-desc" aria-hidden="true"></i>
        </div>
        <div className="p-2 col-auto">
          <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
        </div>
        <div className="p-2 col-auto">
          <i className="fa fa-sort-desc" aria-hidden="true"></i>
        </div>
        <div className="p-2 col-auto">
          <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
        </div>
      </div>
      <br />
      <textarea className="form-control p-3"
        placeholder=" 2 + 2 = 4 "
        value={question.questionVal}
        onChange={(e) =>
          dispatch(setQuestion({ ...question, questionVal: e.target.value }))
        }
      ></textarea>
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
      <p style={{ fontWeight: 'bold' }}>Answers: </p>
      <br />
      {isMcq && (
        <div className="container">
          <div className="container">
            <ul className="list-group">
              {choices.map((choice, index) => (
                <li key={index} className="list-group-item">
                  <div className="row py-5">
                    <div className="col-auto">
                      <input
                        className="form-check-input m-2"
                        type="radio"
                        id={`label-mcq-${index}`}
                        name="mcq"
                        checked={choice.isCorrect}
                        onChange={() => handleCorrectAnswerChange(index)} // Handle correct answer change
                      />
                      <label className="form-check-label pt-1" htmlFor={`label-mcq-${index}`}>
                        {choice.isCorrect ? <p>Correct Answer</p> : <p>Possible Answer</p>}
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="text"
                        className="form-control"
                        value={choice.text}
                        onChange={(e) => handleChoiceTextChange(index, e.target.value)} // Handle choice text change
                      />
                    </div>
                    <div className="col">
                      <div className="row g-2 float-end">
                        <div className="col-6 pt-2">
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                        </div>
                        <div className="col-3 pt-2">
                          <i className="fa fa-trash-o" aria-hidden="true" onClick={() => handleDeleteChoice(index)}></i> {/* Handle choice deletion */}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button className="btn m-2 float-end border-0" onClick={handleAddChoice}>
              <div className="row">
                <div className="col-auto">
                  <i className="fa fa-plus text-danger" aria-hidden="true"></i>
                </div>
                <div className="col-auto">
                  <p className="text-danger">Add Another Answer</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
      {isBlanks && (
        <div className="container">
          <div className="container">
            <ul className="list-group">
              {blanks.map((blank, index) => (
                <li key={index} className="list-group-item">
                  <div className="row py-5">
                    <div className="col-auto">
                    </div>
                    <div className="col-auto">
                      <input
                        type="text"
                        className="form-control"
                        value={blank.answer}
                        onChange={(e) => handleBlanksTextChange(index, e.target.value)} // Handle choice text change
                      />
                    </div>
                    <div className="col">
                      <div className="row g-2 float-end">
                        <div className="col-6 pt-2">
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                        </div>
                        <div className="col-3 pt-2">
                          <i className="fa fa-trash-o" aria-hidden="true" onClick={() => handleDeleteBlank(index)}></i> {/* Handle choice deletion */}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button className="btn m-2 float-end border-0" onClick={handleAddBlank}>
              <div className="row">
                <div className="col-auto">
                  <i className="fa fa-plus text-danger" aria-hidden="true"></i>
                </div>
                <div className="col-auto">
                  <p className="text-danger">Add Another Blank</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
      {isTrueFalse && <div className="container">
        <div className="container">
          <div className="p-2">
            <input className="form-check-input m-2" type="radio" id="label-t" name="tf" checked={question.trueFalse}
              onChange={(e) =>
                dispatch(setQuestion({ ...question, trueFalse: true }))
              }></input>
            <label className="form-check-label pt-1" htmlFor="label-t">True</label>
          </div>
          <br />
          <div className="p-2">
            <input className="form-check-input m-2" type="radio" id="label-t" name="tf" checked={!question.trueFalse}
              onChange={(e) =>
                dispatch(setQuestion({ ...question, trueFalse: false }))
              }></input>
            <label className="form-check-label pt-1" htmlFor="label-f">False</label>
          </div>
        </div>
      </div>}

      <br />
      <br />
      <hr />
      <button
        className="btn btn-secondary m-2"
        onClick={handleCancel}>
        Cancel
      </button>
      {newQuestion && <button
        className="btn btn-danger m-2"
        onClick={handleAddQuestion}>
        Save Question
      </button>}
      {!newQuestion && <button
        className="btn btn-danger m-2"
        onClick={handleUpdateQuestion}>
        Update Question
      </button>}
    </div>

  )
};
export default Question;

function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
