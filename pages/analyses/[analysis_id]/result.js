import { Box, Button, Divider, Stack } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import Typography from '../../../src/modules/components/Typography';
import defineClassificacao from '../../../src/modules/defineClassificacao';
import withRoot from '../../../src/modules/withRoot';
import api from '../../../src/utils/axiosClient';
import { useReactToPrint } from 'react-to-print';

const AnalysisResult = () => {
  const router = useRouter();
  const { analysis_id } = router.query;
  const [result, setResult] = useState(null);
  const [token, setToken] = useState('');
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (typeof window !== 'undefined') {
    if (!token) {
      setToken(window.localStorage.getItem('token'));
    }
  }

  useEffect(() => {
    api
      .get(`/analyses/${analysis_id}/result`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setResult(response.data);
      })
      .catch((err) => {
        console.log(err);
        router.push(`/enterprises`);
      });
  }, [token, router, analysis_id, setResult]);

  const createAnalysis = () => {
    api
      .post(
        `/enterprises/${result.enterprise.id}/analyses`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((response) => {
        router.push(
          `/analyses/${response.data['analysis_id']}/enterprise/${result.enterprise.id}`,
        );
      })
      .catch((err) => {
        console.log(err);
        router.push(`/enterprises`);
      });
  };

  return (
    <Box>
      <Head>
        <title>EPIC - Resultado da análise</title>
      </Head>
      <Stack m={4} spacing={2} direction="row">
        <Button variant="contained" href="/enterprise/create">
          Voltar
        </Button>
        <Button variant="contained" onClick={createAnalysis}>
          Nova análise
        </Button>
        <Button variant="contained" onClick={handlePrint}>
          Imprimir análise
        </Button>
      </Stack>
      <Stack m={4} direction="column" ref={componentRef}>
        <Typography variant="h4">
          Resultado da Análise de Segurança e de Não Conformidade
        </Typography>
        <Typography
          my={3}
          variant="h6"
        >{`Empresa: ${result?.enterprise.name.replace(/^\w/, (c) =>
          c.toUpperCase(),
        )}`}</Typography>
        <Divider sx={{ borderBottomWidth: 2 }} />
        <Typography my={3} variant="h6">
          Respostas:
        </Typography>
        {result?.enterprise.answers.map((answer, index) => {
          return (
            <Typography my={1}>
              {`Pergunta ${index}: ${answer ? 'Sim' : 'Não'}`}
            </Typography>
          );
        })}
        <Typography my={3} variant="h6">{`Índice de segurança da empresa: ${
          result?.enterprise.index
        } --- Classificação: ${defineClassificacao(
          result?.enterprise.index,
        )}`}</Typography>
        <Divider sx={{ borderBottomWidth: 2 }} />
        <Typography variant="h6" mt={3} mb={2}>
          {'Índice de não conformidade com a LGPD:'}
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
