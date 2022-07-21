import * as React from 'react';
import { Box, Grid, Container, Typography } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function About() {
  return (
    <Box
      component="section"
      id="about"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
        <Grid container justifyContent={'center'} spacing={5}>
          <Grid item xs={12}>
            <Box sx={item}>
              <SecurityIcon fontSize="large" />
              <Typography variant="h6" sx={{ my: 5 }}>
                Sobre o projeto
              </Typography>
              <Typography align="center" variant="h5">
                No Brasil a Lei Geral de Proteção de Dados (LGPD), em vigor
                desde agosto de 2020, dispõe sobre o tratamento de dados
                pessoais, inclusive nos meios digitais, por pessoa natural ou
                por pessoa jurídica de direito público ou privado, com o
                objetivo de proteger os direitos fundamentais de liberdade e de
                privacidade e o livre desenvolvimento da personalidade da pessoa
                natural. Por ser uma lei recente as empresas ainda estão em
                adaptação, tornando-se necessários meios eficazes para
                disseminação do conhecimento da mesma e sua aplicabilidade.
              </Typography>
              <Typography align="center" variant="h5" mt={2}>
                As consequências da não conformidade podem variar desde multas
                até a proibição parcial ou total do exercício de atividades
                relacionadas a tratamento de dados.
              </Typography>
              <Typography align="center" variant="h5" mt={2}>
                EPIC é uma ferramenta desenvolvida para auxiliar empresas de
                pequeno e médio porte a mapear seus processos e informações, a
                fim de ampliar o nível de segurança desses dados. Através de um
                cadastro simples e rápido e das respostas de questões objetivas
                que consideram os requisitos mínimos de Segurança da Informação
                e, também, os principais pontos da LGPD sobre as etapas de
                tratamento de dados de acordo com a estrutura da empresa, o
                usuário terá acesso gratuito a um relatório que irá auxiliá-lo
                na identificação da não conformidade e no processo de adequação
                à lei.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default About;
