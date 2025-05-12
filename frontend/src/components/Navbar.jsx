import React from "react";
import styled from "styled-components";
import RightNav from "./RightNav";
import Burger from "./Burger";

const Nav = styled.nav`
  position: sticky;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #9aa6b2;
  padding: 0px 15px;
  width: 100%;
  height: 55px;
  box-sizing: border-box;
  background-color: #FFF7FC;

  .logo {
    color: #000;
    padding: 10px 0px;
    font-size: 1.5rem;
    font-weight: 1000;
  }
`;

const Navbar = ({ onLogout, username, showStat, setShowStat}) => {
  return (
    <Nav>
      <div className="logo">TodoList</div>
      <Burger onLogout={onLogout} username={username} setShowStat={setShowStat}/>
    </Nav>
  );
};

export default Navbar;
