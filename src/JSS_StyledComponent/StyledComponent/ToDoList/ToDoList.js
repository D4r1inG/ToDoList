import React, { Component } from 'react'
import { Container } from '../../ComponentsToDoList/Container'
import { ThemeProvider } from 'styled-components'
import { ToDoListDarkTheme } from '../../Themes/DarkThemeToDoList'
import { ToDoListLightTheme } from '../../Themes/LightThemeToDoList'
import { ToDoListPrimaryTheme } from '../../Themes/PrimaryThemeToDoList'
import { Dropdown } from '../../ComponentsToDoList/Dropdown'
import { Heading1, Heading2, Heading3, Heading4, Heading5 } from '../../ComponentsToDoList/Heading'
import { TextField, Input, Label } from '../../ComponentsToDoList/TextField'
import { Button } from '../../ComponentsToDoList/Button'
import { Table, Tr, Td, Th, Thead, Tbody } from '../../ComponentsToDoList/Table'
import { connect } from 'react-redux'
import { addTask, changeTheme, doneTask, deleteTask, editTask, updateTask } from '../../../redux/actions/ToDoListActions'
import { arrTheme } from '../../Themes/ThemeManager'

class ToDoList extends Component {

    state = {
        taskName: '',
        disabled: true,
    }

    renderTaskList = () => {
        return this.props.taskList.filter(task => !task.done).map((item, index) => {
            let { id, taskName, done } = item
            return <Tr key={index}>
                <Th style={{ verticalAlign: 'middle' }}>{taskName}</Th>
                <Th className='text-right'>
                    <Button onClick={() => {
                        this.setState({
                            disabled: false,
                        }, () => {
                            this.props.dispatch(editTask(id))
                        })
                    }} className='ml-1'><i className='fa fa-edit'></i></Button>
                    <Button onClick={() => { this.props.dispatch(doneTask(id)) }} className='ml-1'><i className='fa fa-check'></i></Button>
                    <Button onClick={() => { this.props.dispatch(deleteTask(id)) }} className='ml-1'><i className='fa fa-trash'></i></Button>
                </Th>
            </Tr>

        })
    }

    renderTaskListDone = () => {
        return this.props.taskList.filter(task => task.done).map((item, index) => {
            let { id, taskName, done } = item
            return <Tr key={index}>
                <Th style={{ verticalAlign: 'middle' }}>{taskName}</Th>
                <Th className='text-right'>
                    <Button onClick={() => { this.props.dispatch(deleteTask(id)) }} className='ml-1'><i className='fa fa-trash'></i></Button>
                </Th>
            </Tr>

        })
    }

    renderTheme = () => {
        return arrTheme.map((item, index) => {
            return <option key={index} value={item.id}>{item.name}</option>
        })
    }

    // componentWillReceiveProps(newProps){
    //     console.log(newProps)
    //     this.setState({
    //         taskName: newProps.taskEdit.taskName
    //     })
    // }

    // static getDerivedStateFromProps(newProps, currentState){
    //     let newState = {...currentState, taskName: this.props.taskEdit.taskName}
    //     return newState
    // }

    render() {
        return (
            <ThemeProvider theme={this.props.theme}>
                <Container className='w-50' >
                    <Dropdown onChange={(e) => {
                        let { value } = e.target
                        this.props.dispatch(changeTheme(value))
                    }}>
                        {this.renderTheme()}
                    </Dropdown>
                    <Heading2 className='mt-3'>To Do List</Heading2>
                    <TextField name='taskName' value={this.state.taskName} onChange={(e) => {
                        this.setState({
                            taskName: e.target.value
                        })
                    }} label='Task name' className='w-50' />

                    <Button onClick={() => {
                        let { taskName } = this.state
                        let newTask = {
                            id: Date.now(),
                            taskName: taskName,
                            done: false
                        }
                        this.props.dispatch(addTask(newTask))
                    }} className='ml-3'><i className='fa fa-plus'></i> Add task</Button>

                    {this.state.disabled ? <Button disabled onClick={() => {
                        let { taskName } = this.state
                        this.setState({
                            taskName: taskName
                        })
                        let taskUpdate = {
                            id: this.props.taskEdit.id,
                            taskName: taskName,
                            done: false
                        }
                        this.props.dispatch(updateTask(taskUpdate))
                    }} className='ml-3'><i className='fa fa-upload'></i> Update task</Button> :
                        <Button onClick={() => {
                            let { taskName } = this.state
                            this.setState({
                                taskName: '',
                                disabled: true
                            }, () => {
                                this.props.dispatch(updateTask({
                                    id: this.props.taskEdit.id,
                                    taskName: taskName,
                                    done: false
                                }))
                            })
                        }} className='ml-3'><i className='fa fa-upload'></i> Update task</Button>
                    }

                    <hr />
                    <Heading3>Task Update</Heading3>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th style={{ verticalAlign: 'middle' }}>{this.props.taskEdit.taskName}</Th>
                            </Tr>
                        </Thead>
                    </Table>


                    <Heading3>Task to do</Heading3>
                    <Table>
                        <Thead>
                            {this.renderTaskList()}
                        </Thead>
                    </Table>

                    <Heading3>Task Complete</Heading3>
                    <Table>
                        <Thead>
                            {this.renderTaskListDone()}
                        </Thead>
                    </Table>
                </Container>
            </ThemeProvider >
        )
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.taskEdit.id !== this.props.taskEdit.id) {
            this.setState({
                taskName: this.props.taskEdit.taskName
            })
        }
    }
}

const mapStateToProps = (state) => {
    return {
        theme: state.ToDoListReducer.themeToDoList,
        taskList: state.ToDoListReducer.taskList,
        taskEdit: state.ToDoListReducer.taskEdit
    }
}

export default connect(mapStateToProps)(ToDoList)