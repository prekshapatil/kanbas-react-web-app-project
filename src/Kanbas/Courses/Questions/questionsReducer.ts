import { createSlice } from "@reduxjs/toolkit";

export enum QuestionType {
    MultipleChoice = 'Multiple Choice',
    TrueFalse = 'True/False',
    FillInBlanks = 'Fill in the Blanks'
}

export interface Question {
    _id: string;
    title: String,
    quizID: String,
    points: Number,
    questionVal: String,
    questionType: QuestionType
    choices: [{ text: String, isCorrect: Boolean }],
    trueFalse: Boolean,
    blanks: [{  answer: String }]
}

interface RootState {
    questions: Question[];
    question: Question;
}

const initialState: RootState = {
    questions: [],
    question: {
        _id: "-1",
        title: "",
        quizID: "",
        points: 100,
        questionVal: "",
        questionType: QuestionType.MultipleChoice,
        choices: [{ text: "", isCorrect: false }],
        trueFalse: false,
        blanks: [{  answer: "" }]
    },
};

const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
        addQuestion: (state, action) => {
            state.questions = [action.payload, ...state.questions];
        },
        deleteQuestion: (state, action) => {
            state.questions = state.questions.filter((question) => question._id !== action.payload);
        },
        updateQuestion: (state, action) => {
            state.questions = state.questions.map((question) => {
                if (question._id === action.payload._id) {
                    return action.payload;
                } else {
                    return question;
                }
            });
        },

                setQuestion: (state, action) => {
            state.question = { ...action.payload }; // Update the entire question object
            
            // If the question type is updated separately, update it here
            if (action.payload.questionType) {
                state.question.questionType = action.payload.questionType;
            }
        },
    },
});

export const { setQuestions, addQuestion, deleteQuestion, updateQuestion, setQuestion } =
    questionsSlice.actions;

export default questionsSlice.reducer;
