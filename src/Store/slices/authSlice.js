import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: false,
  user: null,
  email: null,
};

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload;
      if (state.user !== null) {
        state.auth = true;
      } else {
        state.auth = false;
      }
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth,setEmail } = authSlice.actions;

export default authSlice.reducer;
