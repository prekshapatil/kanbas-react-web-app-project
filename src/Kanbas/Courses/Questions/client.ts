import axios from "axios";

const QUESTIONS_API = "https://kanbas-server-app-project.onrender.com/api/questions";
const QUIZZES_API = "https://kanbas-server-app-project.onrender.com/api/quizzes";

export const deleteQuestion = async (questionId:any) => {
  const response = await axios.delete(`${QUESTIONS_API}/${questionId}`);
  return response.data;
};

export const findQuestionById = async(quizId:any, questionId: any) => {
        const response = await axios.get(
        `${QUIZZES_API}/${quizId}/questions/${questionId}`
      );
      return response.data;
}

export const createQuestion = async (quizId:any, question:any) => {
  const response = await axios.post(
    `${QUIZZES_API}/${quizId}/questions`,
    question
  );
  return response.data;
};

export const findQuestionsForQuiz = async (quizId:any) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
};

export const updateQuestion = async (quizId:any, question:any) => {
const response = await axios.put(`${QUIZZES_API}/${quizId}/questions/${question._id}`, question);
  return response.data;
};

export const findChoicesForQuestion = async (questionId:any) => {
  const response = await axios.get(`${QUIZZES_API}/${questionId}/questions/choices`);
  return response.data;
};