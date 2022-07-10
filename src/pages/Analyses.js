import { Box, Button, Stack } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AnalysisComponent from '../components/AnalysisComponent';
import AppAppBar from '../modules/views/AppAppBar';
import withRoot from '../modules/withRoot';

const Analyses = () => {
  const { enterprise_id } = useParams();

  const [analyses, setAnalyses] = useState([]);
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  if (!token) {
    setToken(localStorage.getItem('token'));
  }

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }

    const api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    });
    api
      .get(`/enterprises/${enterprise_id}/analyses`)
      .then((response) => setAnalyses(response.data))
      .catch((err) => {
        console.log(err);
        navigate(`/enterprises`);
      });
  }, [token, navigate, enterprise_id, user, setUser]);

  const createAnalysis = () => {
    const api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    });
    api
      .post(`/enterprises/${enterprise_id}/analyses`)
      .then((response) => {
        navigate(
          `/analyses/${response.data['analysis_id']}/enterprise/${enterprise_id}`,
        );
      })
      .catch((err) => {
        console.log(err);
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
