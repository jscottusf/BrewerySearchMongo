import React from 'react';
import './style.css';

function Jumbotron(props) {
  return (
    <div className="jumbotron jumbotron-fluid bg-dark text-white" {...props} />
  );
}

export default Jumbotron;
