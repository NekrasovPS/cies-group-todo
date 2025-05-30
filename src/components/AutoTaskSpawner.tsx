import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { addTask } from "../features/tasks/tasksSlice";
import { Priority } from "../features/tasks/types";

const getRandomPriority = (): Priority => {
  const priorities: Priority[] = ["low", "medium", "high"];
  return priorities[Math.floor(Math.random() * priorities.length)];
};

const getRandomTitle = () => {
  const titles = [
    "Сделать отчет",
    "Позвонить клиенту",
    "Проверить email",
    "Запланировать встречу",
  ];
  return titles[Math.floor(Math.random() * titles.length)];
};

const getRandomDescription = () => {
  const descriptions = [
    "Очень важное дело",
    "Нужно выполнить как можно скорее",
    "Задача средней срочности",
    "На потом, но не забыть",
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

export const AutoTaskSpawner = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(
        addTask({
          title: getRandomTitle(),
          description: getRandomDescription(),
          priority: getRandomPriority(),
        })
      );
    }, Math.random() * 10000 + 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return null;
};
