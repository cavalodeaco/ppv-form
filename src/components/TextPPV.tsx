import { Text } from "@mantine/core";

export default function TextPPV({ text }: { text: string }) {
  return (
    <Text color="ppv" inherit component={"span"}>
      {text}
    </Text>
  );
}
