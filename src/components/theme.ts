import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  colorScheme: 'dark', // do NOT use light!
  defaultRadius: 0,
  colors: {
    dark: [
      '#FFFFFF',
      '#CFCFCF',
      '#A7A7A7',
      '#888888',
      '#6C6C6C',
      '#595959',
      '#4A4A4A',
      '#3C3C3C',
      '#313131',
      '#282828',
    ],
    ppv: [
      '#F8F2EE',
      '#EED8CC',
      '#ECBFA6',
      '#F1A67D',
      '#FF8D4D',
      '#EA7E41',
      '#D47139',
      '#B7683B',
      '#9A6040',
      '#825942',
    ],
  },
  primaryColor: 'ppv',
  primaryShade: 4,
  headings: {
    fontFamily: 'TimeBurner, Ubuntu, sans-serif',
    fontWeight: 'bold',
  },
};
