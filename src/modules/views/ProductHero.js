import { Box } from '@mui/material';
import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundColor: '#005691', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <Typography color="inherit" align="center" variant="h3">
        Análise de conformidade com a LGPD
      </Typography>
      <Typography color="inherit" align="center" variant="h4" marked="center">
        para Processos e Informações de Empresas
      </Typography>
      <Box
        component="img"
        sx={{
          mt: 4,
          height: 200,
          width: 350,
        }}
        src={'/epic-logo.png'}
        alt={'Logo EPIC'}
      ></Box>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: 4 }}
      >
        Uma análise simples e gratuita para auxiliar sua empresa a estar em
        confirmadade com a LGPD.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/register"
        sx={{ minWidth: 200 }}
      >
        Faça sua análise
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Descubra agora
      </Typography>
    </ProductHeroLayout>
  );
}
