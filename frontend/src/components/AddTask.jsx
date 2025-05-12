import React from 'react'
import styled from 'styled-components'


const AddTaskStyle = styled.div`
width: 100%;
`;

const AddTask = ({editingTask, TaskForm, handleAddTask}) => {
  return (
    <AddTaskStyle>
         {!editingTask && (
          /* Changed class name to match CSS selector (lowercase 'f') - CHANGE 4 */
          <div className="taskform-footer">
          <TaskForm
            onSubmit={handleAddTask}
            initialData={null}
            onCancel={null}
          />
          </div>
        )}
    </AddTaskStyle>
  )
}

export default AddTask