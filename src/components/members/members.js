import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector, useDispatch } from "react-redux";
import { socketRef } from "../socket/socket";
import { actions } from "../redux/actions/actions";

function Members() {
  const dispatch = useDispatch();

  const setMembersToStore = (member) => {
    dispatch(actions.setDisableMember(member.name));
    dispatch(actions.setLinesDisable(member.name));
  };

  socketRef.on("newMember", (arrNames) => {
    dispatch(actions.setMembers(arrNames));
  });

  const members = useSelector((state) => state.member.members);
  const name = useSelector((state) => state.member.name);
  const memberColor = useSelector((state) => state.member.memberColor);

  return (
    <ListGroup as="ul">
      {members.map((member) => {
        if (member.name != name) {
          return (
            <div>
                <ListGroup.Item
                  as="li"
                  style={{ backgroundColor: memberColor, cursor: "pointer" }}
                  onClick={(e) => {
                    setMembersToStore(member);
                  }}
                >
                  {member.name}
                </ListGroup.Item>
            </div>
          );
        }
      })}
    </ListGroup>
  );
}

export default Members;