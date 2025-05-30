import styled from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllTasks } from "../features/tasks/tasksSelectors";
import { TaskItem } from "./TaskItem";
import { Priority } from "../features/tasks/types";

const Controls = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  background: white;
  padding: 20px;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const Select = styled.select`
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 1rem;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FilterControls = () => {
  const allTasks = useSelector(selectAllTasks);
  const [filterPriority, setFilterPriority] = useState<"all" | Priority>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filtered = allTasks
    .filter(
      (task) => filterPriority === "all" || task.priority === filterPriority
    )
    .sort((a, b) => {
      const aDate = new Date(a.createdAt).getTime();
      const bDate = new Date(b.createdAt).getTime();
      return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
    });

  return (
    <>
      <Controls>
        <Select
          value={filterPriority}
          onChange={(e) =>
            setFilterPriority(e.target.value as "all" | Priority)
          }
        >
          <option value="all">Все приоритеты</option>
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
        </Select>
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        >
          <option value="desc">Сначала новые</option>
          <option value="asc">Сначала старые</option>
        </Select>
      </Controls>
      <List>
        {filtered.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </List>
    </>
  );
};
