import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
import assignmentsReducer from "../Courses/Assignments/assignmentReducer";
import quizzesReducer from "../Courses/Quizzes/quizzesReducer";
import userReducer from "../../Users/userReducer";
import questionsReducer from "../Courses/Questions/questionsReducer";
import blanksReducer from "../Courses/Questions/blanksReducer";
import choicesReducer from "../Courses/Questions/choicesReducer";
export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };
  assignmentsReducer: {
    assignments: any[];
    assignment: any;
  };
  quizzesReducer: {
    quizzes: any[];
    quiz: any;
  };
  userReducer: {
    user: any;
  };
  questionsReducer:{
    questions: any[];
    question: any;
  }
  choicesReducer:{
    choices:any[]
    choice:any;
  }
  blanksReducer:{
    blanks:any[]
    blank:any;
  }
}
const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer,
    quizzesReducer,
    userReducer,
    questionsReducer,
    choicesReducer,
    blanksReducer
  }
});


export default store;