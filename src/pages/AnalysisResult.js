import { Box, Stack, styled } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Typography from '../modules/components/Typography';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const AnalysisResult = () => {
  const { analysis_id } = useParams();

  const [result, setResult] = useState({});
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
      .get(`/analyses/${analysis_id}/result`)
      .then((response) => setResult(response.data))
      .catch((err) => {
        console.log(err);
      });
  }, [token, navigate, analysis_id]);

  return (
    <Box>
      <Stack m={3} direction="column">
        <h1>Resultado da análise</h1>
        <Typography>{JSON.stringify(result)}</Typography>
        <Typography>{`Empresa de nome "${result.enterprise.name}" apresentou índice de segurança ${result.enterprise.index}`}</Typography>
        <Typography>
          {'Resultados dos cálculos de conformidade dos setores:'}
        </Typography>
        {result.sectors.map((sector) => {
          return <Typography>{JSON.stringify(sector)}</Typography>;
        })}
      </Stack>
    </Box>
  );
};

export default AnalysisResult;
