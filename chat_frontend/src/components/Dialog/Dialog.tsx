import React from "react";
import {compose} from "redux";

import style from './Dialog.module.css';
import DialogNavBar from "./DialogNavBar/DialogNavBar";
import MessageList from "./MessageList/MessageList";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getMessageList, setCurrentDialogId, setMessages, setPage} from "../../redux/redusers/DialogReducer";
import StompClient from "../../ws/StompClientDialog";
import {AuthHoc} from "../../hoc/authHoc";

let mapStateToProps = (state: any) => {
    return {
        partner: state.dialog.partner,
        messages: state.dialog.messages,
        currnetUserId: state.auth.user.id,
        currentDialogId: state.dialog.currentDialogId,
        page : state.dialog.page
    }
}
const Dialog = (props: any) => {
    React.useEffect(()=> {
        props.setCurrentDialogId(props.match.params.dialogId);
        return () => {
            props.setPage(1)
        }
    },[])

    React.useEffect(() => {
        if(props.currnetUserId && props.currentDialogId && props.page != -1) {
            props.getMessageList(props.match.params.dialogId, props.currnetUserId, props.page)
        } else if (props.page == -1) {
            props.setMessages([]);
        }
    }, [props.page, props.currnetUserId]);
    const nextPage = () => {
        if (props.page != -1) {
            props.setPage(props.page+1);
        }
    }
    return (
        <div>
            <DialogNavBar partner={props.partner}/>
            <MessageList page={props.page} nextPage={nextPage} messages={props.messages} currnetUserId={props.currnetUserId}
                         />
            <StompClient currentDialogId={props.currentDialogId}/>
        </div>
    )
}

export default AuthHoc(withRouter(connect(mapStateToProps, {getMessageList,setCurrentDialogId,setPage,setMessages})(Dialog)));