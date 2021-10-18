import { combineReducers } from "redux";
import tasks from "./tasks";
import isDisplayForm from "./isDisplayForm";
import taskEditing from "./taskEditing";
import filterTable from "./filterTable";

const myReducer = combineReducers({
  tasks: tasks,
  isDisplayForm: isDisplayForm,
  taskEditing: taskEditing,
  filterTable: filterTable,
});

export default myReducer;
