import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector, useDispatch } from "react-redux";
import { socketRef } from "../socket/socket";
import { actions } from "../redux/actions/actions";

function Members() {
  const dispatch = useDispatch();

  const setMembersToStore = async(member) => {
   await dispatch(actions.setDisableMember(member.name));
   await dispatch(actions.setLinesDisable(member.name));
  };

  socketRef.on("newMember", (arrNames) => {
    dispatch(actions.setMembers(arrNames));
  });

  const members = useSelector((state) => state.member.members);
  const name = useSelector((state) => state.member.name);

  return (
    <ListGroup as="ul">
      {members.map((member) => {
        if (member.name != name) {
          return (
            <div>
              {" "}
              {member.isDisable ? (
                <ListGroup.Item
                  as="li"
                  style={{ backgroundColor: "gray", cursor: "pointer" }}
                  onClick={(e) => {
                    setMembersToStore(member);
                  }}
                >
                  {member.name}
                </ListGroup.Item>
              ) : (
                <ListGroup.Item
                  as="li"
                  style={{ backgroundColor: "white", cursor: "pointer" }}
                  onClick={(e) => {
                    setMembersToStore(member);
                  }}
                >
                  {member.name}
                </ListGroup.Item>
              )}
            </div>
          );
        }
      })}
    </ListGroup>
  );
}

export default Members;
