import React from "react";
import styled from "styled-components";
import TaskList from "./TaskList";

const ShowTasksStyle = styled.div`
  margin-top: 0px;
  display: flex;
  justify-content: center;

  .tasks-container {
    height: calc(100vh - 210px);
    width: 60%;
    overflow-y: auto;
    padding: 20px;
    margin-top: auto;
    margin-bottom: 1rem;
    background-color: #e9efec;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    scrollbar-width: thick;
    scrollbar-color: #888 #f1f1f1;

     @media(max-width: 500px){
        width: 100%;
}
    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 100px;
    }

    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 100px;
    }
    }

    }
  }

  
`;

const ShowTasks = ({
  loading,
  tasks,
  filter,
  handleToggleComplete,
  handleEditTask,
  handleDeleteTask,
  setShowNotify,
  notify
}) => {
  return (
    <ShowTasksStyle>
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <div className="tasks-container">
          {tasks.length === 0 ? (
            <p>No tasks found. Add your first task above!</p>
          ) : (
            <TaskList
              tasks={tasks}
              filter={filter}
              handleToggleComplete={handleToggleComplete}
              handleEditTask={handleEditTask}
              handleDeleteTask={handleDeleteTask}
              setShowNotify = {setShowNotify}
              notify = {notify}
            />
          )}
        </div>
      )}
    </ShowTasksStyle>
  );
};

export default ShowTasks;
