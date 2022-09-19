import {
  ThemeIcon,
  Text,
  Title,
  Container,
  Center,
  SimpleGrid,
  useMantineTheme,
  createStyles,
  Highlight,
  Stack,
  Image,
  Box,
} from "@mantine/core";
import { IconSchool, IconCoinOff, IconHelmet, TablerIcon } from "@tabler/icons";
// https://tabler-icons.io/
import TextPPV from "./TextPPV";
import logo from "./img/brasao_lrmc.svg";

const data = [
  {
    icon: IconSchool,
    title: "Instrução teórica",
    description: "2 horas de instrução teórica sobre pilotagem defensiva",
  },
  {
    icon: IconHelmet,
    title: "Atividade prática",
    description: "4 horas de atividades práticas em pistas pré-estabelecidas",
  },
  {
    icon: IconCoinOff,
    title: "Sem custo",
    description: "Curso gratuito oferecido por voluntários treinados",
  },
];

interface FeatureProps {
  icon: TablerIcon;
  title: React.ReactNode;
  description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
  const theme = useMantineTheme();
  return (
    <div>
      <ThemeIcon variant="outline" size={40} radius={40}>
        <Icon size={20} stroke={1.5} />
      </ThemeIcon>
      <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>
        {title}
      </Text>
      <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
        {description}
      </Text>
    </div>
  );
}

const useStyles = createStyles((theme) => ({
  backgroundGradient: {
    backgroundImage: theme.fn.gradient({
      from: "dark.6",
      to: "dark.9",
      deg: 180,
    }),
  },

  wrapper: {
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      paddingTop: theme.spacing.xl * 2,
      paddingBottom: theme.spacing.xl * 2,
    },
  },

  title: {
    fontSize: 34,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 26,
    },
  },

  image: {
    width: "400px",
    maxWidth: "80%",
    maxHeight: "50%",
  },
}));

export function About() {
  const { classes, theme } = useStyles();
  const features = data.map((feature, index) => (
    <Feature {...feature} key={index} />
  ));

  return (
    <div id="sobre" className={classes.backgroundGradient}>
      <Container className={classes.wrapper}>
        <Title
          order={1}
          align="center"
          transform="uppercase"
          italic
          p={"xl"}
          className={classes.title}
        >
          Curso de pilotagem defensiva <TextPPV text={"Pilotando Para Vida"} />
        </Title>

        <Text align="center" size={"md"}>
          <Highlight
            highlight={[
              "Pilotando Para Vida",
              "Lord Riders Moto Clube",
              "gratuito",
              "pilotar mais seguro",
            ]}
            highlightColor="ppv"
            highlightStyles={() => ({
              fontWeight: 700,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            })}
          >
            O Pilotando Para Vida é um curso de pilotagem defensiva de
            motocicleta oferecido pelo Lord Riders Moto Clube. O curso é
            gratuito e visa dotar seus participantes de conhecimentos teóricos e
            práticos que possibilitem um pilotar mais seguro nos deslocamentos
            diários.
          </Highlight>
        </Text>

        <SimpleGrid
          mt={60}
          cols={2}
          spacing={theme.spacing.xl * 2}
          breakpoints={[
            { maxWidth: 980, cols: 2, spacing: "xl" },
            { maxWidth: 755, cols: 1, spacing: "xl" },
          ]}
        >
          <Stack>{features}</Stack>
          <Box>
            <Title order={3}>Realização:</Title>
            <Center>
              <Box className={classes.image}>
                <Image
                  src={logo}
                  alt="Lord Riders Moto Clube"
                  withPlaceholder
                />
              </Box>
            </Center>
          </Box>
        </SimpleGrid>
      </Container>
    </div>
  );
}
