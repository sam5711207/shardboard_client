import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import {useSelector, useDispatch } from 'react-redux';
import { socketRef } from '../socket/socket';
import { actions } from '../redux/actions/actions';


function Members() {
    let isDisable=false;
    const dispatch=useDispatch();
    let [names,setNames]=useState([]);

    const setMembersToStore = (member) => {
        console.log("arrive",member.name);
        dispatch(actions.setDisableMember(member.name))
        // dispatch(actions.setDisableMemberLine(member.name))
        dispatch(actions.setMemberLines(member.name))
      }
    
        
      socketRef.on("newMember",(arrNames)=>{
          console.log(arrNames, "arr")
        setNames(arrNames);

    // dispatch(actions.setMembers({name:name,isDisable:false}));

        // setListMembers([...listMembers,{name}])
        // dispatch(actions.setMeers(name))
        })

//   const [listMembers, setListMembers] = useState([]);
  const members=useSelector((state)=>state.member.members)
  const name=useSelector((state)=>state.member.name)
  
  return ( <ListGroup as="ul">
  {   names.map((member)=>{
      if(member.name!=name){   
      return(
          
         <div> {member.isDisable
        ? <ListGroup.Item as="li" style={{backgroundColor:'gray'}}  onClick={(e)=>{setMembersToStore(member)}} >
        {member.name}
       </ListGroup.Item>

       :<ListGroup.Item as="li" style={{backgroundColor:'white'}}  onClick={(e)=>{setMembersToStore(member)}} >
       {member.name}
      </ListGroup.Item>
    }</div>
        
    ) } })}
</ListGroup>
     
 
    );
  
}

export default Members;
