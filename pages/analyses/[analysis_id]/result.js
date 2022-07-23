import { Box, Button, Divider, Stack } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import Typography from '../../../src/modules/components/Typography';
import defineClassificacao from '../../../src/modules/defineClassificacao';
import withRoot from '../../../src/modules/withRoot';
import api from '../../../src/utils/axiosClient';
import { useReactToPrint } from 'react-to-print';
import enterpriseQuestions from '../../../src/utils/enterpriseQuestions';
import SectorsResultTable from '../../../src/components/SectorsResultTable';
import SectorsResultDescription from '../../../src/components/SectorsResultDescription';
import CriticalSectorDescription from '../../../src/components/CriticalSectorDescription';

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

  const formattedDate = new Date(result?.created_at).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });

  const criticalSectorIndex = result?.sectors.reduce(
    (previous, current, index, sectors) => {
      return current.finalNCIndex > sectors[previous].finalNCIndex
        ? index
        : previous;
    },
    0,
  );

  return (
    <Box>
      <Head>
        <title>EPIC - Resultado da análise</title>
      </Head>
      <Stack mx={4} mt={4} spacing={2} direction="row">
        <Button variant="contained" href="/enterprises">
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
        <Typography mt={3} mb={2} variant="h6">
          Respostas sobre segurança da informação da empresa:
        </Typography>
        {result?.enterprise.answers.map((answer, index) => {
          return (
            <Stack my={1} direction="row">
              <Typography mr={1} key={index}>
                {`${enterpriseQuestions[index]} `}
              </Typography>
              <Typography sx={{ fontWeight: 700 }}>{`${
                answer === '1'
                  ? 'Sim'
                  : answer === '0'
                  ? 'Não'
                  : 'Não se aplica'
              }`}</Typography>
            </Stack>
          );
        })}
        <Typography mt={3} variant="h6">
          {`Índice de segurança da empresa: ${result?.enterprise.index}`}
        </Typography>

        <Typography mb={3} variant="h6">
          {`Classificação: ${defineClassificacao(result?.enterprise.index)}`}
        </Typography>
        <Divider sx={{ borderBottomWidth: 2, pageBreakAfter: 'always' }} />
        <Typography variant="h6" mt={3} mb={2}>
          {'Índice de não conformidade com a LGPD:'}
        </Typography>
        <SectorsResultTable sectors={result?.sectors} />
        <Divider sx={{ borderBottomWidth: 2 }} />

        {result?.sectors[criticalSectorIndex] && (
          <CriticalSectorDescription
            sector={result?.sectors[criticalSectorIndex]}
          />
        )}
        <Divider sx={{ borderBottomWidth: 2 }} />

        <Typography mt={6} ml={2}>
          {`Data/Horário: ${formattedDate}`}
        </Typography>
      </Stack>
    </Box>
  );
};

export default withRoot(AnalysisResult);
