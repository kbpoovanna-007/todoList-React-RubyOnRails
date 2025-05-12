import React, { useState, useEffect } from "react";
import styled from "styled-components";

const EditTaskFormStyle = styled.div`
  display: flex;
  justify-content: center;

  .task-form {
    margin-bottom: 40px;
    width: 100%;
    padding: 5px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #DDDDDD;
  }

  .form-row {
    display: flex;
    gap: 5px;
    input {
      flex: 1;
      height: 50px;
    }
  }

input {
  background-color: #fff;
  border: 1px solid #fff;
}

input:focus {
  outline-color: #A5158C !important;
  outline-style: solid !important;
  outline-width: 2px !important;
  border-color: #000 !important;
  box-shadow: none !important;
}

  .form-row button {
    margin: auto;
    width: fit-content;
    white-space: nowrap;
  }
`;

function EditTaskForm({ onSubmit, initialData, onCancel }) {
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
    <EditTaskFormStyle>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-row">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
          <button type="submit">Update Task</button>
          {onCancel && (
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </EditTaskFormStyle>
  );
}

export default EditTaskForm;
