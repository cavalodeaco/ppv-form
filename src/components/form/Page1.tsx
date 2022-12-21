import {
  MantineTheme,
  Select,
  TextInput,
  UseStylesOptions,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { ReactElement } from "react";

export default function Page1({
  page1,
  useStyles,
}: {
  page1: UseFormReturnType<{
    user: { name: string; phone: string; driverLicense: string };
    enroll: { city: string };
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
        label="Nome completo"
        placeholder="Jackson Teller"
        mt="md"
        classNames={{
          input: classes.input,
          label: classes.inputLabel,
        }}
        withAsterisk
        {...page1.getInputProps("user.name")}
      />
      <TextInput
        label="Celular/WhatsApp"
        description="Informe um número de celular com DDD"
        placeholder="(99) 99999-9999"
        mt="md"
        withAsterisk
        {...page1.getInputProps("user.phone")}
        classNames={{
          input: classes.input,
          label: classes.inputLabel,
        }}
      />
      <TextInput
        label="Número da CNH"
        description="É necessário ter habilitação categoria A para realizar o curso"
        placeholder="00123456789"
        mt="md"
        withAsterisk
        {...page1.getInputProps("user.driverLicense")}
        classNames={{
          input: classes.input,
          label: classes.inputLabel,
        }}
      />
      <Select
        label="Cidade do treinamento"
        mt="md"
        withAsterisk
        {...page1.getInputProps("enroll.city")}
        classNames={{
          input: classes.input,
          label: classes.inputLabel,
        }}
        data={[
          { value: "curitiba", label: "Curitiba" },
          { value: "maringa", label: "Maringá" },
          { value: "londrina", label: "Londrina" },
          { value: "cambira", label: "Cambira" },
        ]}
      />
    </>
  );
}
