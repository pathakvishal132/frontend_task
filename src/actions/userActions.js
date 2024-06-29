import initiateDB from "../db/initDB";
const db = initiateDB();
export const getUsers = () => async dispatch => {
  try{
    const response = await fetch('http://example.com/users')
    const parsedResponse = await response.json()
    dispatch({
      type: 'LIST_USERS',
      payload: parsedResponse
    });
  }catch(e){
    console.log(e);
  }
};

export const addUser = (payload) => async dispatch => {
  try{
    const response = await fetch("http://example.com/user", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const parsedResponse = await response.json()
    if(parsedResponse.success){
      dispatch(getUsers());
    }
  }catch(e){
    console.log(e);
  }
};

export const editUser = (id, updatedUser) => async dispatch => {
  try {
    const response = await db.editUser(id, updatedUser);
    if(response.success) {
      dispatch(getUsers());
    }
  } catch (e) {
    console.log(e);
  }
};

export const deleteUser = (id) => async dispatch => {
  try {
    console.log("hi");
    const response = await db.deleteUser(id);
    if(response.success) {
      dispatch(getUsers());
    }
  } catch (e) {
    console.log(e);
  }
};
