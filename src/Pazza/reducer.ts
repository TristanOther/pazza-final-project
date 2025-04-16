import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  folders: [],
  selectedFolder: "",
};
const foldersSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    setFolders: (state, action) => {
      state.folders = action.payload;
    },
    setSelectedFolder: (state, action) => {
        state.selectedFolder = action.payload;
        console.log("Selected folder:", action.payload);
    }
  },
});
export const { setFolders, setSelectedFolder } = foldersSlice.actions; 
export default foldersSlice.reducer;