import { Header, Title, Text } from "@mantine/core";

export default function PPVHeader() {
  return (
    <Header height={60} p={"md"}>
      <Title order={3} transform={"uppercase"} italic>
        Pilotando Para{" "}
        <Text color="ppv" inherit component="span">
          Vida
        </Text>
      </Title>
    </Header>
  );
}
