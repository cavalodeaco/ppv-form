import {
  createStyles,
  Overlay,
  Container,
  Image,
  Box,
  Grid,
} from '@mantine/core';
import { ReactElement } from 'react';
import hero from './img/hero.webp';
import logo from './img/logoppv.svg';

const useStyles = createStyles(() => ({
  hero: {
    position: 'relative',
    backgroundImage: `url(${hero})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  container: {
    height: 'calc(min(100vh - 60px, 100vw))',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    zIndex: 1,
    position: 'relative',
  },

  image: {
    width: '100%',
    maxWidth: '400px',
  },
}));

export function HeroContentLeft(): ReactElement {
  const { classes } = useStyles();

  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.30) 0%, rgba(0, 0, 0, .70) 40%)"
        opacity={1}
        zIndex={0}
      />

      <Container className={classes.container}>
        <Grid>
          <Grid.Col offset={6} span={6}>
            <Box className={classes.image}>
              <Image src={logo} alt="Pilotando Para Vida" withPlaceholder />
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
