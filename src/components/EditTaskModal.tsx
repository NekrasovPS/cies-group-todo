import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { AppDispatch } from "../app/store";
import { selectEditedTask } from "../features/tasks/tasksSelectors";
import { editTask, setEditedTask } from "../features/tasks/tasksSlice";
import { Priority } from "../features/tasks/types";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const Modal = styled.div`
  background: white;
  padding: 24px;
  border-radius: 16px;
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
`;

const TextArea = styled.textarea`
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  resize: vertical;
`;

const Select = styled.select`
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const Button = styled.button<{ variant?: "danger" }>`
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  background: ${(p) => (p.variant === "danger" ? "#ef4444" : "#6366f1")};
  color: white;
  cursor: pointer;
`;

export const EditTaskModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const task = useSelector(selectEditedTask);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
    }
  }, [task]);

  if (!task) return null;

  const handleSave = () => {
    dispatch(
      editTask({ id: task.id, updates: { title, description, priority } })
    );
    dispatch(setEditedTask(null));
  };

  return (
    <Overlay onClick={() => dispatch(setEditedTask(null))}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <h2>Редактировать задачу</h2>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
        </Select>
        <Row>
          <Button
            variant="danger"
            onClick={() => dispatch(setEditedTask(null))}
          >
            Отмена
          </Button>
          <Button onClick={handleSave}>Сохранить</Button>
        </Row>
      </Modal>
    </Overlay>
  );
};
