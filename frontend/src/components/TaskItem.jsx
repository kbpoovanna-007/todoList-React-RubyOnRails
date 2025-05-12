import React from "react";
import styled from "styled-components";

const TaskItemStyle = styled.div`
  .task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 12px 12px 40px; /* Add left padding for checkbox */
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 6px;
    border-left: 3px solid #e24a4a;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;

    &:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }

    &.completed {
      border-left-color: #4caf50;

      .task-title {
        text-decoration: line-through;
        color: #888;
      }
    }

    &:last-child {
      border-bottom: none;
    }

    .task-content {
      flex: 1;
      display: flex;
      align-items: flex-start;
      overflow: hidden;
      padding-right: 10px;

      .task-title {
        margin: 0px 10px;
        padding: 0px 20px;
        font-size: 1.3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
        text-align: left;

        @media (max-width: 600px) {
          font-size: 1rem;
        }
      }

      .checkbox-wrapper-18 .round {
        position: relative;
      }

      .checkbox-wrapper-18 .round label {
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 50%;
        cursor: pointer;
        height: 28px;
        width: 28px;
        display: block;
        margin: 4px 0px;
      }

      .checkbox-wrapper-18 .round label:after {
        border: 2px solid #fff;
        border-top: none;
        border-right: none;
        content: "";
        height: 6px;
        left: 8px;
        opacity: 0;
        position: absolute;
        top: 9px;
        transform: rotate(-45deg);
        width: 12px;
      }

      .checkbox-wrapper-18 .round input[type="checkbox"] {
        visibility: hidden;
        display: none;
        opacity: 0;
      }

      .checkbox-wrapper-18 .round input[type="checkbox"]:checked + label {
        background-color: #66bb6a;
        border-color: #66bb6a;
      }

      .checkbox-wrapper-18 .round input[type="checkbox"]:checked + label:after {
        opacity: 1;
      }
    }
  }

  .task-actions {
    display: flex;
    gap: 8px;
    flex-shrink: 0;

    button {
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.2s;
      width: auto;

      &:first-child {
        background-color: #e9f2fe;
        color: #4a90e2;
      }

      &:last-child {
        background-color: #fee9e9;
        color: #e24a4a;
      }

      &:hover {
        filter: brightness(0.95);
      }
    }
  }
`;

const TaskItem = ({
  task,
  handleToggleComplete,
  handleEditTask,
  handleDeleteTask,
  setShowNotify,
}) => {
  return (
    <TaskItemStyle>
      <li
        key={task.id}
        className={`task-item ${task.completed ? "completed" : ""}`}
      >
        <div className="task-content">
          <div className="checkbox-wrapper-18">
            <div className="round">
              <input
                type="checkbox"
                id={`checkbox-${task.id}`}
                checked={task.completed || false}
                onChange={() => handleToggleComplete(task.id)}
              />
              <label htmlFor={`checkbox-${task.id}`}></label>
            </div>
          </div>

          <p className="task-title">{task.title}</p>
        </div>

        <div className="task-actions">
          <button onClick={() => handleEditTask(task)}>Edit</button>
          <button
            onClick={() => {handleDeleteTask(task.id); setShowNotify(task);}}
          >
            Delete
          </button>
        </div>
      </li>
    </TaskItemStyle>
  );
};

export default TaskItem;
