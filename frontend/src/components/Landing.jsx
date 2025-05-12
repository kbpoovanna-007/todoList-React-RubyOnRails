import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import TaskForm from "./TaskForm";
import Filter from "./Filter";
import EditTask from "./EditTask";
import AddTask from "./AddTask";
import ShowTasks from "./ShowTasks";
import Stats from "./Stats";
import Notify from "./Notify";
import useTaskManager from "../hooks/useTaskManager";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: #e9efec;
`;


function Landing() {
  const {
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
  } = useTaskManager();

  const CompletedTasksCount = tasks.filter((task) => task.completed).length;
  const PendingTasksCount = tasks.filter((task) => !task.completed).length;

  return (
    <Container>
      <Navbar
        onLogout={handleLogout}
        username={user.name}
        setShowStat={setShowStat}
      />

      <Filter
        error={error}
        filter={filter}
        setFilter={setFilter}
        CompletedTasksCount={CompletedTasksCount}
        PendingTasksCount={PendingTasksCount}
      />

      <ShowTasks
        loading={loading}
        tasks={tasks}
        filter={filter}
        handleToggleComplete={handleToggleComplete}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
        setShowNotify={setShowNotify}
      />

      <EditTask
        editingTask={editingTask}
        setEditingTask={setEditingTask}
        TaskForm={TaskForm}
        handleUpdateTask={handleUpdateTask}
      />

      <Stats
        showStat={showStat}
        setShowStat={setShowStat}
        CompletedTasksCount={CompletedTasksCount}
        PendingTasksCount={PendingTasksCount}
      />

      <Notify showNotify={showNotify} setShowNotify={setShowNotify} />

      <AddTask
        eitingTask={editingTask}
        TaskForm={TaskForm}
        handleAddTask={handleAddTask}
      />
    </Container>
  );
}

export default Landing;
