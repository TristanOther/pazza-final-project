import { ListGroup, Button, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <ListGroup.Item className="d-flex align-items-center">
      <FormControl 
        className="me-5"
        value={todo.title} 
        onChange={ (e) => dispatch(setTodo({ ...todo, title: e.target.value })) }
      />
      <Button className="btn btn-warning me-2" onClick={() => dispatch(updateTodo(todo))} id="wd-update-todo-click"> 
        Update 
      </Button>
      <Button className="btn btn-success" onClick={() => dispatch(addTodo(todo))} id="wd-add-todo-click"> 
        Add 
      </Button>
    </ListGroup.Item>
  );
}
