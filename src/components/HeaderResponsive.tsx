import { ReactElement, useState } from 'react';
import {
  createStyles,
  Title,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Anchor,
  Center,
  Space,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import TextPPV from './TextPPV';
import ppvicon from './img/iconppv.svg';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: 'fixed',
    zIndex: 2,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colors.dark[0],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colors.dark[6],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'filled',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
        .color,
    },
  },
}));

const links = [
  {
    link: '/#sobre',
    label: 'Sobre',
    target: '_self',
  },
  {
    link: 'https://lordriders.com/',
    label: 'LRMC',
    target: '_blank',
  },
  {
    link: '/#inscricao',
    label: 'Inscreva-se',
    target: '_self',
  },
];

export function HeaderResponsive(): ReactElement {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[2].link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <Anchor
      key={link.label}
      href={link.link}
      target={link.target}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={() => {
        setActive(link.link);
        close();
      }}
    >
      {link.label}
    </Anchor>
  ));

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <Title order={3} transform="uppercase" italic>
          <Center>
            <img src={ppvicon} alt="Pilotando Para Vida" height={36} />
            <Space w="xs" />
            Pilotando Para
            {' '}
            <TextPPV text="Vida" />
          </Center>
        </Title>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="scale-y" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
