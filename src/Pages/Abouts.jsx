import React from "react";
import styled from "styled-components";

const Abouts = () => {
  return (
    <Container>
      <Content>
        <h1>Vedates</h1>
        <p>
          Vedates is an intuitive todo app designed and developed by Prakhar to
          help individuals manage their daily tasks and responsibilities with
          ease. This app is packed with powerful features and an elegant
          interface, making it one of the most useful productivity tools
          available today. One of the most notable features of Vedates is its
          ability to organize tasks in a visually appealing manner. The app lets
          users prioritize their tasks by color-coding them based on their
          urgency and importance. This helps users to quickly identify and
          tackle the most pressing tasks first, ensuring that nothing important
          is left undone. Another useful feature of Vedates is its ability to
          set reminders and deadlines for tasks. Users can set up alerts to
          remind them of upcoming tasks, ensuring that they never miss a
          deadline. The app also allows users to add notes and attachments to
          their tasks, making it easier to keep track of all the details
          associated with a particular task. Vedates is also incredibly
          user-friendly. Its clean and clutter-free interface allows users to
          focus on their tasks without any distractions. The app is easy to
          navigate, and users can quickly add, edit, or delete tasks with just a
          few taps. Vedates is also designed with collaboration in mind. Users
          can create shared projects and collaborate with others to get things
          done faster. This is especially useful for teams or groups who need to
          work together on a project. Overall, Vedates is an excellent todo app
          that offers a range of powerful features in a user-friendly interface.
          With Vedates, users can manage their tasks efficiently, stay
          organized, and boost their productivity.
        </p>
      </Content>
    </Container>
  );
};

export default Abouts;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 50%;
  color: white;
`;
