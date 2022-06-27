import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as axios from 'axios';
import SectorComponent from '../components/SectorComponent';
import { Box, Button, Stack } from '@mui/material';

const Enterprise = () => {
  const { enterprise_id } = useParams();
  const [sectors, setSectors] = useState([]);
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
      .get(`/enterprises/${enterprise_id}/sectors`)
      .then((response) => setSectors(response.data))
      .catch((err) => {
        console.log(err);
        navigate('/enterprises');
      });
  }, [token, navigate, enterprise_id]);
  return (
    <Box>
      <Stack m={2} spacing={2} direction="row">
        <Button
          variant="contained"
          href={`/enterprise/${enterprise_id}/sectors/create`}
        >
          Adicionar Setor
        </Button>
        <Button
          variant="contained"
          href={`/enterprise/${enterprise_id}/analyses`}
        >
          Análises
        </Button>
      </Stack>
      <Stack m={3} spacing={3} direction="column">
        {sectors.map((enterprise, index) => {
          return (
            <SectorComponent key={index} name={enterprise?.name} id={index} />
          );
        })}
      </Stack>
    </Box>
  );
};

export default Enterprise;
