import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  enrollments: [],
};
const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    enroll: (state, { payload: enrollment }) => {
      const newEnrollment: any = {
        _id: enrollment._id,
        user: enrollment.user,
        course: enrollment.course,
      };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    unenroll: (state, { payload: enrollmentId }) => {
      state.enrollments = state.enrollments.filter((e: any) => e._id !== enrollmentId);
    },
  },
});
export const { enroll, unenroll, setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;