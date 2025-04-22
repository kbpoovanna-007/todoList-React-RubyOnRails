import React, { useState, useEffect } from 'react';

function TaskForm({ onSubmit, initialData, onCancel }) {
  const [title, setTitle] = useState('');
  
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
    } else {
      setTitle('');
    }
  }, [initialData]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onSubmit({ title });
    setTitle('');
  };
  
  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-row">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
        />
        <button type="submit">{initialData ? 'Update' : 'Add'} Task</button>
        {onCancel && (
          <button type="button" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;