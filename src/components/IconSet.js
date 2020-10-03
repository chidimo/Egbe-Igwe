import React from 'react';
import PropTypes from 'prop-types';

import { IconContext } from 'react-icons';
import { MdCancel } from 'react-icons/md';

export const IconSet = (props) => {
  const { name, color, size, onClick, ...rest } = props;
  let Icon = null;

  switch (name) {
    case 'cancel':
      Icon = MdCancel;
      break;
    default:
      break;
  }

  return (
    <IconContext.Provider value={{ color, size }}>
      <Icon onClick={onClick} {...rest} fill={color} />
    </IconContext.Provider>
  );
};

IconSet.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
};
