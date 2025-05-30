import styled from "styled-components";
import { Task } from "../features/tasks/types";
import { useDispatch } from "react-redux";
import { deleteTask, setEditedTask } from "../features/tasks/tasksSlice";
import { AppDispatch } from "../app/store";

const Card = styled.div`
  background: white;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-bottom: 1px solid #000;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

const Description = styled.p`
  margin: 0;
  color: #555;
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #888;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

const DeleteBtn = styled.button`
  padding: 6px 10px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const EditBtn = styled.button`
  padding: 6px 10px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

interface TaskItemProps {
  task: Task;
}

export const TaskItem = ({ task }: TaskItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Card>
      <Title>{task.title}</Title>
      <Description>{task.description}</Description>
      <Meta>
        <span>Приоритет: {task.priority}</span>
        <span>{new Date(task.createdAt).toLocaleString()}</span>
      </Meta>
      <Actions>
        <EditBtn onClick={() => dispatch(setEditedTask(task.id))}>
          Редактировать
        </EditBtn>
        <DeleteBtn onClick={() => dispatch(deleteTask(task.id))}>
          Удалить
        </DeleteBtn>
      </Actions>
    </Card>
  );
};
