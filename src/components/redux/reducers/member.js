import produce from "immer";
import createReducer from "./reducerUtils";

const initalStaste = {
  name: "",
  members: [],
  MemberLines: [],
  lines: [],
  update: true,
  nameToVisible: "",
  memberColor:""
};

const contacts = {
  setName(state, action) {
    state.name = action.payload;
  },
  setLines(state, action) {
    state.lines = action.payload;
  },
  setLinesDisable(state, action) {
    state.update = !state.update;
    state.nameToVisible = action.payload;
  },
  setMembers(state, action) {
    state.members = action.payload;
  },
  setDisableMember(state, action) {
    state.members.find((member) => {
      if (member.name === action.payload){ 
        member.isDisable = !member.isDisable;
      if(member.isDisable){
      state.memberColor = "gray"
      }
     else{
      state.memberColor = "white"
     }
     }
       } );
  },
};

export default produce(
  (state, action) => createReducer(state, action, contacts),
  initalStaste
);
