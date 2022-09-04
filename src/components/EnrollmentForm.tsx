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
} from "@mantine/core";
import "dayjs/locale/pt-br";
import { DatePicker } from "@mantine/dates";
import { IconUserCheck, IconHelmet, IconLicense } from "@tabler/icons";
import { useState } from "react";
import { theme } from "./theme";
import { authorization, responsability, lgpd } from "./data/terms";
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

const schema = z.object({
  user: z.object({
    name: z.string().min(1, { message: "O campo nome é obrigatório" }),
    email: z.string().email({ message: "Informe um endereço de email" }),
    phone: z.custom((phone) => validateBr.celular(phone), {
      message: "Informe um número de celular",
    }),
    driverLicense: z.object({
      number: z.custom((cnh) => validateBr.cnh(cnh), {
        message: "Informe o número da sua CNH",
      }),
      date: z
        .date({
          required_error: "Informe a data de emissão",
          invalid_type_error: "Informe a data de emissão",
        })
        .max(new Date(), { message: "Informe a data de emissão" }),
    }),
  }),
});

export default function EnrollmentForm() {
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      user: {
        name: "",
        email: "",
        phone: "",
        driverLicense: {
          number: "",
          date: "",
        },
      },
      enroll: {
        city: "curitiba",
        motorcycle: {
          plate: "",
          brand: "",
          model: "",
        },
        use: "",
        terms: {
          authorization: false,
          responsability: false,
          lgpd: false,
        },
      },
    },
  });

  const { classes } = useStyles();

  const [active, setActive] = useState(0);

  const nextStep = () => {
    console.table(form.values.enroll);
    console.log(form);

    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current + 1;
    });
  };

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
              {...form.getInputProps("user.name")}
            />
            <TextInput
              label="E-mail"
              description="Informe seu melhor e-mail"
              placeholder="jax.teller@gmail.com"
              mt="md"
              withAsterisk
              {...form.getInputProps("user.email")}
              classNames={{
                input: classes.input,
                label: classes.inputLabel,
              }}
            />
            <TextInput
              label="Celular/WhatsApp"
              description="Informe um número de celular com DDD"
              placeholder="(99) 99999-9999"
              mt="md"
              withAsterisk
              {...form.getInputProps("user.phone")}
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
              {...form.getInputProps("user.driverLicense.number")}
              classNames={{
                input: classes.input,
                label: classes.inputLabel,
              }}
            />
            <DatePicker
              placeholder="DD/MM/AAAA"
              mt="md"
              locale="pt-br"
              inputFormat="DD/MM/YYYY"
              withAsterisk
              {...form.getInputProps("user.driverLicense.date")}
              classNames={{
                input: classes.input,
                label: classes.inputLabel,
              }}
              label="Data de emissão da CNH"
            />
          </Stepper.Step>
          <Stepper.Step
            icon={
              <ThemeIcon variant="filled" size={40} radius={40}>
                <IconHelmet size={30} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <Select
              label="Cidade do treinamento"
              mt="md"
              withAsterisk
              {...form.getInputProps("enroll.city")}
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
            <TextInput
              label="Placa"
              placeholder="AAA9999"
              mt="md"
              withAsterisk
              {...form.getInputProps("enroll.motorcycle.plate")}
              classNames={{
                input: classes.input,
                label: classes.inputLabel,
              }}
            />
            <TextInput
              label="Marca"
              placeholder=""
              mt="md"
              withAsterisk
              {...form.getInputProps("enroll.motorcycle.brand")}
              classNames={{
                input: classes.input,
                label: classes.inputLabel,
              }}
            />
            <TextInput
              label="Modelo"
              placeholder=""
              mt="md"
              withAsterisk
              {...form.getInputProps("enroll.motorcycle.model")}
              classNames={{
                input: classes.input,
                label: classes.inputLabel,
              }}
            />

            <Select
              label="Uso da motocicleta"
              defaultValue="motofretista"
              mt="md"
              withAsterisk
              {...form.getInputProps("enroll.use")}
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
              value={[form.values.enroll.terms.authorization.toString()]}
              onChange={(values) => {
                form.setFieldValue(
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
              value={[form.values.enroll.terms.responsability.toString()]}
              onChange={(values) => {
                form.setFieldValue(
                  "enroll.terms.responsability",
                  Boolean(values[1])
                );
              }}
              description={
                <ScrollArea style={{ height: 60 }}>{responsability}</ScrollArea>
              }
            >
              <Checkbox value="true" label="Li e concordo" />
            </Checkbox.Group>

            <Checkbox.Group
              mt="md"
              label="Termo de Consentimento"
              withAsterisk
              value={[form.values.enroll.terms.lgpd.toString()]}
              onChange={(values) => {
                form.setFieldValue("enroll.terms.lgpd", Boolean(values[1]));
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
        <Group position="right" mt="xl">
          {active !== 3 && <Button onClick={nextStep}>Próximo</Button>}
        </Group>
      </MantineProvider>
    </div>
  );
}
