import React, { Component } from "react";
import TaskItem from "./TaskItem";
import { connect } from "react-redux";
import * as actions from "./../actions/index";

class TaskList extends Component {
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.props.onFilterTable(
      name === "filterName" ? value : this.props.filterTable.name,
      name === "filterStatus" ? value : this.props.filterTable.value
    );
    this.setState({
      [name]: value,
    });
  };

  render() {
    var onUpdateData = this.props.onUpdateData;
    var { tasks, filterTable } = this.props;
    var element = tasks.map((task, index) => {
      return <TaskItem key={task.id} index={index} tasks={task} />;
    });
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th className="text-center">Tên</th>
              <th className="text-center">Trạng Thái</th>
              <th className="text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="filterName"
                  value={filterTable.name}
                  onChange={this.onChange}
                />
              </td>
              <td>
                <select
                  className="form-control"
                  value={filterTable.value}
                  name="filterStatus"
                  onChange={this.onChange}
                >
                  <option value="-1">Tất Cả</option>
                  <option value="0">Ẩn</option>
                  <option value="1">Kích Hoạt</option>
                </select>
              </td>
              <td></td>
            </tr>
            {element}
          </tbody>
        </table>
      </div>
    );
  }
}

// Chuyển State thành props
const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    filterTable: state.filterTable,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onFilterTable: (filter) => {
      dispatch(actions.filterTable(filter));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
