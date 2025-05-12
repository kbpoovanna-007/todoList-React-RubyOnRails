import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TaskFormStyle = styled.div`
  display: flex;
  justify-content: center;

  .task-form {
    margin-bottom: 40px;
    width: 60%;
    padding: 5px;
    border-radius: 30px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #DBDBDB;

         @media(max-width: 500px){
        width: 95%;
}
  }

  

  .form-row {
    display: flex;
    gap: 5px;
    input {
      flex: 1;
      height: 50px;
    }

    button {
      background-color: #fff;
      color: #000;
      border: 0.1rem solid #874ccc;
      border-radius: 20px;
      padding: 10px 15px;
      font-size: 16px;
      transition: all 0.3s ease;
    }

    button:hover {
      background-color: #874ccc;
      color: white;
      border-color: #874ccc;
      box-shadow: 0 4px 8px rgba(135, 76, 204, 0.3);
    }
  }

  input {
    border-radius: 30px;
    background-color: #fff;
    border: 0.1rem solid #fff;
  }

  input:focus {
    outline-color: #fff !important;
    outline-style: solid !important;
    outline-width: 0.1rem !important;
    border-color: #874ccc !important;
    box-shadow: none !important;
  }

  .form-row button {
    margin: auto;
    width: fit-content;
    white-space: nowrap;
  }
`;

function TaskForm({ onSubmit, initialData, onCancel }) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
    } else {
      setTitle("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({ title });
    setTitle("");
  };

  return (
    <TaskFormStyle>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-row">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
          <button type="submit">Add </button>
          {onCancel && (
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </TaskFormStyle>
  );
}

export default TaskForm;
