import {
  Grid,
  MantineTheme,
  Select,
  Text,
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
    user: {
      name: string;
      phone: string;
      driverLicense: string;
      driverLicenseUF: string;
    };
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
      <Grid align="flex-end" justify="space-between" m="0">
        <TextInput
          label="Número da CNH"
          placeholder="00123456789"
          mt="md"
          w="60%"
          withAsterisk
          {...page1.getInputProps("user.driverLicense")}
          classNames={{
            input: classes.input,
            label: classes.inputLabel,
          }}
        />
        <Select
          label="UF da CNH"
          mt="md"
          w="39%"
          withAsterisk
          {...page1.getInputProps("user.driverLicenseUF")}
          classNames={{
            input: classes.input,
            label: classes.inputLabel,
          }}
          data={[
            { label: "AC", value: "AC" },
            { label: "AL", value: "AL" },
            { label: "AP", value: "AP" },
            { label: "AM", value: "AM" },
            { label: "BA", value: "BA" },
            { label: "CE", value: "CE" },
            { label: "DF", value: "DF" },
            { label: "ES", value: "ES" },
            { label: "GO", value: "GO" },
            { label: "MA", value: "MA" },
            { label: "MT", value: "MT" },
            { label: "MS", value: "MS" },
            { label: "MG", value: "MG" },
            { label: "PA", value: "PA" },
            { label: "PB", value: "PB" },
            { label: "PR", value: "PR" },
            { label: "PE", value: "PE" },
            { label: "PI", value: "PI" },
            { label: "RJ", value: "RJ" },
            { label: "RN", value: "RN" },
            { label: "RS", value: "RS" },
            { label: "RO", value: "RO" },
            { label: "RR", value: "RR" },
            { label: "SC", value: "SC" },
            { label: "SP", value: "SP" },
            { label: "SE", value: "SE" },
            { label: "TO", value: "TO" },
          ]}
        />
      </Grid>
      <Text c="dimmed" fz="xs">
        É necessário ter habilitação categoria A para realizar o curso
      </Text>
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
