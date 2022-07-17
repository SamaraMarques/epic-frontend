import { Box, Stack } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Typography from '../../../src/modules/components/Typography';
import defineClassificacao from '../../../src/modules/defineClassificacao';
import withRoot from '../../../src/modules/withRoot';

const AnalysisResult = () => {
  const router = useRouter();
  const { analysis_id } = router.query;
  const [result, setResult] = useState(null);
  const [token, setToken] = useState('');

  if (typeof window !== 'undefined') {
    if (!token) {
      setToken(window.localStorage.getItem('token'));
    }
  }

  useEffect(() => {
    const api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    });
    api
      .get(`/analyses/${analysis_id}/result`)
      .then((response) => setResult(response.data))
      .catch((err) => {
        console.log(err);
        router.push(`/enterprises`);
      });
  }, [token, router, analysis_id]);

  return (
    <Box>
      <Stack m={3} direction="column">
        <Typography variant="h5">Resultado da análise</Typography>
        <Typography mt={3}>{`Empresa de nome ${result?.enterprise.name.replace(
          /^\w/,
          (c) => c.toUpperCase(),
        )} apresentou índice de segurança ${
          result?.enterprise.index
        } implementado, considerado ${defineClassificacao(
          result?.enterprise.index,
        )}`}</Typography>
        <Typography variant="h6" mt={3} mb={2}>
          {'Resultados dos cálculos de conformidade dos setores:'}
        </Typography>
        {result?.sectors.map((sector, index) => {
          return (
            <Typography mt={1} key={index}>
              {`Setor ${sector.name.replace(/^\w/, (c) =>
                c.toUpperCase(),
              )} obteve índice final de não conformidade de ${
                sector.finalNCIndex
              } (${defineClassificacao(sector.finalNCIndex)})`}
            </Typography>
          );
        })}
      </Stack>
    </Box>
  );
};

export default withRoot(AnalysisResult);
