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
  const { classes } = useStyles();

  const [active, setActive] = useState(0);

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <div className={classes.form}>
      <MantineProvider theme={{ ...theme, colorScheme: "light" }}>
        <Stepper active={active} onStepClick={setActive} radius={40}>
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
            />
            <TextInput
              label="E-mail"
              placeholder="jax.teller@gmail.com"
              mt="md"
              required
              classNames={{
                input: classes.input,
                label: classes.inputLabel,
              }}
            />
            <TextInput
              label="Telefone/WhatsApp"
              placeholder="(XX) XXXXX-XXXX"
              mt="md"
              required
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
              defaultValue="curitiba"
              required
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
              description={
                <ScrollArea style={{ height: 60 }}>
                  Pelo presente instrumento autorizo o Projeto Pilotando para
                  Vida, sediado na Rua Frei Nicodemus Grunhoff, 111, sobrado 02
                  - Tingui, Curitiba - PR, 82600-170, a utilizar a minha imagem,
                  voz e/ou declaração escrita em materiais institucionais e
                  publicitários, sem limitação de tempo ou de número de
                  utilizações/exibições, notadamente para toda e qualquer forma
                  de comunicação ao público, em todas as suas modalidades, em
                  destaque: revistas e jornais em geral, site institucional,
                  redes sociais (Facebook, Google+, Instagram, Flickr, etc),
                  materiais de comunicação visual (Banners, faixas, flyers,
                  folders e cartazes), materiais de mídia exterior (Outdoor,
                  painéis externos, front lights), CD (“compact disc”), CD ROM,
                  CD-I (“compact-disc” interativo), “home vídeo”, DVD (“digital
                  vídeo disc”), rádio, radiodifusão, televisão aberta, fechada e
                  por assinatura, sendo certo que o material cujo uso, ora é
                  autorizado, destina-se à produção de obra intelectual
                  organizada e de titularidade exclusiva do Pilotando para Vida,
                  conforme expresso na Lei 9.610/98 (Lei de Direitos Autorais),
                  não cabendo a mim qualquer direito e/ou remuneração, a
                  qualquer tempo e título.
                </ScrollArea>
              }
            >
              <Checkbox value="true" label="Li e concordo" />
            </Checkbox.Group>
            <Checkbox.Group
              mt="md"
              label="Termo de Responsabilidade"
              required
              description={
                <ScrollArea style={{ height: 60 }}>
                  Eu, participante do treinamento “PILOTANDO PARA VIDA”,
                  promovido pelo pelo Lord Riders Moto Clube, declaro
                  expressamente ser responsável pela minha motocicleta,
                  isentando o Lord Riders Moto Clube e o BPTran de quaisquer
                  danos físicos e materiais que possam ocorrer durante a
                  realização das manobras do curso de pilotagem.
                </ScrollArea>
              }
            >
              <Checkbox value="true" label="Li e concordo" />
            </Checkbox.Group>

            <Checkbox.Group
              mt="md"
              label="Termo de Consentimento"
              required
              description={
                <ScrollArea style={{ height: 60 }}>
                  Em conformidade com a Lei nº 13.709/18 - Lei Geral de Proteção
                  de Dados Pessoais (LGPD), com a finalidade de proteger os
                  direitos fundamentais de liberdade, de intimidade, de
                  privacidade e o livre desenvolvimento da personalidade da
                  pessoa natural, este documento tem o objetivo de registrar o
                  CONSENTIMENTO LIVRE, INFORMADO E INEQUÍVOCO, para que seus
                  dados pessoais sejam tratados para a finalidade única e
                  exclusiva de realizar as ações relacionadas ao recebimento da
                  sua inscrição para o curso PILOTANDO PARA VIDA®, o qual será
                  guardada e administrada pelo organizador do curso, LORD RIDERS
                  MOTO CLUBE ® inscrito no CNPJ sob o nº 35.111.444/0001-89. O
                  LORD RIDERS MOTO CLUBE ®, manterá os dados do INSCRITO
                  armazenado em seu banco de dados pelo prazo de 2 anos (dois
                  anos) para organização e validação do inscrito para o curso
                  PILOTANDO PARA VIDA ®. Após o período de 2 anos (dois anos) da
                  assinatura deste Termo de Consentimento, deverá ocorrer o
                  término do tratamento de dados pessoais realizado pelo LORD
                  RIDERS MOTO CLUBE ®, momento em que serão eliminados na sua
                  totalidade do seu banco de dados, ressalvadas as hipóteses em
                  que por obrigações legais e regulatórias, e/ou ainda nas
                  hipóteses previstas no Art. 7º da Lei nº 13.709/18, onde o
                  LORD RIDERS MOTO CLUBE ® deverá mantê-los para a realização de
                  todas as ações relacionadas ao tratamento após o seu término.
                  O LORD RIDERS MOTO CLUBE ® se responsabiliza pela adoção de
                  medidas de segurança, técnicas e administrativas aptas a
                  proteger os dados pessoais de acessos não autorizados e de
                  situações acidentais ou ilícitas de destruição, perda,
                  alteração, comunicação ou qualquer forma de tratamento
                  inadequado ou ilícito. Não havendo possibilidade de uso dos
                  dados compartilhados com outras instituições. O uso dos dados
                  se restringe única e exclusivamente à inscrição do curso
                  PILOTANDO PARA VIDA ® sem possibilidade de compartilhamento
                  para outras inscrições da mesma instituição e/ou de outras
                  instituições. O LORD RIDERS MOTO CLUBE ® poderá ser contatado
                  por meio do correio eletrônico lordridersmc@gmail.com ou
                  pilotandoparavida@gmail.com, sendo este o canal de comunicação
                  ativo que permite que o INSCRITO solicite confirmação da
                  existência de tratamento e livre acesso dos dados pessoais
                  informados, bem como solicitações para correção de dados
                  incompletos, inexatos ou desatualizados, e ainda a
                  possibilidade de revogação deste Termo de Consentimento. O
                  INSCRITO declara ser de sua inteira responsabilidade o
                  conteúdo dos dados nessa inscrição, bem como a veracidade das
                  informações enviadas. * O CANDIDATO ao clicar no ícone “Li e
                  concordo” e em “enviar” a inscrição DECLARA expressamente seu
                  CONSENTIMENTO, dando plena ciência dos direitos e obrigações
                  decorrentes, a fim de que seus dados sejam tratados na forma e
                  finalidade única acima mencionado, declarando ainda ter lido,
                  compreendido e aceitado todos os termos e condições aqui
                  descritos.
                </ScrollArea>
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
