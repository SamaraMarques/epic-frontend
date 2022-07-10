import React, { useEffect, useState } from 'react';
import { Form, FormSpy } from 'react-final-form';
import { Box } from '@mui/material';
import AppForm from '../modules/views/AppForm';
import FormButton from '../modules/form/FormButton';
import FormFeedback from '../modules/form/FormFeedback';
import withRoot from '../modules/withRoot';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import EnterpriseQuestion from '../components/EnterpriseQuestion';
import Typography from '../modules/components/Typography';

function EnterpriseQuestions() {
  const { analysis_id, enterprise_id } = useParams();
  const [sent, setSent] = useState(false);
  const [sectors, setSectors] = useState([]);
  const [enterprise, setEnterprise] = useState(null);
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
        navigate(`/enterprises`);
      });
    api
      .get(`/enterprises/${enterprise_id}`)
      .then((response) => setEnterprise(response.data))
      .catch((err) => {
        console.error('Erro ' + err);
      });
  }, [token, setSectors, setEnterprise, enterprise_id, navigate]);

  const sectorsIds = sectors.map((sector) => sector.id);

  const [nextSector, ...otherSectors] = sectorsIds;

  const sectorsWithCommas = otherSectors.join(',');

  const handleSubmit = (event) => {
    setSent(true);

    const api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    });
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
      .post(`/analyses/${analysis_id}/enterprises/${enterprise_id}`, {
        answers: { answers },
      })
      .then((response) => {
        navigate(
          `/analyses/${analysis_id}/sector/${nextSector}?remainingSectors=${sectorsWithCommas}`,
        );
      })
      .catch((err) => {
        console.error('Erro ' + err);
        navigate(`/enterprise/${enterprise_id}/sectors`);
      });
  };

  return (
    <React.Fragment>
      <AppForm>
        <Form onSubmit={handleSubmit} subscription={{ submitting: true }}>
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit2}>
              <Typography variant="h5">
                {enterprise?.name.replace(/^\w/, (c) => c.toUpperCase())}
              </Typography>
              <EnterpriseQuestion
                question="1) Sua empresa gerencia riscos de segurança da informação?"
                id="question-one"
              />
              <EnterpriseQuestion
                question="2) Sua empresa possui controles de entrada para restringir o acesso às instalações a fim de impedir o acesso físico não autorizado?"
                id="question-two"
              />
              <EnterpriseQuestion
                question="3) Sua empresa possui uma política de segurança da informação aprovada que suporta a segurança da informação de acordo com as necessidades do negócio?"
                id="question-three"
              />
              <EnterpriseQuestion
                question="4) Sua empresa possui treinamento regular de conscientização sobre segurança da informação para todos os funcionários?"
                id="question-four"
              />
              <EnterpriseQuestion
                question="5) Sua empresa faz backup rotineiramente dos dados armazenados para ajudar a restaurar as informações em caso de desastre?"
                id="question-five"
              />
              <EnterpriseQuestion
                question="6) Sua empresa gerencia com segurança os colaboradores que trabalham remotamente a partir de suas casas (teletrabalho)?"
                id="question-six"
              />
              <EnterpriseQuestion
                question="7) Sua empresa possui firewalls de limite para proteger os computadores contra ataques externos e ajudar a evitar violações de dados?"
                id="question-seven"
              />
              <EnterpriseQuestion
                question="8) Sua empresa possui defesas anti malware com gestão centralizada para proteger os computadores contra infecções por malware?"
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
