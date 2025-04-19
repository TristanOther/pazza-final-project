import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  tags: [],
  selectedTag: null,
};
const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    setTags: (state, action) => {
      state.tags = action.payload;
    },
    setSelectedTag: (state, action) => {
      state.selectedTag = action.payload;
    },
    addTag: (state, { payload: tag }) => {
      const newAssignment: any = { 
        _id: uuidv4(),
        name: tag.name,
        course: tag.course,
        priority: tag.priority,
      };
      state.tags = [...state.tags, newAssignment] as any;
    },
    removeTag: (state, { payload: tagId }) => {
      state.tags = state.tags.filter((t: any) => t._id !== tagId);
    },
    updateTag: (state, { payload: tag }) => {
      state.tags = state.tags.map((t: any) =>
        t._id === tag._id ? tag : t
      ) as any;
    },
  },
});
export const { setTags, setSelectedTag, addTag, removeTag, updateTag } = tagsSlice.actions;
export default tagsSlice.reducer;