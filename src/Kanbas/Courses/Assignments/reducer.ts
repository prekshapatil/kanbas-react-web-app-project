import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
import { stat } from "fs";

interface Assignment {
  name: string;
  description: string;
  points: string;
  dueDateTime: string;
  _id: string;
  course: string;
  availableFromDate: string;
  availableUntilDate: string;
}
const initialState = {
  assignments: [] as Assignment[],
  assignment: {
    _id: "-1",
    title: "New Assignment",
    description: "New Description",
    course: "-1",
    points: "100",
    dueDateTime: new Date().toISOString().slice(0, 16),
    availableFromDate: new Date().toISOString().slice(0, 16),
    availableUntilDate: new Date().toISOString().slice(0, 16),
  },
};

const assignmentSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action) => {
      state.assignments = [
        ...state.assignments,
        action.payload
      ];
      state.assignment = initialState.assignment;
    },

    updateAssignment: (state, action) => {
      state.assignments = state.assignments.map((assignment) => {
        if (assignment._id === action.payload._id) {
          return action.payload;
        } else {
          return assignment;
        }
      });
    },

    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== action.payload
      );
    },
    clearAssignment: (state) => {
      state.assignment = initialState.assignment;
    },

    setAssignment: (state, action) => {
      state.assignment = action.payload;
    },
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
  },
});

export const {
  addAssignment,
  setAssignment,
  clearAssignment,
  updateAssignment,
  deleteAssignment,
  setAssignments,
} = assignmentSlice.actions;
export default assignmentSlice.reducer;
