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
              <Typography variant="h5">
                {'EPIC é uma ferramenta desenvolvida para auxiliar empresas '}
                {'de pequeno e médio porte '}
                {'a mapear seus processos e informações, '}
                {'a fim de ampliar o nível de segurança desses dados. '}
              </Typography>
              <Typography variant="h5" mt={1.5}>
                {
                  'Através de um cadastro simples e rápido e das respostas de questões objetivas relacionas à segurança e à Lei Geral de Proteção de Dados (LGPD) '
                }
                {'o usuário terá acesso gratuito à um relatório '}
                {
                  'que irá auxiliá-lo na identifição da conformidade e no processo de adequação à Lei.'
                }
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default About;
