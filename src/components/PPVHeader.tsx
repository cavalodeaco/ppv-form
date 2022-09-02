import { Header, Title } from "@mantine/core";
import TextPPV from "./TextPPV";

export default function PPVHeader() {
  return (
    <Header height={60} p={"md"}>
      <Title order={3} transform={"uppercase"} italic>
        Pilotando Para <TextPPV text="Vida" />
      </Title>
    </Header>
  );
}
