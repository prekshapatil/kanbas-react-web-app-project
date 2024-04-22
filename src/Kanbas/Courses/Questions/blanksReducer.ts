import { createSlice } from "@reduxjs/toolkit";


export interface Blank {
    _id: String;
    answer: string
}
interface RootState {
    blanks: Blank[];
    blank: Blank;
}

const initialBlanksState: RootState = {
    blanks: [],
    blank: { _id: "-1", answer: "" }
};

const blanksSlice = createSlice({
    name: "blanks",
    initialState: initialBlanksState,
    reducers: {
        setBlanks: (state, action) => {
            state.blanks = action.payload;
        },
        setBlank: (state, action) => {
            state.blank = action.payload;
        }
    },
});

export const { setBlanks, setBlank } =
    blanksSlice.actions;

export default blanksSlice.reducer;