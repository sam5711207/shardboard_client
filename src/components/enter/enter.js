import React, { useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { actions } from '../redux/actions/actions';
import { socketRef } from '../socket/socket';

function Entrance() {
let [name, setName]= useState()
  const history=useHistory();
  const dispatch=useDispatch();

const toSocket = () => {
  socketRef.emit('addMember',name)
//   socketRef.emit('getDraw')
}

  const setNameToStore = (name) => {
    console.log("arrive to enter",name);
    dispatch(actions.setName(name));
    // dispatch(actions.setMembers({name:name,isDisable:false}));
    toSocket()
  }

  const setRoute = () => {
    history.push("/start_drawing")
    setNameToStore(name)
  }
      return(
          <>
          <Modal.Dialog>
  <Modal.Header>
    <Modal.Title>Your Name</Modal.Title>
  </Modal.Header>

  <Modal.Footer>
    <input onChange={(e)=>{setName(e.target.value)}}></input>
    <Button variant="primary" 
    onClick={() => {setRoute()}}
    >Next</Button>
  </Modal.Footer>
</Modal.Dialog>
          </> 
    )  }
     
 

export default Entrance;