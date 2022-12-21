import { Text } from '@mantine/core';
import { ReactElement } from 'react';

export default function TextPPV({ text }: { text: string }) : ReactElement {
  return (
    <Text color="ppv" inherit component="span">
      {text}
    </Text>
  );
}
