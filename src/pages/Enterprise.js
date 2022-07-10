import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as axios from 'axios';
import SectorComponent from '../components/SectorComponent';
import { Box, Button, Stack } from '@mui/material';
import withRoot from '../modules/withRoot';
import AppAppBar from '../modules/views/AppAppBar';

const Enterprise = () => {
  const { enterprise_id } = useParams();
  const [sectors, setSectors] = useState([]);
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
      .get(`/enterprises/${enterprise_id}/sectors`)
      .then((response) => setSectors(response.data))
      .catch((err) => {
        console.log(err);
        navigate('/enterprises');
      });
  }, [token, navigate, enterprise_id, user, setUser]);

  return (
    <Box>
      <AppAppBar user={user} />
      <Stack m={4} spacing={2} direction="row">
        <Button variant="contained" href={`/enterprises`}>
          Minhas empresas
        </Button>
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
      <Stack m={3} direction="column">
        {sectors.map((enterprise, index) => {
          return (
            <SectorComponent key={index} name={enterprise?.name} id={index} />
          );
        })}
      </Stack>
    </Box>
  );
};

export default withRoot(Enterprise);
