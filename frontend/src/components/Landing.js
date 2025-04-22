import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, createTask, updateTask, deleteTask } from '../api';
import TaskForm from './TaskForm';

function Landing() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();
  
  // Define isMounted ref
  const isMounted = useRef(true);
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Set up cleanup when component unmounts
  useEffect(() => {
    // Component is mounted
    isMounted.current = true;
    
    // Cleanup function when component unmounts
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // Function to fetch tasks
    const fetchTasks = async () => {
      try {
        // Check auth status first
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        if (!isAuthenticated) {
          navigate('/login');
          return;
        }
        
        const data = await getTasks();
        
        // Only update state if component is still mounted
        if (isMounted.current) {
          setTasks(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        
        // Only update state if component is still mounted
        if (isMounted.current) {
          if (error.response?.status === 401 || 
              error.message?.includes('unauthorized') || 
              error.message?.includes('log in')) {
            handleLogout();
          } else {
            setError('Failed to load tasks. Please try again.');
            setLoading(false);
          }
        }
      }
    };

    fetchTasks();
  }, [navigate]);

  const handleLogout = () => {
    // Mark component as unmounted before navigation
    isMounted.current = false;
    
    // Clear authentication data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Use a different approach - full page reload instead of navigate
    window.location.href = '/login';
  };

  const handleAddTask = async (taskData) => {
    try {
      setError('');
      const newTask = await createTask(taskData);
      if (isMounted.current) {
        setTasks([...tasks, newTask]);
      }
    } catch (error) {
      if (isMounted.current) {
        setError('Failed to add task. Please try again.');
        console.error('Error adding task:', error);
      }
    }
  };

  const handleEditTask = (task) => {
    if (isMounted.current) {
      setEditingTask(task);
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      setError('');
      const updatedTask = await updateTask(id, taskData);
      if (isMounted.current) {
        setTasks(tasks.map(task => task.id === id ? updatedTask : task));
        setEditingTask(null);
      }
    } catch (error) {
      if (isMounted.current) {
        setError('Failed to update task. Please try again.');
        console.error('Error updating task:', error);
      }
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      setError('');
      await deleteTask(id);
      if (isMounted.current) {
        setTasks(tasks.filter(task => task.id !== id));
      }
    } catch (error) {
      if (isMounted.current) {
        setError('Failed to delete task. Please try again.');
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleToggleComplete = async (id) => {
    const taskToUpdate = tasks.find(task => task.id === id);
    try {
      setError('');
      const updatedTask = await updateTask(id, { completed: !taskToUpdate.completed });
      if (isMounted.current) {
        setTasks(tasks.map(task => 
          task.id === id ? updatedTask : task
        ));
      }
    } catch (error) {
      if (isMounted.current) {
        setError('Failed to update task status. Please try again.');
        console.error('Error updating task:', error);
      }
    }
  };

  return (
    <div className="landing-container">
      <div className="landing-header">
        <div>
          <h1>TODO LIST</h1>
          {user?.name && <p>Welcome, {user.name}!</p>}
        </div>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <TaskForm 
        onSubmit={editingTask ? 
          (data) => handleUpdateTask(editingTask.id, data) : 
          handleAddTask} 
        initialData={editingTask}
        onCancel={editingTask ? () => setEditingTask(null) : null}
      />
      
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <div className="tasks-container">
          {tasks.length === 0 ? (
            <p>No tasks found. Add your first task above!</p>
          ) : (
            <ul className="tasks-list">
              {tasks.map(task => (
                <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  <div className="task-content">
                    <input
                      type="checkbox"
                      checked={task.completed || false}
                      onChange={() => handleToggleComplete(task.id)}
                    />
                    <span className="task-title">{task.title}</span>
                  </div>
                  <div className="task-actions">
                    <button onClick={() => handleEditTask(task)}>Edit</button>
                    <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Landing;