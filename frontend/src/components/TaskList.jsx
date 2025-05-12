import React from 'react'
import styled from 'styled-components';
import TaskItem from './TaskItem';


const TaskListStyle = styled.div`
      list-style: none;
      padding: 0;
`;
const TaskList = ({tasks, filter, handleToggleComplete, handleEditTask, handleDeleteTask, setShowNotify}) => {
  return (
    <TaskListStyle>
        <ul className="tasks-list">
              {tasks
                .filter((task) => {
                  if (filter === "completed") return task.completed;
                  if (filter === "pending") return !task.completed;
                  return true; // show all
                })
                .map((task) => (
                  <TaskItem task={task} handleToggleComplete={handleToggleComplete} handleEditTask = {handleEditTask} handleDeleteTask = {handleDeleteTask} setShowNotify={setShowNotify}/>
                ))}
            </ul>
            </TaskListStyle>
  )
}

export default TaskList