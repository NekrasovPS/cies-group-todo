import styled from "styled-components";
import { TaskForm } from "./components/TaskForm";
import { FilterControls } from "./components/FilterControls";
import { AutoTaskSpawner } from "./components/AutoTaskSpawner";
import { EditTaskModal } from "./components/EditTaskModal";

const Container = styled.div`
  max-width: 640px;
  margin: 40px auto;
  padding: 0 16px;
`;

function App() {
  return (
    <Container>
      <h1>Менеджер задач</h1>
      <TaskForm />
      <FilterControls />
      <AutoTaskSpawner />
      <EditTaskModal />
    </Container>
  );
}

export default App;
