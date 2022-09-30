import { Global } from '@mantine/core';
import { ReactElement } from 'react';
import timeburnerbold from './fonts/timeburnerbold.ttf';

export function CustomFonts(): ReactElement {
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
