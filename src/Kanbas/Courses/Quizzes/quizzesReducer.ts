import { createSlice } from "@reduxjs/toolkit";

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  courseId: string;
  points: number;
  quizType: string;
  timeLimit: number;
  assignmentGroup: string;
  isShuffled: boolean;
  ismultipleAttempts: boolean;
  isPublished: boolean;
  viewResponse: string;
  showCorrectAnswers: string;
  accessCode: string;
  onQuestionAtaTime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate: string;
  availabilityDate: string;
  untilDate: string;
  questions: any[]; // Assuming the structure of questions is complex and varies
}

interface RootState {
  quizzes: Quiz[];
  quiz: Quiz;
}

const initialState: RootState = {
  quizzes: [],
  quiz: {
    _id: "new",
    title: "New Quiz Title",
    description: "New Quiz Description",
    courseId: "Course ID",
    points: 0,
    quizType: "Quiz",
    timeLimit: 0,
    assignmentGroup: "Quizzes",
    isShuffled: false,
    ismultipleAttempts: false,
    isPublished: false,
    viewResponse: "Always",
    showCorrectAnswers: "Immediately",
    accessCode: "",
    onQuestionAtaTime: false,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "2023-09-18",
    availabilityDate: "2023-09-11",
    untilDate: "2023-09-18",
    questions: [],
  },
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, action) => {
      state.quizzes = [
         action.payload,
        ...state.quizzes,
      ];
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz._id !== action.payload
      );
      console.log(state.quizzes);
    },
    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz._id === action.payload._id) {
          return action.payload;
        } else {
          return quiz;
        }
      });
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
  },
});

export const {
  setQuizzes,
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuiz,
} = quizzesSlice.actions;
export default quizzesSlice.reducer;
