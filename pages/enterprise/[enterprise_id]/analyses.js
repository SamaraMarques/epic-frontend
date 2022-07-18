import { Box, Button, Stack } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import AnalysisComponent from '../../../src/components/AnalysisComponent';
import AppAppBar from '../../../src/modules/views/AppAppBar';
import withRoot from '../../../src/modules/withRoot';

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

    const api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    });
    api
      .get(`/enterprises/${enterprise_id}/analyses`)
      .then((response) => setAnalyses(response.data))
      .catch((err) => {
        console.log(err);
        router.push(`/enterprises`);
      });
  }, [token, router, enterprise_id, user, setUser]);

  const createAnalysis = () => {
    const api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    });
    api
      .post(`/enterprises/${enterprise_id}/analyses`)
      .then((response) => {
        router.push(
          `/analyses/${response.data['analysis_id']}/enterprise/${enterprise_id}`,
        );
      })
      .catch((err) => {
        console.log(err);
        router.push(`/enterprises`);
      });
  };

  return (
    <Box>
      <AppAppBar user={user} />
      <Stack m={4} spacing={2} direction="row">
        <Button variant="contained" href={`/enterprises`}>
          Minhas empresas
        </Button>
        <Button variant="contained" onClick={createAnalysis}>
          Nova análise
        </Button>
        <Button
          variant="contained"
          href={`/enterprise/${enterprise_id}/sectors`}
        >
          Setores
        </Button>
      </Stack>
      <Stack m={3} direction="column">
        {analyses.map((analisys, index) => {
          return (
            <AnalysisComponent
              key={index}
              id={analisys?.id}
              enterprise_id={analisys?.enterprise_id}
              created_at={analisys?.created_at}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default withRoot(Analyses);