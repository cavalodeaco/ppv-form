import { AppShell } from "@mantine/core";
import { HeroContentLeft } from "./HeroContentLeft";
import { About } from "./About";
import Enrollment from "./Enrollment";
import { HeaderResponsive } from "./HeaderResponsive";

export default function App() {
  return (
    <AppShell header={<HeaderResponsive />} padding={0}>
      <HeroContentLeft />
      <About />
      <Enrollment />
    </AppShell>
  );
}
