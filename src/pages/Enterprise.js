import React from 'react';
import { useParams } from 'react-router-dom';
import SectorComponent from '../components/SectorComponent';

const mock = [
  {
    name: 'Setor 1',
  },
  {
    name: 'Setor 2',
  },
  {
    name: 'Setor 3',
  },
  {
    name: 'Setor 4',
  },
];
const Enterprise = () => {
  const { enterprise_id } = useParams();

  console.log(process.env);
  return (
    <div>
      <div className="m-4">
        <button type="button" className="btn btn-info mx-2">
          Adicionar Setor
        </button>
        <button type="button" className="btn btn-info mx-2">
          Exibir análises
        </button>
      </div>
      <div className="row m-3">
        {mock.map((enterprise, index) => {
          return (
            <SectorComponent key={index} name={enterprise?.name} id={index} />
          );
        })}
      </div>
    </div>
  );
};

export default Enterprise;
