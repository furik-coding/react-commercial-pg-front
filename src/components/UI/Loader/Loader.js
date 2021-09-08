import React from "react";
import {Spinner} from "reactstrap";
import "./Loader.css";
import { Spin } from 'antd';

export function Loader() {
  return (
    <div className="overlay">
      <Spinner
        style={{ width: '3rem', height: '3rem' }}
        className="Loader"
        color="primary"
      />
    </div>
  );
};

export function LoadingAntd(props) {
  return <Spin size="large" delay={500}/>
}


