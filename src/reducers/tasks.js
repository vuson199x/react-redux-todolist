import * as types from "./../constants/ActionTypes";

var random = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

var generateID = () => {
  return random() + random() + "-" + random() + "$" + random();
};

var findIndex = (tasks, id) => {
  var result = -1;
  tasks.forEach((task, index) => {
    if (task.id === id) {
      result = index;
    }
  });
  return result;
};

var data = JSON.parse(localStorage.getItem("tasks"));
var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_ALL:
      return state;
    case types.ADD_TASK:
      var id = action.task.id;
      if (id) {
        var index = findIndex(state, id);
        var updateTask = {
          id: action.task.id,
          name: action.task.name,
          status: action.task.status,
        };
        state[index] = updateTask;
      } else {
        var newTask = {
          id: generateID(),
          name: action.task.name,
          status: action.task.status,
        };
        state.push(newTask);
      }

      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    case types.UPDATE_STATUS:
      var id = action.id;
      var index = findIndex(state, id);
      var cloneTask = { ...state[index] };
      cloneTask.status = !cloneTask.status;
      state[index] = cloneTask;
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    case types.DELETE_TASK:
      var filter = state.filter((task) => action.id !== task.id);
      state = filter;
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    default:
      return state;
  }
};

export default myReducer;
