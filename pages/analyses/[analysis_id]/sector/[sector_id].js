import React, { useEffect, useState } from 'react';
import { Form, FormSpy } from 'react-final-form';
import { Box } from '@mui/material';
import AppForm from '../../../../src/modules/views/AppForm';
import FormButton from '../../../../src/modules/form/FormButton';
import FormFeedback from '../../../../src/modules/form/FormFeedback';
import withRoot from '../../../../src/modules/withRoot';
import SectorQuestion from '../../../../src/components/SectorQuestion';
import DegreeQuestion from '../../../../src/components/DegreeQuestion';
import Typography from '../../../../src/modules/components/Typography';
import { useRouter } from 'next/router';
import api from '../../../../src/utils/axiosClient';

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
      <AppForm>
        <Form onSubmit={handleSubmit} subscription={{ submitting: true }}>
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit2} noValidate>
              <Typography variant="h5">
                {sector?.name.replace(/^\w/, (c) => c.toUpperCase())}
              </Typography>
              <DegreeQuestion
                question="Qual o grau de criticidade da informação com a qual o setor lida?"
                id="question-gci"
              />
              <DegreeQuestion
                question="Qual o grau de importância do setor para o negócio?"
                id="question-gin"
              />
              <SectorQuestion
                question="1) obtenção de dados pessoais é realizada por meio de termo de consentimento?"
                id="question-one"
              />
              <SectorQuestion
                question="2) Em caso de obtenção de dados pessoais de menores de idade é realizada por meio de termo de consentimento dado pelos pais ou responsável legal?"
                id="question-two"
              />
              <SectorQuestion
                question="3) São estabelecidos acordos escritos que garantem a proteção e a segurança dos dados pessoais com todos terceirizados que processam dados pessoais em seu nome?"
                id="question-three"
              />
              <SectorQuestion
                question="4) O tratamento de dados pessoais sensíveis é realizado de maneira diferenciada dos demais dados pessoais?"
                id="question-four"
              />
              <SectorQuestion
                question="5) Em caso de transferência internacional de dados pessoais é garantido a proteção dos mesmos?"
                id="question-five"
              />
              <SectorQuestion
                question="6) Existe um processo para descartar com segurança dados pessoais que não são mais necessários?"
                id="question-six"
              />
              <SectorQuestion
                question="7) Existe um plano de ação em caso de destruição, perda, alteração ou vazamento de dados?"
                id="question-seven"
              />
              <SectorQuestion
                question="8) É assegurado ao titular dos dados métodos de acesso, correção, eliminação, portabilidade, revogação de consentimento e informações sobre compartilhamento de seus dados?"
                id="question-eight"
              />
              <SectorQuestion
                question="9) É disponibilizado aos titulares documentação com informações quanto a forma que são realizadas as etapas do tratamento dos dados? (conforme Art. 5º X da LGPD)"
                id="question-nine"
              />
              <SectorQuestion
                question="10) São mantidos registros sobre as operações de tratamento de dados realizadas pelos agentes?"
                id="question-ten"
              />
              <SectorQuestion
                question="11) São adotadas medidas de segurança de modo a proteger os dados pessoais de acessos não autorizados ou de qualquer forma de tratamento ilícito?"
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
