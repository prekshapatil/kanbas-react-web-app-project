import { createSlice } from "@reduxjs/toolkit";



export interface User  {
  username : String,
  password : String,
  firstName : String,
  lastName : String,
  dob : String,
  email : String,
  role : String,
  courses : any[]
}

interface RootState {
    user : User
}


const initialState: RootState = {
  user: {
    username : "",
    password : "",
    firstName : "",
    lastName : "",
    dob : "",
    email : "",
    role : "",
    courses : []
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = initialState.user;
    }
    }
  });

export const {
  setUser,
  removeUser
} = userSlice.actions;
export default userSlice.reducer;