import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks, createTask, updateTask, deleteTask } from "../api";

const useTaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const [showNotify, setShowNotify] = useState(null);
  const [showStat, setShowStat] = useState(false);
  const navigate = useNavigate();
  const isMounted = useRef(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const isAuthenticated =
          localStorage.getItem("isAuthenticated") === "true";
        if (!isAuthenticated) {
          navigate("/login");
          return;
        }

        const data = await getTasks();

        if (isMounted.current) {
          setTasks(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);

        if (isMounted.current) {
          if (
            error.response?.status === 401 ||
            error.message?.includes("unauthorized") ||
            error.message?.includes("log in")
          ) {
            handleLogout();
          } else {
            setError("Failed to load tasks. Please try again.");
            setLoading(false);
          }
        }
      }
    };

    fetchTasks();
  }, [navigate]);

  const handleLogout = () => {
    isMounted.current = false;

    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  const handleAddTask = async (taskData) => {
    try {
      setError("");
      const newTask = await createTask(taskData);
      if (isMounted.current) {
        setTasks([...tasks, newTask]);
      }
    } catch (error) {
      if (isMounted.current) {
        setError("Failed to add task. Please try again.");
        console.error("Error adding task:", error);
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
      setError("");
      const updatedTask = await updateTask(id, taskData);
      if (isMounted.current) {
        setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
        setEditingTask(null);
      }
    } catch (error) {
      if (isMounted.current) {
        setError("Failed to update task. Please try again.");
        console.error("Error updating task:", error);
      }
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      setError("");
      await deleteTask(id);
      if (isMounted.current) {
        setTasks(tasks.filter((task) => task.id !== id));
      }
    } catch (error) {
      if (isMounted.current) {
        setError("Failed to delete task. Please try again.");
        console.error("Error deleting task:", error);
      }
    }
  };

  const handleToggleComplete = async (id) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    try {
      setError("");
      const updatedTask = await updateTask(id, {
        completed: !taskToUpdate.completed,
      });
      if (isMounted.current) {
        setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
      }
    } catch (error) {
      if (isMounted.current) {
        setError("Failed to update task status. Please try again.");
        console.error("Error updating task:", error);
      }
    }
  };

  return {
    tasks,
    loading,
    error,
    editingTask,
    filter,
    user,
    showStat,
    showNotify,
    setShowNotify,
    setShowStat,
    setFilter,
    setEditingTask,
    handleLogout,
    handleAddTask,
    handleEditTask,
    handleUpdateTask,
    handleDeleteTask,
    handleToggleComplete,
  };
};

export default useTaskManager;
