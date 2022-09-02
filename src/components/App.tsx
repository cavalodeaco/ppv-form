import { AppShell, Text, Button } from "@mantine/core";
import PPVHeader from "./PPVHeader";

export default function App() {
  return (
    <AppShell header={<PPVHeader />}>
      <Text>Welcome to Mantine!</Text>
      <Button>Teste</Button>
    </AppShell>
  );
}
