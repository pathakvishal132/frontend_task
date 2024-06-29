import React, { useState } from 'react';
import { getUsers, addUser, editUser, deleteUser } from "../actions/userActions";
import './tablestyle.css';
import { useDispatch, useSelector } from "react-redux";

const SimpleTable = ({ dataSource }) => {
  const dispatch = useDispatch();
  const [isEditting, setIsEditing] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});

  const handleEdit = async (id) => {
    setSelectedUserId(id);
    setEditedUserData(dataSource.find((item) => item.id === id));
    setIsEditing(true);
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await dispatch(editUser(editedUserData.id, editedUserData));
      console.log(`User with ID ${editedUserData.id} updated successfully`, result);

      dispatch(getUsers());

      setIsEditing(false);
      setSelectedUserId(null);
    } catch (error) {
      console.error(`Error updating user with ID ${editedUserData.id}`, error);
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setSelectedUserId(null);
    setEditedUserData({});
  };

  const handleInputChange = (event) => {
    setEditedUserData({
      ...editedUserData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDelete = async (id) => {
    try {
      const result = await dispatch(deleteUser(id));
      console.log(`User with ID ${id} deleted successfully`, result);
    } catch (error) {
      console.error(`Error deleting user with ID ${id}`, error);
    }
  };

  return (
    <div className="table-container">
      {dataSource.length ? (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataSource.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <button onClick={() => handleEdit(item.id)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-data">No user data</div>
      )}

      {isEditting && selectedUserId && (
        <div className="edit-form">
          <h2>Edit User</h2>
          <form onSubmit={handleEditFormSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={editedUserData.name || ''}
              onChange={handleInputChange}
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={editedUserData.email || ''}
              onChange={handleInputChange}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={handleEditCancel}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SimpleTable;
