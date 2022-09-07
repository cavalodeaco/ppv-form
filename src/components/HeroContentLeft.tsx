import {
  createStyles,
  Overlay,
  Container,
  Image,
  Box,
  Grid,
} from "@mantine/core";
import hero from "./img/hero.jpeg";
import logoPPV from "./img/logoppv.svg";
import logoLRMC from "./img/brasao_lrmc.png";

const useStyles = createStyles((theme) => ({
  hero: {
    position: "relative",
    backgroundImage: `url(${hero})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  container: {
    height: "calc(100vh - 60px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // paddingBottom: theme.spacing.xl * 6,
    zIndex: 1,
    position: "relative",

    [theme.fn.smallerThan("md")]: {
      height: "calc(100vw - 60px)",
      // paddingBottom: theme.spacing.xl * 3,
    },
  },

  box: {
    width: "calc(50vh - 60px)",
    height: "calc(50vh - 60px)",
    [theme.fn.smallerThan("md")]: {
      width: "calc(50vw - 60px)",
      height: "calc(50vw - 60px)",
    },
    display: "flex",
    justifyContent: "center",
  },

  image: {
    width: "80%",
  },
}));

export function HeroContentLeft() {
  const { classes } = useStyles();

  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.30) 0%, rgba(0, 0, 0, .70) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Grid>
        <Grid.Col offset={6} span={6}>
          <Container className={classes.container}>
            <Box className={classes.box}>
              <Box className={classes.image}>
                <Image
                  src={logoLRMC}
                  alt="Lord Riders Moto Clube"
                  withPlaceholder
                />
              </Box>
            </Box>
            <Box className={classes.box}>
              <Box className={classes.image}>
                <Image src={logoPPV} alt="Pilotando Para Vida" withPlaceholder />
              </Box>
            </Box>
          </Container>
        </Grid.Col>
      </Grid>
    </div>
  );
}
