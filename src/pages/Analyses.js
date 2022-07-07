import { Box, Button, Stack } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AnalysisComponent from '../components/AnalysisComponent';

const Analyses = () => {
  const { enterprise_id } = useParams();

  const [analyses, setAnalyses] = useState([]);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  if (!token) {
    setToken(localStorage.getItem('token'));
  }

  useEffect(() => {
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
        navigate(`/enterprises/${enterprise_id}`);
      });
  }, [token, navigate, enterprise_id]);

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
      <Box m={4}>
        <Button variant="contained" onClick={createAnalysis}>
          Nova análise
        </Button>
      </Box>
      <Stack m={3} direction="column">
        {analyses.map((analize, index) => {
          return (
            <AnalysisComponent
              key={index}
              id={analize?.id}
              enterprise_id={analize?.enterprise_id}
              created_at={analize?.created_at}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default Analyses;
