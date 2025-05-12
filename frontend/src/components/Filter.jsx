import React from "react";
import styled from "styled-components";

const LandingTop = styled.div`
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
  margin: 10px;

  .error-message {
    margin: 10px;
  }

  .filter-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    button {
      margin: 5px;
      width: 40vh;
      border-radius: 30px;
      background-color: #fff;
      color: #000;
      transition: all 0.1s ease;

      .count {
        color: #000;
      }
    }

    button:hover {
      outline: 2px solid #7f55b1;
    }

    .active-filter {
      background-color: #7f55b1;
      box-shadow: 0 0px 200px #7f55b1;
      color: #fff;
      .count {
        color: #fff;
      }
    }
  }

  @media (max-width: 934px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: column wrap;

    .error-message {
      margin: 10px;
    }

    .filter-buttons {
      display: flex;
      justify-content: center;
      button {
        margin: 5px;
        width: fit-content;
      }
    }
  }
`;

const Filter = ({
  error,
  filter,
  setFilter,
  CompletedTasksCount,
  PendingTasksCount,
}) => {
  return (
    <LandingTop>
      {error && <div className="error-message">{error}</div>}
      <div className="filter-buttons">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active-filter" : ""}
        >
          All Tasks +{" "}
          <span className="count">
            {CompletedTasksCount + PendingTasksCount}
          </span>
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={filter === "completed" ? "active-filter" : ""}
        >
          Completed + <span className="count">{CompletedTasksCount}</span>
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={filter === "pending" ? "active-filter" : ""}
        >
          Pending + <span className="count">{PendingTasksCount}</span>
        </button>
      </div>
    </LandingTop>
  );
};

export default Filter;
