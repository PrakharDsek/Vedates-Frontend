import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setApiResponse, setIsAuth } from "../../Redux/StateManager";

const Login = () => {
  const [LoginFormStatus, setLoginFormStatus] = useState(true);
  const [Email, setEmail] = useState("");
  const [Pass, setPass] = useState("");
  const [Name, setName] = useState("");
  const [btnDisable, setbtnDisable] = useState(false);

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const LoginUser = async (e) => {
    setbtnDisable(true);
    e.preventDefault();
    try {
      const Data = await axios.post(
        "https://vedates.onrender.com/api/v1/user/login",
        {
          email: Email,
          password: Pass,
        },
        {
          withCredentials: true,
        }
      );
      const { success, message, userdata } = Data.data;
      console.log(success, message, userdata);
      if (success) {
        toast.success(message);
        dispatch(setIsAuth(true));
        dispatch(setApiResponse(userdata));
        Navigate("/");
      } else {
        toast.error(message);
      }
    } catch (error) {
      setbtnDisable(false);
      toast.error(error.response.data.message);
    }
  };

  const CreateAccount = async (e) => {
    setbtnDisable(true);
    e.preventDefault();
    try {
      const Data = await axios.post(
        "https://vedates.onrender.com/api/v1/user/new",
        {
          name: Name,
          email: Email,
          password: Pass,
        },
        {
          withCredentials: true,
        }
      );

      const { success, message, userdata } = Data.data;
      if (success) {
        toast.success(message);
        console.log(Data);
        dispatch(setApiResponse(userdata));
        dispatch(setIsAuth(true));
        Navigate("/");
      }
      toast.success(message);
      Navigate("/");
    } catch (error) {
      setbtnDisable(false);
      toast.error(error.response.data.message);
    }
  };

  const handleLoginStatus = () => {
    setEmail("");
    setPass("");
    if (LoginFormStatus) {
      setLoginFormStatus(false);
    } else {
      setLoginFormStatus(true);
    }
  };

  return (
    <Container>
      <Content>
        <h1>{LoginFormStatus ? "Login" : "Create Account"}</h1>
        {LoginFormStatus ? (
          <form>
            <input
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
            />
            <input
              value={Pass}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              required
              placeholder="Password"
            />

            <button
              className="hover"
              disabled={btnDisable == true}
              onClick={LoginUser}
            >
              Login
            </button>
          </form>
        ) : (
          <form>
            <input
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
            />
            <input
              value={Name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Username"
              required
            />
            <input
              value={Pass}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              required
              placeholder="Password"
            />

            <button
              className="hover"
              disable={btnDisable}
              onClick={CreateAccount}
            >
              Create a account
            </button>
          </form>
        )}
        <h6 onClick={handleLoginStatus}>
          {LoginFormStatus
            ? "New to Vedates? Create account"
            : "Already a  user? Login insted"}
        </h6>
      </Content>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border: 1px solid lightgray;
  border-radius: 4px;
  color: white;
  text-align: center;
  margin: 22px 0;
  form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    input {
      width: 90%;
      height: 22px;
      padding: 4px;
      margin: 12px;
    }
    button {
      width: 30%;
      padding: 8px;
      background-color: #253656;
      border: 1px solid lightgray;
      outline: none;
      border-radius: 4px;
      :disabled {
        background-color: #ea5858;
      }
    }
  }
`;
