import React, { useState } from "react";
import styled from "styled-components";
import RightNav from "./RightNav";

const StyledBurger = styled.div`
    display:none;
    position: fixed;
    width: 2rem;
    height: 2rem;
    top: 15px;
    right: 20px;
    z-index: 60;
    cursor: pointer;

    @media (max-width: 700px){
        display: flex;
        justify-content: space-around;
        flex-flow: column nowrap;
    }

    div{
        margin: 2px;
        background-color: ${({ open }) => (open ? "#fff" : "#000")};
        width: 2.5rem;
        height: 0.3rem;
        border-radius: 10px;
        transform-origin: 1px;
        transition: all 0.3s linear;

        &:nth-child(1){
            transform: ${({ open }) =>
              open ? "rotate(45deg)" : "rotate(0deg)"};
        }

         &:nth-child(2){
            transform: ${({ open }) =>
              open ? "translateX(100%)" : "translateX(0)"};
            opacity: ${({ open }) => (open ? 0 : 1)};
        }

         &:nth-child(3){
            transform: ${({ open }) =>
              open ? "rotate(-45deg)" : "rotate(0deg)"};
        }

    } 
`;

const Burger = ({ onLogout, username, showStat, setShowStat}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <RightNav open={open} onLogout={onLogout} username={username} setShowStat={setShowStat} />
    </>
  );
};

export default Burger;
