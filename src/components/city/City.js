import React from 'react';
import { useParams } from 'react-router-dom';

const City = () => {
  const { Name } = useParams();

  return <div>City of {Name}</div>;
};

export default City;
