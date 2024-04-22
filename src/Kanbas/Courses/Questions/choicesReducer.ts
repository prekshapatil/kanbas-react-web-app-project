import { createSlice } from "@reduxjs/toolkit";

export interface Choices {
    _id: String;
    text: string,
    isCorrect: boolean
}

interface RootState {
    choices: Choices[];
    choice: Choices;
}

const initialChoicesState: RootState = {
    choices: [],
    choice: { _id: "-1", text: "", isCorrect: false }
};

const choicesSlice = createSlice({
    name: "choices",
    initialState: initialChoicesState,
    reducers: {
        setChoices: (state, action) => {
            state.choices = action.payload;
        },
        setChoice:(state, action) => {
            state.choice = action.payload;
        }
    },
});




export const { setChoices, setChoice } =
    choicesSlice.actions;

export default choicesSlice.reducer;