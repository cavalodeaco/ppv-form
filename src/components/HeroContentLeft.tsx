import { createStyles, Overlay, Container, Image, Box } from "@mantine/core";
import hero from "./img/hero.jpeg";
import logo from "./img/logoppv.svg";

const useStyles = createStyles((theme) => ({
  hero: {
    position: "relative",
    backgroundImage: `url(${hero})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  container: {
    height: 700,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingBottom: theme.spacing.xl * 6,
    zIndex: 1,
    position: "relative",

    [theme.fn.smallerThan("sm")]: {
      height: 500,
      paddingBottom: theme.spacing.xl * 3,
    },
  },

  image: {
    width: "400px",
    maxWidth: "50%",
    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },
}));

export function HeroContentLeft() {
  const { classes } = useStyles();

  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />

      <Container className={classes.container}>
        <Box className={classes.image}>
          <Image src={logo} alt="Pilotando Para Vida" withPlaceholder />
        </Box>
      </Container>
    </div>
  );
}
