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
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";

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

export default function EnrollmentForm() {
  const form = useForm({
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
    console.table(form.values.user);
    console.table(form.values.enroll);
    console.log(form);

    setActive((current) => (current < 3 ? current + 1 : current));
  };
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

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
              required
              classNames={{
                input: classes.input,
                label: classes.inputLabel,
              }}
              {...form.getInputProps("user.name")}
            />
            <TextInput
              label="E-mail"
              placeholder="jax.teller@gmail.com"
              mt="md"
              required
              {...form.getInputProps("user.email")}
              classNames={{
                input: classes.input,
                label: classes.inputLabel,
              }}
            />
            <TextInput
              label="Telefone/WhatsApp"
              placeholder="(99) 99999-9999"
              mt="md"
              required
              {...form.getInputProps("user.phone")}
              classNames={{
                input: classes.input,
                label: classes.inputLabel,
              }}
            />
            <TextInput
              label="Número da CNH"
              placeholder="00123456789"
              mt="md"
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
                console.log(values);
                form.setFieldValue("enroll.terms.authorization", Boolean(values[1]));
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
              required
              value={[form.values.enroll.terms.responsability.toString()]}
              onChange={(values) => {
                console.log(values);
                form.setFieldValue("enroll.terms.responsability", Boolean(values[1]));
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
              required
              value={[form.values.enroll.terms.lgpd.toString()]}
              onChange={(values) => {
                console.log(values);
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
        <Group position="center" mt="xl">
          <Button variant="light" onClick={prevStep}>
            Anterior
          </Button>
          <Button onClick={nextStep}>Próximo</Button>
        </Group>
      </MantineProvider>
    </div>
  );
}
