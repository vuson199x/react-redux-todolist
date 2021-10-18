import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            id : '',
            name : '',
            status : false
        }
    }

      onCloseForm = () =>{
        this.props.onCloseForm();
      }
      
      onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name == "status"){
            value = target.value === "true" ? true : false
        }
        this.setState({
            [name] : value,
        })
      }

      onSubmit = (event) => {
        event.preventDefault();
        this.props.onAddTask(this.state);
        this.onClear();
        this.onCloseForm();
      }

      onClear = () => {
        this.setState({
            name : '',
            status : false
        })
      }

      componentWillMount(){
         if(this.props.taskEditing){
            this.setState({
                id : this.props.taskEditing.id,
                name : this.props.taskEditing.name,
                status : this.props.taskEditing.status,
            })
         }
      }

      componentWillReceiveProps(nextProps){
          if(nextProps && nextProps.taskEditing){
            this.setState({
                id : nextProps.taskEditing.id,
                name : nextProps.taskEditing.name,
                status : nextProps.taskEditing.status,
            })
         }else if(!nextProps.taskEditing){
            this.setState({
              id : '',
              name : '',
              status : false
            })
         }
      }


  render(){
    var {id} = this.state;
    if(!this.props.isDisplayForm) return null;
    return (
        <div className="panel panel-warning">
            <div className="panel-heading">
                <h3 className="panel-title">
                   {id === '' ? "Thêm Công Việc" : "Cập Nhật Công Việc"} 
                </h3>
                <span className="fa fa-times-circle text-right" onClick = {this.onCloseForm}></span>
            </div>
            <div className="panel-body">
                <form onSubmit = {this.onSubmit}>
                    <div className="form-group">
                        <label>Tên :</label>
                        <input type="text" className="form-control" name="name" value = {this.state.name} onChange={this.onChange}/>
                    </div>
                    <label>Trạng Thái :</label>
                    <select className="form-control" name="status" value = {this.state.status} onChange={this.onChange}>
                        <option value={true}>Kích Hoạt</option>
                        <option value={false}>Ẩn</option>
                    </select>
                    <br/>
                    <div className="text-center">
                        <button type="submit" className="btn btn-warning">Lưu lại</button>&nbsp;
                        <button type="button" className="btn btn-danger" onClick = {this.onClear}>Làm mới</button>
                    </div>
                </form>
            </div>
        </div>
    );
  }
  
}


// Chuyển State thành props
const mapStateToProps = (state) => {
    return {
        isDisplayForm : state.isDisplayForm,
        taskEditing : state.taskEditing
    }
};

// Chuyển Dispatch thành props
const mapDispatchToProps = (dispatch, props) => {
  return {
     onAddTask : (task) => {
        dispatch(actions.addTask(task));
     },
     onCloseForm : () => {
        dispatch(actions.closeForm())
     }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (TaskForm);
