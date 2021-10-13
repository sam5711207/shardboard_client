import produce from 'immer'
import createReducer from './reducerUtils'

const initalStaste = {
    name:'',
    members:[],
    MemberLines:[]
}

const contacts = {
     setName(state, action) {
        state.name=action.payload;
        
    },
    setMembers(state, action) {
        state.members.push(action.payload);
    },
    setDisableMember(state, action) {
        console.log("member",action.payload);
        state.members.find((member)=>{
if(member.name===action.payload)
member.isDisable=! member.isDisable;
       });
    },
    setMemberLines(state, action) {
    //    if(state.MemberLines.exsit(action.payload))
    //    {
    //        state.MemberLines.splice(action.payload)
    //    }
    //   else
    //   state.MemberLines.push(action.payload)
    },

}

export default produce((state, action) => createReducer(state, action, contacts), initalStaste);

