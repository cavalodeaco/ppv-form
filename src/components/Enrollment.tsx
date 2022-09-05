import {
  createStyles,
  Text,
  Title,
  SimpleGrid,
  ThemeIcon,
  Space,
  Center,
} from "@mantine/core";
import "dayjs/locale/pt-br";
import { IconTrafficCone } from "@tabler/icons";
import EnrollmentForm from "./EnrollmentForm";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 400,
    boxSizing: "border-box",
    backgroundImage: `linear-gradient(-60deg, ${
      theme.colors[theme.primaryColor][4]
    } 0%, ${theme.colors[theme.primaryColor][6]} 100%)`,
    borderRadius: theme.radius.md,
    padding: theme.spacing.xl * 2.5,
    paddingTop: theme.spacing.xl * 4,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      padding: theme.spacing.xl * 1.5,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.white,
    lineHeight: 1,
    paddingTop: theme.spacing.xl * 2,
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    maxWidth: "100%",

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },
}));

function Warning({ text }: { text: string }) {
  const { classes } = useStyles();
  return (
    <Text className={classes.description} mt="sm" mb={30}>
      <Center inline>
        <ThemeIcon variant="filled" size={30} radius={30}>
          <IconTrafficCone size={20} stroke={1.5} />
        </ThemeIcon>
        <Space w="xs" />
        {text}
      </Center>
    </Text>
  );
}

export default function Enrollment() {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper} id="inscricao">
      <SimpleGrid
        cols={2}
        spacing={50}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <div>
          <Title className={classes.title} mb={30}>
            Inscreva-se
          </Title>
          <Warning text="O curso geralmente ocorre aos sábados das 8h às 14h." />
          <Warning text="Tenha paciência, estamos com fila de espera." />
          <Warning text="Entraremos em contato quando tivermos uma turma com vagas." />
          <Warning text="O curso não fornece a moto para o treinamento" />
        </div>
        <EnrollmentForm />
      </SimpleGrid>
    </div>
  );
}
