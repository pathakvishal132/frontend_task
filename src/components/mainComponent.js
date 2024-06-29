
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputHandler from "./commonInput";
import SimpleTable from "./simpleTable";
import { getUsers, addUser, editUser, deleteUser } from "../actions/userActions";

function MainComponent() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userState); 
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleSubmit = ({ name, email }) => {
    if (editingUser) {
      dispatch(editUser(editingUser.id, { name, email }));
      setEditingUser(null);
    } else {
      dispatch(addUser({ name, email }));
    }
  };

  return (
    <div id="main-container-wrapper">
      <InputHandler onSubmit={handleSubmit} initialData={editingUser} />
      <SimpleTable
        dataSource={userState.users}
        onDelete={(id) => dispatch(deleteUser(id))}
        onEdit={setEditingUser}
      />
    </div>
  );
}

export default MainComponent;
