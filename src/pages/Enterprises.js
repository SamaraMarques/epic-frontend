import React from 'react';
import EnterpriseComponent from '../components/EnterpriseComponent';

const mock = [
  {
    name: 'Empresa 1',
  },
  {
    name: 'Empresa 2',
  },
];
const Enterprises = () => {
  return (
    <div>
      <div className="m-4">
        <button type="button" className="btn btn-info">
          Criar Empresa
        </button>
      </div>
      <div className="row m-3">
        {mock.map((enterprise, index) => {
          return (
            <EnterpriseComponent
              key={index}
              name={enterprise?.name}
              id={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Enterprises;
