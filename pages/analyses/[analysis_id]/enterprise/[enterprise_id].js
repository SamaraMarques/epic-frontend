import React, { useEffect, useState } from 'react';
import { Form, FormSpy } from 'react-final-form';
import { Box } from '@mui/material';
import AppForm from '../../../../src/modules/views/AppForm';
import FormButton from '../../../../src/modules/form/FormButton';
import FormFeedback from '../../../../src/modules/form/FormFeedback';
import withRoot from '../../../../src/modules/withRoot';
import EnterpriseQuestion from '../../../../src/components/EnterpriseQuestion';
import Typography from '../../../../src/modules/components/Typography';
import { useRouter } from 'next/router';
import api from '../../../../src/utils/axiosClient';
import Head from 'next/head';
import enterpriseQuestions from '../../../../src/utils/enterpriseQuestions';
import EnterpriseQuestionWithApply from '../../../../src/components/EnterpriseQuestionWithApply';

function EnterpriseQuestions() {
  const router = useRouter();
  const { analysis_id, enterprise_id } = router.query;
  const [sent, setSent] = useState(false);
  const [sectors, setSectors] = useState([]);
  const [enterprise, setEnterprise] = useState(null);
  const [token, setToken] = useState('');

  if (typeof window !== 'undefined') {
    if (!token) {
      setToken(window.localStorage.getItem('token'));
    }
  }

  useEffect(() => {
    api
      .get(`/enterprises/${enterprise_id}/sectors`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setSectors(response.data))
      .catch((err) => {
        console.log(err);
        router.push(`/enterprises`);
      });
    api
      .get(`/enterprises/${enterprise_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setEnterprise(response.data))
      .catch((err) => {
        console.error('Erro ' + err);
      });
  }, [token, setSectors, setEnterprise, enterprise_id, router]);

  const sectorsIds = sectors.map((sector) => sector.id);

  const [nextSector, ...otherSectors] = sectorsIds;

  const sectorsWithCommas = otherSectors.join(',');

  const handleSubmit = (event) => {
    setSent(true);

    const answers = [
      event['question-one'] ?? '1',
      event['question-two'] ?? '1',
      event['question-three'] ?? '1',
      event['question-four'] ?? '1',
      event['question-five'] ?? '1',
      event['question-six'] ?? '1',
      event['question-seven'] ?? '1',
      event['question-eight'] ?? '1',
    ];
    api
      .post(
        `/analyses/${analysis_id}/enterprises/${enterprise_id}`,
        {
          answers: { answers },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((response) => {
        router.push(
          `/analyses/${analysis_id}/sector/${nextSector}?remainingSectors=${sectorsWithCommas}`,
        );
      })
      .catch((err) => {
        console.error('Erro ' + err);
        router.push(`/enterprise/${enterprise_id}/sectors`);
      });
  };

  return (
    <React.Fragment>
      <Head>
        <title>EPIC - Questões da empresa</title>
      </Head>
      <AppForm>
        <Form onSubmit={handleSubmit} subscription={{ submitting: true }}>
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit2}>
              <Typography variant="h5">
                {'Em relação à Segurança da Informação em sua empresa:'}
              </Typography>
              <EnterpriseQuestion
                question={enterpriseQuestions[0]}
                id="question-one"
              />
              <EnterpriseQuestion
                question={enterpriseQuestions[1]}
                id="question-two"
              />
              <EnterpriseQuestion
                question={enterpriseQuestions[2]}
                id="question-three"
              />
              <EnterpriseQuestion
                question={enterpriseQuestions[3]}
                id="question-four"
              />
              <EnterpriseQuestion
                question={enterpriseQuestions[4]}
                id="question-five"
              />
              <EnterpriseQuestionWithApply
                question={enterpriseQuestions[5]}
                id="question-six"
              />
              <EnterpriseQuestion
                question={enterpriseQuestions[6]}
                id="question-seven"
              />
              <EnterpriseQuestion
                question={enterpriseQuestions[7]}
                id="question-eight"
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
                disabled={submitting || sent}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'Carregando…' : 'Avançar'}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
    </React.Fragment>
  );
}

export default withRoot(EnterpriseQuestions);
