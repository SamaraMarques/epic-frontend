import React, { useEffect, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import withRoot from '../../../../src/modules/withRoot';
import AppAppBar from '../../../../src/modules/views/AppAppBar';
import { useRouter } from 'next/router';
import SectorComponent from '../../../../src/components/SectorComponent';
import api from '../../../../src/utils/axiosClient';

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

    api
      .get(`/enterprises/${enterprise_id}/sectors`, {
        headers: { Authorization: `Bearer ${token}` },
      })
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
