import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  inscricao: {
    minHeight: 400,
    paddingTop: 200,
    textAlign: 'center',
  },
}));

export default function Enrollment() {
  const { classes } = useStyles();
  return (
    <div id="inscricao" className={classes.inscricao}>
      <p>Olá, ainda não é possível se inscrever por aqui! 😕</p>
    </div>
  );
}
