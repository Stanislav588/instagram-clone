import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userProfile: JSON.parse(localStorage.getItem("user-info")) || null,
  otherProfiles: null,
};
const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut(state) {
      state.userProfile = null;
      state.otherProfiles = null;
    },
    setOtherProfiles(state, action) {
      state.otherProfiles = action.payload;
    },
    setUserProfile(state, action) {
      state.userProfile = action.payload;
    },
    deletePost(state, action) {
      state.userProfile.posts = state.userProfile.posts.filter(
        (id) => id !== action.payload
      );
    },
  },
});

export const { logOut, setUserProfile, setOtherProfiles, deletePost } =
  authSlice.actions;
export default authSlice.reducer;
