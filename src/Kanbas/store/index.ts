import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
import assignmentReducer from "../Courses/Assignments/reducer";
import quizReducer from "../Courses/Quizzes/reducer";
import textBoxReducer from "../Common/TextBox/reducer";
import questionsReducer from "../Courses/Quizzes/QuizEditor/Questions/reducer";
import { useDispatch } from "react-redux";
export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };
  assignmentReducer:{
    assignments: any[];
    assignment: any;
  };
  quizReducer:{
    quizzes: any[];
    quiz: any;
  };
  questionsReducer: {
    questions: any[];
    question: any;
  };
  textBoxReducer: {
    textBox: {
      text: string;
    };
  };

}
const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentReducer,
    quizReducer,
    questionsReducer,
    textBoxReducer
  }
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export default store;