import React from 'react';
import { connect } from 'react-redux';
// @ts-ignore
import SockJsClient from 'react-stomp-with-headers';
import {messageNotification, pushMessage} from "../redux/redusers/DialogReducer";
import Cookies from 'universal-cookie';
import {setLastVisitTime} from "../redux/redusers/AuthReducer";
import {getDialogList, setNumberOfUnReaded, setUnRead} from "../redux/redusers/AccountReducer";
const  {REACT_APP_API_URL} =process.env;
const cookies: Cookies = new Cookies();

let mapStateToProps = (state:any) => {
    return {
        user : state.auth.user,
        unReadedDialogsId: state.account.unReadedDialogsId,
        unreadNumber: state.account.unreadNumber
    }
}
type InitState = {
    clientConnected: boolean,
}


type Message = {
    userId :number,
    dialogId:number,
    username : string,
    message :string,
    time : Date
}

const SampleComponent = (props:any) => {
    let stockClientRef:any=React.useRef();
    const [state, setState] =React.useState<InitState>({
        clientConnected: false

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


    const sendMessage = () => {

        stockClientRef.current.sendMessage(`/app/account/${props.user.id}`, "asdasd");
    }
    const  onMessageReceive = (msg:Message,  topic:string) => {

        props.setLastVisitTime(cookies.get('loginedUser').token);
        props.getDialogList(props.user.id);
        if(!props.unReadedDialogsId.includes(msg.dialogId)){
           /* props.setUnRead(msg.dialogId)
            props.setNumberOfUnReaded(props.unreadNumber+1);*/
        }


    }
    const onDisconnect = () => {
        setState({...state, clientConnected: false })
    }
        return (
            <div>
                <SockJsClient url={`http://${REACT_APP_API_URL}:8080/ws`} topics={[`/topic/account/${props.user.id}`]}
                              onConnect={ () => { setState({...state, clientConnected: true }) } }
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

export default connect(mapStateToProps, {setUnRead,setLastVisitTime,setNumberOfUnReaded,getDialogList})(SampleComponent);