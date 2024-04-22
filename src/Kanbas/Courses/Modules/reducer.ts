import { createSlice } from "@reduxjs/toolkit";

export interface Module {
  _id: string;
  name: string;
  description: string;
}

interface RootState {
  modules: Module[];
  module: Module;
}

const initialState: RootState = {
  modules: [],
  module: {_id:"-1", name: "New Module Name", description: "New Description" },
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload;
    },
    addModule: (state, action) => {
      state.modules = [action.payload, ...state.modules];
    },
    deleteModule: (state, action) => {
      state.modules = state.modules.filter((module) => module._id !== action.payload);
    },
    updateModule: (state, action) => {
      state.modules = state.modules.map((module) => {
        if (module._id === action.payload._id) {
          return action.payload;
        } else {
          return module;
        }
      });
    },
    setModule: (state, action) => {
      state.module = action.payload;
    },
  },
});

export const { setModules, addModule, deleteModule, updateModule, setModule } =
  modulesSlice.actions;
export default modulesSlice.reducer;