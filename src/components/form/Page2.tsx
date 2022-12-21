import {
  Divider,
  MantineTheme,
  Select,
  Text,
  TextInput,
  UseStylesOptions,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { ReactElement } from "react";

export default function Page1({
  page2,
  useStyles,
}: {
  page2: UseFormReturnType<{
    user: { email: string };
    enroll: { motorcycle: { brand: string; model: string }; use: string };
  }>;
  useStyles: (
    params: void,
    options?:
      | UseStylesOptions<"input" | "form" | "inputLabel" | "control">
      | undefined
  ) => {
    classes: Record<"input" | "form" | "inputLabel" | "control", string>;
    cx: (...args: unknown[]) => string;
    theme: MantineTheme;
  };
}): ReactElement {
  const { classes } = useStyles();

  return (
    <>
      <TextInput
        label="E-mail"
        description="Informe seu e-mail se deseja receber comunicações sobre o projeto"
        placeholder="jax.teller@gmail.com"
        mt="md"
        {...page2.getInputProps("user.email")}
        classNames={{
          input: classes.input,
          label: classes.inputLabel,
        }}
      />
      <Text mt="sm" color="dark">
        Nos conte um pouco mais sobre você e sua moto:
      </Text>
      <Divider my="sm" />
      <Select
        label="Uso da motocicleta"
        defaultValue="motofretista"
        mt="md"
        {...page2.getInputProps("enroll.use")}
        classNames={{
          input: classes.input,
          label: classes.inputLabel,
        }}
        data={[
          {
            value: "motofretista",
            label: "Instrumento de trabalho (motofretista)",
          },
          {
            value: "deslocamento",
            label: "Deslocamentos casa – trabalho",
          },
          { value: "lazer", label: "Somente lazer" },
        ]}
      />
      <TextInput
        label="Marca"
        placeholder=""
        mt="md"
        {...page2.getInputProps("enroll.motorcycle.brand")}
        classNames={{
          input: classes.input,
          label: classes.inputLabel,
        }}
      />
      <TextInput
        label="Modelo"
        placeholder=""
        mt="md"
        {...page2.getInputProps("enroll.motorcycle.model")}
        classNames={{
          input: classes.input,
          label: classes.inputLabel,
        }}
      />
    </>
  );
}
