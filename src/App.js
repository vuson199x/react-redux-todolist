import React, { Component } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";
import { findIndex } from "lodash";
import { connect } from "react-redux";
import * as actions from "./actions/index";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        name: "",
        status: -1,
      },
      keyword: "",
      sortBy: "name",
      sortValue: 1,
    };
  }

  ChangeDisplay = () => {
    var { taskEditing, onOpenForm, onToggleForm } = this.props;
    if (taskEditing && taskEditing.id !== "") {
      onOpenForm();
    } else {
      onToggleForm();
    }

    this.props.onClearTask({
      id: "",
      name: "",
      status: false,
    });
  };

  // Lọc dữ liệu
  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus,
      },
    });
  };

  // Tìm kiếm dữ liệu
  onSearch = (keyword) => {
    this.setState({
      keyword: keyword,
    });
  };

  // Sắp xếp dữ liệu
  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue,
    });
  };

  render() {
    var { filter, keyword, sortBy, sortValue } = this.state;

    var { isDisplayForm } = this.props;
    // if(filter){
    //   // Lọc tên
    //   if(filter.name){
    //     tasks = tasks.filter((task)=>{
    //       return task.name.toLowerCase().indexOf(filter.name) !== -1;
    //     });
    //   }

    //   // Lọc trạng thái
    //   tasks = tasks.filter((task)=>{
    //     if(filter.status === -1){
    //       return tasks;
    //     }else{
    //       return task.status === (filter.status === 1 ? true : false);
    //     }
    //   });
    // }

    //Tìm kiếm tên qua keyword (Đang lỗi)
    // if(keyword){
    //   tasks = tasks.filter((task)=>{
    //       return task.name.toLowerCase().indexOf(keyword) !== -1;
    //   });
    // }

    // // Lọc dữ liệu
    // if(sortBy === 'name'){
    //   tasks.sort((a,b)=>{
    //     if(a.name > b.name) return sortValue; // Tăng dần A-Z
    //     else if(a.name < b.name) return -sortValue; // Giảm dần Z-A
    //     else return 0;
    //   })
    // }else{
    //   tasks.sort((a,b)=>{
    //     if(a.status > b.status) return -sortValue; // Tăng dần A-Z
    //     else if(a.status < b.status) return sortValue; // Giảm dần Z-A
    //     else return 0;
    //   })
    // }

    var elmTaskForm = isDisplayForm ? <TaskForm /> : "";
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div
            className={
              isDisplayForm === true
                ? "col-xs-4 col-sm-4 col-md-4 col-lg-4"
                : ""
            }
          >
            {elmTaskForm}
          </div>
          <div
            className={
              isDisplayForm === true
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.ChangeDisplay}
            >
              <span className="fa fa-plus mr-5"></span>Thêm Công Việc
            </button>
            <Control
              onSearch={this.onSearch}
              onSort={this.onSort}
              sortBy={sortBy}
              sortValue={sortValue}
            />

            <div className="row mt-15">
              <TaskList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isDisplayForm: state.isDisplayForm,
    taskEditing: state.taskEditing,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm());
    },

    // Dùng để clear dữ liệu trong ô input khi ấn nút Thêm.
    onClearTask: (task) => {
      dispatch(actions.editTask(task));
    },
    onOpenForm: () => {
      dispatch(actions.openForm());
    },
    onCloseForm: () => {
      dispatch(actions.closeForm());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
