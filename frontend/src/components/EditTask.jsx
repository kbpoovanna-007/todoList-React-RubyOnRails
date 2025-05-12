import React from "react";
import styled from "styled-components";
import EditTaskForm from "./EditTaskForm";
const Edit = styled.div`


  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 50;
  }

  .modal-content {
    background-color: #EEEEEE;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 500px;

    h2 {
      margin-top: 0;
      margin-bottom: 20px;
    }
  }
`;

const EditTask = ({
  editingTask,
  setEditingTask,
  TaskForm,
  handleUpdateTask,
}) => {
  return (
    <Edit>
      {editingTask && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Task</h2>
            <EditTaskForm
              onSubmit={(data) => handleUpdateTask(editingTask.id, data)}
              initialData={editingTask}
              onCancel={() => setEditingTask(null)}
            />
          </div>
        </div>
      )}
    </Edit>
  );
};

export default EditTask;
