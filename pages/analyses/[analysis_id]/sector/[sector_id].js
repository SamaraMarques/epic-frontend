import React, { useEffect, useState } from 'react';
import { Form, FormSpy } from 'react-final-form';
import { Box, Divider, Stack } from '@mui/material';
import AppForm from '../../../../src/modules/views/AppForm';
import FormButton from '../../../../src/modules/form/FormButton';
import FormFeedback from '../../../../src/modules/form/FormFeedback';
import withRoot from '../../../../src/modules/withRoot';
import SectorQuestion from '../../../../src/components/SectorQuestion';
import DegreeQuestion from '../../../../src/components/DegreeQuestion';
import Typography from '../../../../src/modules/components/Typography';
import { useRouter } from 'next/router';
import api from '../../../../src/utils/axiosClient';
import Head from 'next/head';
import sectorQuestions from '../../../../src/utils/sectorQuestions';

function SectorQuestions() {
  const router = useRouter();
  const { analysis_id, sector_id } = router.query;
  const [sector, setSector] = useState(null);
  const [token, setToken] = useState('');

  if (typeof window !== 'undefined') {
    if (!token) {
      setToken(window.localStorage.getItem('token'));
    }
  }

  useEffect(() => {
    api
      .get(`/sectors/${sector_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setSector(response.data))
      .catch((err) => {
        console.log(err);
        router.push(`/enterprises`);
      });
  }, [token, setSector, sector_id, router]);

  const sectorsIds = router.query.remainingSectors.split(',');
  const [nextSector, ...otherSectors] = sectorsIds;

  const sectorsWithCommas = otherSectors.join(',');

  const handleSubmit = (event) => {
    const answers = [
      event['question-one'] ?? '1',
      event['question-two'] ?? '1',
      event['question-three'] ?? '1',
      event['question-four'] ?? '1',
      event['question-five'] ?? '1',
      event['question-six'] ?? '1',
      event['question-seven'] ?? '1',
      event['question-eight'] ?? '1',
      event['question-nine'] ?? '1',
      event['question-ten'] ?? '1',
      event['question-eleven'] ?? '1',
    ];

    const data = {
      gci: event['question-gci'] ?? '2',
      gin: event['question-gin'] ?? '2',
      answers: { answers },
    };

    api
      .post(`/analyses/${analysis_id}/sectors/${sector_id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {})
      .catch((err) => {
        console.error('Erro ' + err);
        router.push(`/enterprises`);
      });
    if (!nextSector) {
      router.push(`/analyses/${analysis_id}/result`);
    } else {
      router.push(
        `/analyses/${analysis_id}/sector/${nextSector}?remainingSectors=${sectorsWithCommas}`,
      );
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>EPIC - Questões do setor</title>
      </Head>
      <AppForm>
        <Form onSubmit={handleSubmit} subscription={{ submitting: true }}>
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit2} noValidate>
              <Stack direction="row">
                <Typography variant="h5" mr={1}>{`Sobre o setor`}</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {`${sector?.name.toLowerCase()}`}
                </Typography>
                <Typography variant="h5">:</Typography>
              </Stack>
              <DegreeQuestion
                question="Qual o grau de importância do setor para o negócio?"
                id="question-gin"
                options={['pouco importante', 'importante', 'muito importante']}
              />
              <DegreeQuestion
                question="Qual o grau de criticidade da informação com a qual o setor lida?"
                id="question-gci"
                options={[
                  'pouca criticidade',
                  'criticidade média',
                  'muita criticidade',
                ]}
              />
              <Divider sx={{ borderBottomWidth: 2 }} />

              <SectorQuestion question={sectorQuestions[0]} id="question-one" />
              <SectorQuestion question={sectorQuestions[1]} id="question-two" />
              <SectorQuestion
                question={sectorQuestions[2]}
                id="question-three"
              />
              <SectorQuestion
                question={sectorQuestions[3]}
                id="question-four"
              />
              <SectorQuestion
                question={sectorQuestions[4]}
                id="question-five"
              />
              <SectorQuestion question={sectorQuestions[5]} id="question-six" />
              <SectorQuestion
                question={sectorQuestions[6]}
                id="question-seven"
              />
              <SectorQuestion
                question={sectorQuestions[7]}
                id="question-eight"
              />
              <SectorQuestion
                question={sectorQuestions[8]}
                id="question-nine"
              />
              <SectorQuestion question={sectorQuestions[9]} id="question-ten" />
              <SectorQuestion
                question={sectorQuestions[10]}
                id="question-eleven"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                type="submit"
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting ? 'Carregando…' : 'Avançar'}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
    </React.Fragment>
  );
}

export default withRoot(SectorQuestions);
