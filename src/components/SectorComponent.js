import React from 'react';

const SectorComponent = ({ name, id }) => {
  return (
    <div className="border border-dark border-1 my-2">
      <div className="d-flex flex-row p-2">
        <div className="col-8">
          <p className="h4 m-2">{name}</p>
        </div>
        <div>
          <button type="button" className="btn btn-warning m-1">
            <i className="bi bi-pencil"></i>
          </button>
          <button type="button" className="btn btn-danger m-1">
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectorComponent;
