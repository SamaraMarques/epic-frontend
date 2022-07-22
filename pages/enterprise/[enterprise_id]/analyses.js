import { Box, Button, Stack } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-nextjs-toast';
import AnalysisComponent from '../../../src/components/AnalysisComponent';
import Typography from '../../../src/modules/components/Typography';
import AppAppBar from '../../../src/modules/views/AppAppBar';
import withRoot from '../../../src/modules/withRoot';
import api from '../../../src/utils/axiosClient';

const Analyses = () => {
  const router = useRouter();
  const { enterprise_id } = router.query;

  const [analyses, setAnalyses] = useState([]);
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);

  if (typeof window !== 'undefined') {
    if (!token) {
      setToken(window.localStorage.getItem('token'));
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!user) {
        setUser(JSON.parse(window.localStorage.getItem('user')));
      }
    }

    api
      .get(`/enterprises/${enterprise_id}/analyses`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setAnalyses(response.data))
      .catch((err) => {
        console.log(err);
        router.push(`/enterprises`);
      });
  }, [token, router, enterprise_id, user, setUser]);

  const checkSectors = () => {
    api
      .get(`/enterprises/${enterprise_id}/sectors`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.length) {
          router.push(`/analyses/confirmation/${enterprise_id}`);
        } else {
          toast.notify(
            'Cadastre setores na empresa para poder realizar análises!',
            {
              duration: 5,
              type: 'warn',
              title: 'Erro!',
            },
          );
        }
      })
      .catch((err) => {
        console.log(err);
        router.push(`/enterprises`);
      });
  };

  return (
    <Box>
      <Head>
        <title>EPIC - Análises</title>
      </Head>
      <AppAppBar user={user} />
      <Stack m={4} spacing={2} direction="row">
        <Button variant="contained" href={`/enterprises`}>
          Minhas empresas
        </Button>
        <Button variant="contained" onClick={checkSectors}>
          Nova análise
        </Button>
        <Button
          variant="contained"
          href={`/enterprise/${enterprise_id}/sectors`}
        >
          Setores
        </Button>
        <ToastContainer />
      </Stack>
      <Stack m={3} direction="column">
        {analyses.length ? (
          analyses.map((analisys, index) => {
            return (
              <AnalysisComponent
                key={index}
                id={analisys?.id}
                enterprise_id={analisys?.enterprise_id}
                created_at={analisys?.created_at}
                token={token}
              />
            );
          })
        ) : (
          <Typography ml={4} mt={4}>
            Você não possui nenhuma análise, clique em nova análise para
            começar.
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default withRoot(Analyses);
