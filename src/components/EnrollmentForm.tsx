import {
  createStyles,
  Text,
  TextInput,
  Select,
  Button,
  Group,
  ThemeIcon,
  Stepper,
  MantineProvider,
  Checkbox,
  ScrollArea,
  Divider,
} from "@mantine/core";
import "dayjs/locale/pt-br";
import { IconUserCheck, IconHelmet, IconLicense } from "@tabler/icons";
import { useState } from "react";
import { theme } from "./theme";
import { authorization, responsibility, lgpd } from "./data/terms";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { validateBr } from "js-brasil";

const useStyles = createStyles((theme) => ({
  form: {
    backgroundColor: theme.white,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
  },

  input: {
    backgroundColor: theme.white,
    borderColor: theme.colors.gray[4],
    color: theme.black,

    "&::placeholder": {
      color: theme.colors.gray[5],
    },
  },

  inputLabel: {
    color: theme.black,
  },

  control: {
    backgroundColor: theme.colors[theme.primaryColor][6],
  },
}));

const page1Schema = z.object({
  user: z.object({
    name: z.string().min(1, { message: "O campo nome é obrigatório" }),
    phone: z.custom((phone) => validateBr.celular(phone), {
      message: "Informe um número de celular",
    }),
    driverLicense: z.custom((cnh) => validateBr.cnh(cnh), {
      message: "Informe o número da sua CNH",
    }),
  }),
});

const page2Schema = z.object({});

const page3Schema = z.object({
  enroll: z.object({
    terms: z.object({
      authorization: z.boolean(),
      responsibility: z.custom((responsibility) => responsibility === true, {
        message:
          "O aceite do termo de responsabilidade é obrigatório para a realização do curso",
      }),
      lgpd: z.custom((lgpd) => lgpd === true, {
        message:
          "O consentimento do uso dos dados é necessário para a inscrição",
      }),
    }),
  }),
});

export default function EnrollmentForm() {
  const page1 = useForm({
    validate: zodResolver(page1Schema),
    initialValues: {
      user: {
        name: "",
        phone: "",
        driverLicense: "",
      },
      enroll: {
        city: "curitiba",
      },
    },
  });

  const page2 = useForm({
    validate: zodResolver(page2Schema),
    initialValues: {
      user: {
        email: "",
      },
      enroll: {
        motorcycle: {
          brand: "",
          model: "",
        },
        use: "",
      },
    },
  });

  const page3 = useForm({
    validate: zodResolver(page3Schema),
    initialValues: {
      enroll: {
        terms: {
          authorization: false,
          responsibility: false,
          lgpd: false,
        },
      },
    },
  });

  const form = [page1, page2, page3];

  const { classes } = useStyles();

  const [active, setActive] = useState(0);

  const prevStep = () => setActive((current) => current - 1);

  const nextStep = () =>
    setActive((current) => {
      console.log(form[current].validate());
      return form[current].validate().hasErrors ? current : current + 1;
    });

  return (
    <div className={classes.form}>
      <MantineProvider theme={{ ...theme, colorScheme: "light" }}>
        <Stepper active={active} radius={40}>
          <Stepper.Step
            icon={
              <ThemeIcon variant="filled" size={40} radius={40}>
                <IconUserCheck size={25} stroke={1.5} />
              </ThemeIcon>
            }
          >
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
          </Stepper.Step>
          <Stepper.Step
            icon={
              <ThemeIcon variant="filled" size={40} radius={40}>
                <IconHelmet size={30} stroke={1.5} />
              </ThemeIcon>
            }
          >
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
          </Stepper.Step>
          <Stepper.Step
            icon={
              <ThemeIcon variant="filled" size={40} radius={40}>
                <IconLicense size={30} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <Checkbox.Group
              mt="md"
              label="Termo de Autorização"
              value={[page3.values.enroll.terms.authorization.toString()]}
              onChange={(values) => {
                page3.setFieldValue(
                  "enroll.terms.authorization",
                  Boolean(values[1])
                );
              }}
              description={
                <ScrollArea style={{ height: 60 }}>{authorization}</ScrollArea>
              }
            >
              <Checkbox value="true" label="Li e concordo" />
            </Checkbox.Group>
            <Checkbox.Group
              mt="md"
              label="Termo de Responsabilidade"
              withAsterisk
              value={[page3.values.enroll.terms.responsibility.toString()]}
              error={page3.errors["enroll.terms.responsibility"]}
              onChange={(values) => {
                page3.setFieldValue(
                  "enroll.terms.responsibility",
                  Boolean(values[1])
                );
              }}
              description={
                <ScrollArea style={{ height: 60 }}>{responsibility}</ScrollArea>
              }
            >
              <Checkbox value="true" label="Li e concordo" />
            </Checkbox.Group>

            <Checkbox.Group
              mt="md"
              label="Termo de Consentimento"
              error={page3.errors["enroll.terms.lgpd"]}
              withAsterisk
              value={[page3.values.enroll.terms.lgpd.toString()]}
              onChange={(values) => {
                page3.setFieldValue("enroll.terms.lgpd", Boolean(values[1]));
              }}
              description={
                <ScrollArea style={{ height: 60 }}>{lgpd}</ScrollArea>
              }
            >
              <Checkbox value="true" label="Li e concordo" />
            </Checkbox.Group>
          </Stepper.Step>
          <Stepper.Completed>
            <Text color={"dark"}>
              Você está na fila de espera! Nossa equipe entrará em contato por
              telefone/WhatsApp próximo a data, para agendar a sua turma. Obs.:
              Cada turma atenderá no máximo 20 alunos.
            </Text>
          </Stepper.Completed>
        </Stepper>
        {active !== 3 && (
          <Group position="right" mt="xl">
            {active !== 0 && (
              <Button variant="light" onClick={prevStep}>
                Anterior
              </Button>
            )}
            <Button onClick={nextStep}>Próximo</Button>
          </Group>
        )}
      </MantineProvider>
    </div>
  );
}
