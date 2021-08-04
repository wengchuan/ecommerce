import React from 'react';
import Form from "./Form";
import './style.css';
import Detail from "./details"

function index() {
  return (
    <div className="app">
      <div className="child1">
          <Detail />
      </div>
      <div className="child">
          <Form />
      </div>
   </div>
  );
}

export default index;
