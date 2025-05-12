import React from "react";
import styled from "styled-components";
import EditTaskForm from "./EditTaskForm";
import { PieChart } from "@mui/x-charts/PieChart";

const StatEdit = styled.div`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background-color: #eeeeee;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 500px;

    h2 {
      margin-top: 0;
      margin-bottom: 20px;
    }

    button {
      background-color: #7f55b1;
    }

    button:hover {
      background-color: #7f55cf;
    }
  }
`;

const Stats = ({
  showStat,
  setShowStat,
  CompletedTasksCount,
  PendingTasksCount,
}) => {
  return (
    showStat && (
      <StatEdit>
        {showStat && (
          <div className="modal-overlay">
            <div className="modal-content">
              <PieChart
                colors={["#89AC46", "#EC5228"]}
                series={[
                  {
                    data: [
                      {
                        id: 0,
                        value: CompletedTasksCount,
                        label: "Completed Tasks",
                      },
                      {
                        id: 1,
                        value: PendingTasksCount,
                        label: "Pending Tasks",
                      },
                    ],
                  },
                ]}
                width={200}
                height={200}
              />

              <button onClick={() => setShowStat(false)}> Exit</button>
            </div>
          </div>
        )}
      </StatEdit>
    )
  );
};

export default Stats;
