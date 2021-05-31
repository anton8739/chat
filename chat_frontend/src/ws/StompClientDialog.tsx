import React from 'react';
import { connect } from 'react-redux';
// @ts-ignore
import SockJsClient from 'react-stomp-with-headers';
import {markDialogAsDeliverd, messageNotification, pushMessage} from "../redux/redusers/DialogReducer";
import Cookies from 'universal-cookie';
import {setLastVisitTime} from "../redux/redusers/AuthReducer";
const  {REACT_APP_API_URL} =process.env;
const cookies: Cookies = new Cookies();

let mapStateToProps = (state:any) => {
    return {
        newMessage: state.dialog.newMessage,
        currentDialogId : state.dialog.currentDialogId,
        currentUserId : state.auth.user.id
    }
}
type InitState = {
    clientConnected: boolean,
    newMessage : Message
}

type Message = {
    userId :number
    username : string,
    message :string,
    time : Date
}

const SampleComponent = (props:any) => {
    let stockClientRef:any=React.useRef();
    const [state, setState] =React.useState<InitState>({
        clientConnected: false,
        newMessage : props.newMessage
    });


    const  handleWindowClose = (event:any) =>{
        event.preventDefault();
        onDisconnect()
        event.returnValue = '';

    }
    React.useEffect(()=> {
        window.addEventListener('beforeunload', handleWindowClose)
        return () => {
            window.removeEventListener('beforeunload', handleWindowClose)
        }
    },[])
    const sendMessage = (msg:Message) => {
        console.log("---");
        console.log(stockClientRef.current)
        console.log(props.currentDialogId);
        stockClientRef.current.sendMessage(`/app/chat/${props.currentDialogId}`, JSON.stringify(msg));
    }
    const  onMessageReceive = (msg:Message,  topic:string) => {
        props.markDialogAsDeliverd(props.currentDialogId, props.currentUserId);
        props.pushMessage(msg)
        props.setLastVisitTime(cookies.get('loginedUser').token);
        props.messageNotification(true);

        console.log(msg);
    }
    const  onConnect = () => {
        props.markDialogAsDeliverd(props.currentDialogId, props.currentUserId);
        setState({...state, clientConnected: true })
    }
    const onDisconnect = () => {

        setState({...state, clientConnected: false })
    }
    React.useEffect(()=> {
        if (props.newMessage != null && JSON.stringify(props.newMessage)!==JSON.stringify(state.newMessage) ){
            setState({...state, newMessage: props.newMessage})
            sendMessage(props.newMessage)
        }

    })
        return (
            <div>
                <SockJsClient url={`http://${REACT_APP_API_URL}:8080/ws`} topics={[`/topic/chat/${props.currentDialogId}`]}
                              onConnect={ () => onConnect() }
                              onMessage={ onMessageReceive}

                              headers={
                                  {
                                      'Authorization': cookies.get('loginedUser').token
                                  }
                              }

                              onDisconnect={ () => onDisconnect() }
                              ref={ stockClientRef}
                              debug={true }/>
            </div>
        );
}

export default connect(mapStateToProps, {pushMessage,messageNotification,setLastVisitTime, markDialogAsDeliverd})(SampleComponent);