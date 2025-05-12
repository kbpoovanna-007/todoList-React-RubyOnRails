import React from "react";
import styled from "styled-components";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  padding: 10px 5px;

  li {
    padding: 15px 10px;
    color: #000;
    cursor: pointer;
    font-weight: 800;
    position: relative;
    transition: all 0.3s ease;
  }

  li:hover {
    font-size: 1.4rem;
  }

  a {
    color: #000;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  a:hover {
    font-size: 1.4rem;
  }

  .user {
    color: #eb5b00;
  }

  .logout-btn {
    width: fit-content;
    padding: 10px;
    cursor: pointer;
    margin: 10px;
    background-color: #f44336;
  }

  .logout-btn:hover {
    background-color: #d32f2f;
  }

  button {
    width: 100%;
    padding: 10px;
    background-color: #fff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px;
  }

  button:hover {
    background-color: #fff;
  }

  @media (max-width: 700px) {
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    flex-flow: column nowrap;
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    position: fixed;
    background-color: #bca3ca;
    padding: 60px 10px;
    transition: transform 0.3s ease-in-out;
    color: white;
    li {
      color: white;
      padding: 15px 10px;
      background-color: #4a0e5c;
      border-radius: 10px;
      width: 100%;
      margin: 5px;
      text-align: center;
      transition: all 0.3s ease;
      position: relative;
    }

    li:hover {
      transform: translateY(-3px);
    }

    .logout-btn {
      width: 100%;
      padding: 15px;
    }

    .user {
      color: white;
    }

    a {
      color: white;
    }
  }
`;
const RightNav = ({ open, onLogout, username, setShowStat }) => {
  return (
    <Ul open={open}>
      <li className="user">Welcome {username}!</li>
      <li>
        <a href="#" onClick={() => setShowStat(true)}>
          Statistics
        </a>
      </li>
      <li>
        <a href="https://github.com/kbpoovanna-007/todoList-React-RubyOnRails">
          Github
        </a>
      </li>
      <button onClick={onLogout} className="logout-btn">
        Logout
      </button>
    </Ul>
  );
};

export default RightNav;
