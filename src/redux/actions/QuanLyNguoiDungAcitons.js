import { ADD_USER, DELETE_USER, EDIT_USER, UPDATE_USER } from "../types/QuanLyNguoiDungTypes";

export const addUser = (user) =>({
    type: ADD_USER,
    user
})

export const editUser = (user)=>({
    type: EDIT_USER,
    user
})

export const updateUser = (user)=>({
    type: UPDATE_USER,
    user
})

export const deleteUser = (userID)=>({
    type: DELETE_USER,
    userID
})