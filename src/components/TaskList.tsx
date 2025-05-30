import { useSelector } from "react-redux";
import { selectAllTasks } from "../features/tasks/tasksSelectors";
import { TaskItem } from "./TaskItem";
import styled from "styled-components";

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TaskList = () => {
  const tasks = useSelector(selectAllTasks);

  return (
    <List>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </List>
  );
};
