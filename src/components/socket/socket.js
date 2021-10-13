import socketIOClient from "socket.io-client";
import  keys  from '../../config/keys';
import { actions } from "../redux/actions/actions";
import store from '../redux/store'



export const socketRef = socketIOClient.connect(keys.API_URL_SOCKET);

// const tryReconnect = function () {
//     if (socketRef?.socket?.connected === false && socketRef.socket?.connecting === false) {
//         let hangouts = [];
//         store?.getState().channelsReducer.tabs.forEach(tab => {
//             tab.hangouts.forEach(hangout => hangouts.push(hangout.hangout?._id))
//         });
//         console.log("connect again!!!!!!!!");
//         store?.dispatch(actions.setConnect(false));
//         socketRef.socket.reconnect(hangouts, userName);
//     }
// }

// let intervalID = setInterval(tryReconnect, 2000);
// let userName = store?.getState().userReducer.userName;

// socketRef.on('connect', (message) => {
//     clearInterval(intervalID);
// });

socketRef.on('disconnect', (disconnect) => {
    store?.dispatch(actions.setConnect(false));
    console.log("disconnect", disconnect);
    // intervalID = setInterval(tryReconnect, 2000);
});