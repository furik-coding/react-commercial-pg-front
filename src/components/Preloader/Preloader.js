import React from 'react';
import { Spin } from 'antd';

const Preloader = ({ size = 'small', delay = 500 }) => {
  return (
    <Spin
      size={size}
      delay={delay}
    />
  )
};

export default Preloader;
