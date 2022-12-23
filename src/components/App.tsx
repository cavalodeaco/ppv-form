import { AppShell, MantineProvider } from '@mantine/core';
import { ReactElement } from 'react';
import { HeroContentLeft } from './HeroContentLeft';
import { About } from './About';
import Enrollment from './Enrollment';
import { HeaderResponsive } from './HeaderResponsive';
import { CustomFonts } from './CustomFonts';
import { theme } from './theme';

export default function App(): ReactElement {
  return (
    <MantineProvider
      theme={{ ...theme }}
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
