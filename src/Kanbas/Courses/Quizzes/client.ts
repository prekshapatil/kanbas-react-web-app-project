import axios from "axios";

const COURSES_API = "https://kanbas-server-app-project.onrender.com/api/courses";
const QUIZZES_API = "https://kanbas-server-app-project.onrender.com/api/quizzes";

export const deleteQuiz = async (quizId:any) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const createQuiz = async (courseId:any, quiz:any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/quizzes`,
    quiz
  );
  return response.data;
};

export const findQuizzesForCourse = async (courseId:any) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

export const updateQuiz = async (quiz:any) => {
  const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return response.data;
};

export const findQuizById = async (quizId:any) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};
