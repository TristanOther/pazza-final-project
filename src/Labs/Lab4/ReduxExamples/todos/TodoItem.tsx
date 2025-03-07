import { ListGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: {
  todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();
  return (
    <ListGroup.Item className="d-flex align-items-center" key={todo.id}>
      <span className="me-auto">{todo.title}</span>
      <Button className="btn btn-primary me-2" onClick={() => dispatch(setTodo(todo))}
        id="wd-set-todo-click"> Edit 
      </Button>
      <Button className="btn btn-danger" onClick={() => dispatch(deleteTodo(todo.id))}
        id="wd-delete-todo-click"> Delete 
      </Button> 
    </ListGroup.Item>
  );
}