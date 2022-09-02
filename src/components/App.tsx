import { AppShell, Header, Title, Text } from "@mantine/core";

export default function App() {
  return (
    <AppShell
      header={
        <Header height={60} p={"md"}>
          <Title order={3} transform={"uppercase"} italic color={"white"}>
            Pilotando Para{" "}
            <Text color="ppv.4" inherit component="span">
              Vida
            </Text>
          </Title>
        </Header>
      }
    >
      <Text>Welcome to Mantine!</Text>
    </AppShell>
  );
}
