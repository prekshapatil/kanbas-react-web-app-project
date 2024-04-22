import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as client from "./client";
import { useEffect } from "react";
import { setQuestions, setQuestion, resetQuestion, deleteQuestion } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../store";
import { BsTrash3Fill } from "react-icons/bs";
import { setText } from "../../../../Common/TextBox/reducer";

function QuizQuestion() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quizId, courseId } = useParams();
  const questionList = useSelector(
    (state: KanbasState) => state.questionsReducer.questions
  );
  const question = useSelector(
    (state: KanbasState) => state.questionsReducer.question
  );
  const addQuestion = async () => {
    const newReq = {
      id: new Date().getTime().toString(),
      title: "New Question",
      quizId: quizId,
      points: 0,
      question: "",
      type: "MultipleChoice",
      option: [],
    };
    //const res = await client.createQuestion(quizId, newReq);
    dispatch(setQuestion(newReq));
    dispatch(setText(newReq.question));
    dispatch(setQuestions([...questionList, newReq]));
    navigate(
      `/Kanbas/Courses/${courseId}/Quizzes/${quizId}/QuizEditor/questions/${newReq.id}`
    );
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const questions = await client.getAllQuestions(quizId);
      dispatch(setQuestions(questions));
    };
    if (questionList.length === 0 || questionList === null) {
      fetchQuestions();
    }
  }, [quizId]);

  const assignQues = (ques: any) => {
    console.log("Assigning Question ", ques);
    dispatch(setQuestion(ques));
    dispatch(setText(ques.question));
    console.log("Question ", question);
  };

  return (
    <div>
      <div
        style={{
          paddingRight: "40px",
          paddingLeft: "40px",
          paddingTop: "10px",
        }}
      >
        {questionList?.length === 0 || questionList === null ? (
          <div className="card text-muted" style={{ marginBottom: "20px" }}>
            <div className="text-center">
              <br />
              No questions available.
              <br />
              <br />
            </div>
          </div>
        ) : (
          <div>
            {questionList.map((question, index) => (
              <div
                key={question?._id}
                className="card"
                style={{ marginBottom: "20px" }}
              >
                <div
                  className="card-header"
                  style={{
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Link
                    to={`${question._id}`}
                    onClick={() => {
                      assignQues(question);
                    }}
                  >
                    <span>{question?.title}</span>
                  </Link>
                  <div>
                    <span>{question?.points} pts</span>
                    <button onClick={() => dispatch(deleteQuestion(question.id))} className="btn">
                      <BsTrash3Fill color="red" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    <div
                      dangerouslySetInnerHTML={{ __html: question?.question }}
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button
        onClick={addQuestion}
        className="btn"
        style={{ backgroundColor: "lightgrey", color: "black" }}
      >
        New Question
      </Button>
    </div>
  );
}
export default QuizQuestion;
