import { Global } from '@mantine/core';
import timeburnerbold from './fonts/timeburnerbold.ttf';

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          '@font-face': {
            fontFamily: 'TimeBurner',
            src: `url(${timeburnerbold})`,
          },
        },
      ]}
    />
  );
}
