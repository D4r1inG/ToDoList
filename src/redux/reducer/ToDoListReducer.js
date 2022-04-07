import { ToDoListDarkTheme } from "../../JSS_StyledComponent/Themes/DarkThemeToDoList"
import { ToDoListLightTheme } from "../../JSS_StyledComponent/Themes/LightThemeToDoList"
import { ToDoListPrimaryTheme } from "../../JSS_StyledComponent/Themes/PrimaryThemeToDoList"
import { arrTheme } from "../../JSS_StyledComponent/Themes/ThemeManager"
import { ADD_TASK, CHANGE_THEME, done_task, delete_task, edit_task, update_task } from "../types/ToDoListTypes"


const initialState = {
    themeToDoList: ToDoListPrimaryTheme,
    taskList: [
        { id: 'task 1', taskName: 'Tập thể dục chống đẩy 100 cái', done: true },
        { id: 'task 2', taskName: 'Lau nhà', done: false },
        { id: 'task 3', taskName: 'Gọi cho Abi', done: true },
        { id: 'task 4', taskName: 'Mua đồ ăn', done: false }
    ],
    taskEdit: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK: {
            if (action.newTask.taskName === '') {
                alert('Error')
                return { ...state }
            }
            let newTaskList = [...state.taskList]
            let index = newTaskList.findIndex(task => task.taskName === action.newTask.taskName)
            if (index !== -1) {
                alert('Task Name already exist!')
                return { ...state }
            }
            newTaskList.push(action.newTask)

            state.taskList = newTaskList

            return { ...state }
        }

        case CHANGE_THEME: {
            let theme = arrTheme.find(item => item.id == action.themeID)
            if (theme) {
                state.themeToDoList = theme.theme
            }

            return { ...state }

        }
        case done_task: {
            let taskListUpdate = [...state.taskList]
            let index = taskListUpdate.findIndex(item => item.id === action.id)
            if (index != -1) {
                taskListUpdate[index].done = true
            }
            state.taskList = [...taskListUpdate]
            return { ...state }
        }
        case delete_task: {
            // let index = taskListUpdate.findIndex(item => item.id === action.id)
            // if(index != -1){
            //     taskListUpdate.splice(index,1)
            // }            
            // taskListUpdate = taskListUpdate.filter(task => task.id !== action.id)
            // state.taskList = [...taskListUpdate]
            return { ...state, taskList: state.taskList.filter(task => task.id !== action.id) }
        }
        case edit_task: {
            state.taskEdit = state.taskList.find(task => task.id == action.id)
            return { ...state }
        }
        case update_task: {
            if (action.task.taskName === '') {
                alert('Error')
                return { ...state }
            }
            let taskListUpdate = [...state.taskList]
            let taskUpdate = taskListUpdate.find(task => task.id == action.task.id)
            for (let item of taskListUpdate) {
                if (action.task.taskName == item.taskName) {
                    alert('Task Name already exist!')
                    return { ...state }
                }
            }
            taskUpdate.taskName = action.task.taskName
            state.taskList = taskListUpdate
            state.taskEdit = {}
            return { ...state }
        }
        default:
            return { ...state }
    }
}
