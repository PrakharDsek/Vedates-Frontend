import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Typed from "react-typed";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import Image from "../assets/loading.gif";

const Home = () => {
  const [myTasks, setMytasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setdesc] = useState("");
  const [TaskId, setTaskId] = useState("");
  const { IsAuth } = useSelector((state) => state.StateManager);
  const { apiResponse } = useSelector((state) => state.StateManager);
  const apiUrl = `https://vedates.onrender.com/api/v1/task`;

  const dispatch = useDispatch();
  const [loadingStatus, setLoading] = useState(false);

  const SendNotification = (message, status) => {
    if (status == "success") {
      toast.success(`${message}`, {
        style: {
          backgroundColor: " #243b55",
          padding: "16px",
          color: "white",
        },
        iconTheme: {
          primary: "green",
          secondary: "#FFFAEE",
        },
      });
    } else {
      toast.error(`${message}`, {
        style: {
          backgroundColor: " #243b55",
          padding: "16px",
          color: "white",
        },
        iconTheme: {
          primary: "red",
          secondary: "#FFFAEE",
        },
      });
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/allTask/${apiResponse.payload._id}`,
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setMytasks(response.data.tasks);
      response.data.tasks.map((i) => setTaskId(i._id));
    } catch (error) {
      SendNotification("Login first", "error");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const CreateTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const AddTask = await axios.post(
        `https://vedates.onrender.com/api/v1/task/new`,
        {
          title: title,
          disc: desc,
        },
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      SendNotification("Added Task", "success");
    } catch (error) {
      SendNotification(error.response.data.message, "error");
    }
  };

  const DeleteTask = async () => {
    setLoading(true);
    const action = axios.delete(`${apiUrl}/delete/${TaskId}`);
    setLoading(false);
    SendNotification("Deleted the task", "success");
  };

  const UpdateTaskStats = async () => {
    setLoading(true);
    try {
      const updateAction = await axios.put(
        `https://vedates.onrender.com/api/v1/task/update/${TaskId}`,
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      if (updateAction.data.data.isCompleted == true) {
        SendNotification(
          `Completed ${updateAction.data.data.title}`,
          "success"
        );
      } else {
        SendNotification(`Removed ${updateAction.data.data.title}`, " success");
      }
    } catch (error) {
      SendNotification("Server error try again later", "error");
    }
  };

  return (
    <Container>
      <Content>
        {IsAuth ? (
          loadingStatus ? (
            <img
              src={Image}
              style={{ position: "absolute", top: "50%", right: "40%" }}
            />
          ) : (
            <>
              <BrandBoard>
                {" "}
                <div className="brandtext">
                  <Typed
                    strings={[
                      "Welcome to Vedates",
                      "Add tasks",
                      "Become more productive",
                    ]}
                    typeSpeed={70}
                    backSpeed={70}
                    loop
                  >
                    <h1></h1>
                  </Typed>
                </div>
              </BrandBoard>
              <Main>
                <form>
                  <h1>Welcome {apiResponse.payload.name},</h1>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Task title"
                  />
                  <input
                    value={desc}
                    onChange={(e) => setdesc(e.target.value)}
                    type="text"
                    placeholder="Task description"
                  />
                  <button type="submit" className="hover" onClick={CreateTask}>
                    Add
                  </button>
                </form>
              </Main>
              <Tasks>
                <h2>Recents</h2>
                {myTasks
                  ? myTasks.map((item) => (
                      <>
                        <div className="containerTask">
                          <div>
                            <h3>{item.title}</h3>
                            <div>
                              <input
                                type="checkbox"
                                name="taskCompleted"
                                onClick={UpdateTaskStats}
                                checked={item.isCompleted}
                              />
                              <DeleteIcon
                                onClick={DeleteTask}
                                className="hover"
                              />
                            </div>
                          </div>
                          <p>{item.disc}</p>
                        </div>
                      </>
                    ))
                  : "No task to display"}
              </Tasks>
            </>
          )
        ) : (
          <Navigate to="/login" />
        )}
      </Content>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const BrandBoard = styled.div`
  width: 50%;
  height: 100vh;
  margin: 12px 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1d273b;
  border: 1px solid lightgray;
  border-radius: 4px;
  .brandtext {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    & h1 {
      color: white;
      font-size: 40px;
    }
  }
`;

const Main = styled.div`
  width: 100%;
  height: 100%;

  & form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    color: white;
    & h1 {
      text-align: start;
    }
    & input {
      width: 50%;
      height: 22%;
      padding: 12px;
      margin: 8px;
      border: 1px solid lightgray;
      border-radius: 8px;
      outline: none;
      background-color: #243b55;
      color: white;
    }
    & button {
      width: 20%;
      height: 30%;
      padding: 12px;
      border: 1px solid lightgray;
      color: white;
      border-radius: 8px;
      background-color: #243b55;
    }
  }
`;

const Tasks = styled.div`
  width: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #1d2d41;
  border: 1px solid lightgray;
  margin: 12px;
  padding: 12px;
  border-radius: 8px;
  color: white;
  & .containerTask {
    padding: 12px;
    width: 100%;
    height: 100%;
    color: white;
    border-radius: 8px;
    margin: 4px;
    border: 1px solid lightgray;
    background-color: #1b3a5f;
    & div {
      display: flex;
      justify-content: space-between;
      & div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        input {
          padding: 4px;
        }
      }
    }
  }
`;
