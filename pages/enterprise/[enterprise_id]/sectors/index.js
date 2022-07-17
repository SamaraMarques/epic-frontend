import React, { useEffect, useState } from 'react';
import * as axios from 'axios';
import { Box, Button, Stack } from '@mui/material';
import withRoot from '../../../../src/modules/withRoot';
import AppAppBar from '../../../../src/modules/views/AppAppBar';
import { useRouter } from 'next/router';
import SectorComponent from '../../../../src/components/SectorComponent';

const Enterprise = () => {
  const router = useRouter();
  const { enterprise_id } = router.query;
  const [sectors, setSectors] = useState([]);
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
      .get(`/enterprises/${enterprise_id}/sectors`)
      .then((response) => setSectors(response.data))
      .catch((err) => {
        console.log(err);
        router.push('/enterprises');
      });
  }, [token, router, enterprise_id, user, setUser]);

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
