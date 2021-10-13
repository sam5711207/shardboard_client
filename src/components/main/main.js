import React, { useState } from 'react';
import Members from '../members/members';
import Canvas from '../canvas/canvas';
import Title from '../header/title';


function Main() {
  return (
    <>
    <div className="d-flex justify-content-between">
      <div>
      <Title /> 
      </div>
  <div>
  <Canvas />
  </div>
  <div>
  <Members/>
  </div>
  </div>
  </>);
}

export default Main;