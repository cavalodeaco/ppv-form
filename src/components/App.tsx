import { AppShell } from "@mantine/core";
import PPVHeader from "./PPVHeader";
import { HeroContentLeft } from "./HeroContentLeft";
import { About } from "./About";
import Enrollment from "./Enrollment";

export default function App() {
  return (
    <AppShell header={<PPVHeader />} padding={0}>
      <HeroContentLeft />
      <About />
      <Enrollment />
    </AppShell>
  );
}
