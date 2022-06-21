import React from 'react';
import AnalysisComponent from '../components/AnalysisComponent';

const mock = [
  {
    name: 'Análise 1',
    answer: '[1,3, 4, 3, 1]',
  },
  {
    name: 'Análise 2',
    answer: '[2, 3, 1, 7]',
  },
  {
    name: 'Análise 3',
    answer: '[2, 3, 1, 7]',
  },
  {
    name: 'Análise 4',
    answer: '[2, 3, 1, 7]',
  },
];
const Analyses = () => {
  return (
    <div>
      <div className="m-4">
        <button type="button" className="btn btn-info">
          Realizar uma análise
        </button>
      </div>
      <div className="row m-3">
        {mock.map((analize, index) => {
          return (
            <AnalysisComponent
              key={index}
              name={analize?.name}
              answer={analize?.answer}
              id={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Analyses;
