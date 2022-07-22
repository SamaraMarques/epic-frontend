import React, { useEffect, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import withRoot from '../../../../src/modules/withRoot';
import AppAppBar from '../../../../src/modules/views/AppAppBar';
import { useRouter } from 'next/router';
import SectorComponent from '../../../../src/components/SectorComponent';
import api from '../../../../src/utils/axiosClient';
import Head from 'next/head';
import Typography from '../../../../src/modules/components/Typography';

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
      <Head>
        <title>EPIC - Setores</title>
      </Head>
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
        {sectors.length ? (
          sectors.map((sector, index) => {
            return (
              <SectorComponent
                key={index}
                name={sector?.name}
                id={sector?.id}
                enterprise_id={enterprise_id}
                token={token}
              />
            );
          })
        ) : (
          <Typography ml={4} mt={4}>
            Esta empresa não possui nenhum setor cadastrado, clique em adicionar
            setor para cadastrar.
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default withRoot(Enterprise);
