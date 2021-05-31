import React from "react";

import style from './MessageList.module.css';
import YourMessage from "./YourMessage/YourMessage";
import PartnerMessage from "./PartnerMessage/PartnerMessage";
import NewMessageForm from "./NewMessageForm/NewMessageForm";



const MessageList = (props: any) => {
    let [state, setState] = React.useState({
        btnVisability: true
    })
    let messages;
    let messageList:any =React.useRef();
    React.useEffect(()=> {
        messageList.current.scrollTop =messageList.current.scrollHeight;
    }, [props.messages]);
    React.useEffect(()=> {


         if(props.page == -1) {
             console.log("rrr")
       setState({
           ...state,
           btnVisability: false
       })




   }
    }, [props.page])
    if (!props.messages || !props.messages[0]) {

        messages = "Нет сообщений"
        if (state.btnVisability){
            setState({
                ...state,
                btnVisability: false
            })
        }
    } else {
        console.log("+");
        messages = props.messages.map((message: any) => {
            if (message.userId == props.currnetUserId) {
                return <YourMessage message={message}/>
            } else {
                return <PartnerMessage message={message}/>
            }

        }).reverse()
        if (!state.btnVisability && props.page !=-1){
            setState({
                ...state,
                btnVisability: true
            })
        }
    }

    const nextPage = () => {
        props.nextPage()
    }


    return (
        <div className={style.list}>
            {state.btnVisability ? <div onClick={()=>{nextPage()}} className={style.btn}>
                Показать предыдущие сообщения
            </div> : null}
            <div ref={messageList}className={style.messageList}>
                {messages}
            </div>
            <NewMessageForm />
        </div>
    )
}




export default MessageList;