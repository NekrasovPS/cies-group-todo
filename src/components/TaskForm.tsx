import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { addTask } from "../features/tasks/tasksSlice";
import { Priority } from "../features/tasks/types";

const Form = styled.form`
  display: flex;
  flex-direction: row;
  gap: 14px;
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px;
  margin-bottom: 0;
  flex-wrap: wrap;
`;

const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 1rem;
  width: 100%;
`;

const TextArea = styled.textarea`
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 1rem;
  resize: vertical;
  width: 100%;
`;

const Select = styled.select`
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 1rem;
  width: 48%;
`;

const Button = styled.button`
  padding: 12px 16px;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  width: 49%;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const TaskForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch(addTask({ title, description, priority }));
    setTitle("");
    setDescription("");
    setPriority("medium");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название задачи"
      />
      <TextArea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Описание"
      />
      <Select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
      >
        <option value="low">Низкий</option>
        <option value="medium">Средний</option>
        <option value="high">Высокий</option>
      </Select>
      <Button type="submit" disabled={!title.trim()}>
        Добавить задачу
      </Button>
    </Form>
  );
};
