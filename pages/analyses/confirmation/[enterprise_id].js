import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material';
import withRoot from '../../../src/modules/withRoot';
import Typography from '../../../src/modules/components/Typography';
import { useRouter } from 'next/router';
import Head from 'next/head';
import AppForm from '../../../src/modules/views/AppForm';
import api from '../../../src/utils/axiosClient';
import InfoIcon from '@mui/icons-material/Info';

function ConfirmationQuestion() {
  const router = useRouter();
  const { enterprise_id } = router.query;
  const [firstValue, setFirstValue] = React.useState('1');
  const [secondValue, setSecondValue] = React.useState('1');

  const [token, setToken] = useState('');

  if (typeof window !== 'undefined') {
    if (!token) {
      setToken(window.localStorage.getItem('token'));
    }
  }

  const handleChangeFirst = (event) => {
    setFirstValue(event.target.value);
  };

  const handleChangeSecond = (event) => {
    setSecondValue(event.target.value);
  };

  const createAnalysis = () => {
    api
      .post(
        `/enterprises/${enterprise_id}/analyses`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
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
    <React.Fragment>
      <Head>
        <title>EPIC - Confirmação</title>
      </Head>
      <AppForm>
        <Box>
          <Box m={2}>
            <Typography variant="h5" mb={4}>
              {'Antes de continuar, por favor, responda essas duas perguntas:'}
            </Typography>
            <Typography>
              {
                '1) A empresa realiza tratamento de dados pessoais obtidos no território nacional com o objetivo de oferta ou fornecimento de bens ou serviços?'
              }
            </Typography>
            <Typography align={'justify'} sx={{ fontSize: 14, color: 'gray' }}>
              {
                '(É considerado tratamento de dados as seguintes operações: coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação ou controle da informação, modificação, comunicação,transferência, difusão ou extração, conforme Art. 5º X).'
              }
            </Typography>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              name="first-question"
              value={firstValue}
              onChange={handleChangeFirst}
            >
              <FormControlLabel value="1" control={<Radio />} label="Sim" />
              <FormControlLabel value="0" control={<Radio />} label="Não" />
            </RadioGroup>
          </Box>
          <Box m={2}>
            <Typography>
              {
                '2) O tratamento dos dados é realizado exclusivamente para algum dos fins citados a seguir: jornalísticos, artísticos, acadêmicos, de segurança pública, de defesa nacional, de segurança do Estado e de atividades de investigação e repressão de infrações penais?'
              }
            </Typography>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              name="second-question"
              value={secondValue}
              onChange={handleChangeSecond}
            >
              <FormControlLabel value="1" control={<Radio />} label="Sim" />
              <FormControlLabel value="0" control={<Radio />} label="Não" />
            </RadioGroup>
          </Box>
          {firstValue === '0' && secondValue === '0' && (
            <Stack m={4} spacing={1} direction="row">
              <InfoIcon />
              <Typography>
                {
                  'A LGPD não se aplica à empresa, portanto, caso não deseje, não há necessidade de utilização do questionário'
                }
              </Typography>
            </Stack>
          )}
          <Stack m={2} spacing={2} direction="row">
            <Button variant="contained" href={`/enterprises`}>
              Retornar
            </Button>
            <Button variant="contained" onClick={createAnalysis}>
              Prosseguir
            </Button>
          </Stack>
        </Box>
      </AppForm>
    </React.Fragment>
  );
}

export default withRoot(ConfirmationQuestion);
