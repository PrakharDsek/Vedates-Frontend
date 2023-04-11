import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { setIsAuth } from "../../Redux/StateManager";

const Header = () => {
  const dispatch=useDispatch()
  const Logout =async() => {
    const Logout= await axios.delete("https://vedates.onrender.com/api/v1/user/logout");
    dispatch(setIsAuth(false))
    toast.success("Logout was successfull")
  }

  const {IsAuth} =useSelector((state) => state.StateManager)

  return (
    <Container>
      <Content>
        <Right>
          <h1 className="hover">Vedates</h1>
        </Right>
        <Middle>
         <Link to="/"> <li className="hover">Home</li></Link>
         <Link to="/profile"> <li className="hover">Profile</li></Link>
         <Link to="/abouts"> <li className="hover">Abouts</li></Link>
        </Middle>
        <Left>{IsAuth ?<button className="hover" onClick={Logout}>Logout</button> :
          <Link to="/login"><button className="hover">Login</button></Link>}
        </Left>
      </Content>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 99%;
  height: 100%;
  border: 0.1px solid lightgray;
  border-top: none;
  border-left: none;
  border-right: none;
  padding: 12px;
`;
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Right = styled.div`
  color: white;
  & h1 {
    font-weight: 900;
    letter-spacing: 2px;
  }
`;
const Middle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  & a{
    text-decoration: none !important;
  }
  & li {
    list-style: none;
    color: white;
    letter-spacing: 2px;
    margin: 12px;
    font-size: 1.4rem;
  }
`;
const Left = styled.div`
  button {
    width: 62px;
    padding: 8px;
    border: 1px solid lightgray;
    border-radius: 4px;
    background-color: #204979;
    color: white;
  }
`;
