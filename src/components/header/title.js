import React, { useState } from 'react';
import { useSelector } from 'react-redux'


function Title() {
  const name=useSelector((state)=>state.member.name)
  console.log("mmm", name)
  
  return (
  <><div> 
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <li class="navbar-brand">Hello {name}</li>
  </nav>
  </div>
  </>);
}

export default Title;
