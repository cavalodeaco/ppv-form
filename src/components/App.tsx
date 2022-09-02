import { AppShell } from "@mantine/core";
import PPVHeader from "./PPVHeader";
import { HeroContentLeft } from "./HeroContentLeft";

export default function App() {
  return (
    <AppShell header={<PPVHeader />} padding={0}>
      <HeroContentLeft />
    </AppShell>
  );
}
