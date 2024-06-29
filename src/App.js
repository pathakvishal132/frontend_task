import React from "react";
import "./assets/css/style.css";
import { connect } from "react-redux";
import "../node_modules/antd/dist/antd.css";
import MainComponent from "./components/mainComponent";
import { addUser, getUsers, editUser, deleteUser } from "./actions/userActions";

function App(props) {
  return (
    <div>
     
      <MainComponent {...props} />
       
    </div>
  );
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = {
  getUsers,
  addUser,
  editUser,
  deleteUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
