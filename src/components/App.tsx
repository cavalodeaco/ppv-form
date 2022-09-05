import { AppShell, MantineProvider } from "@mantine/core";
import { HeroContentLeft } from "./HeroContentLeft";
import { About } from "./About";
import Enrollment from "./Enrollment";
import { HeaderResponsive } from "./HeaderResponsive";
import { CustomFonts } from "./CustomFonts";
import { theme } from "./theme";
import { useDocumentTitle } from "@mantine/hooks";

export default function App() {
  useDocumentTitle('Pilotando Para Vida');
  return (
    <MantineProvider
      theme={{ ...theme, radius: 0 }}
      withGlobalStyles
      withNormalizeCSS
    >
      <CustomFonts />
      <AppShell header={<HeaderResponsive />} padding={0}>
        <HeroContentLeft />
        <About />
        <Enrollment />
      </AppShell>
    </MantineProvider>
  );
}
