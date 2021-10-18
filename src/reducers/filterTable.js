import * as types from "./../constants/ActionTypes";

var initialState = {
  name: "",
  status: -1, // lọc tất cả: -1 || Kích hoạt : 1 || Ẩn : 0
};

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FILTER_TABLE:
      console.log(action);
      return state;
    default:
      return state;
  }
};

export default myReducer;
