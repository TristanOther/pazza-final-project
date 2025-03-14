import { useSelector } from "react-redux";

export function FacultyOnlyOptions({ children }: { children: React.ReactNode }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser && currentUser.role === "FACULTY") {
    return <>{children}</>;
  }
  return null;
}
