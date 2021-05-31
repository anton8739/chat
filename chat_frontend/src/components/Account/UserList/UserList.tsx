import React from "react";
import style from './UserList.module.css'
import User from "./User/User";
import { connect } from "react-redux";
import {setUnRead} from "../../../redux/redusers/AccountReducer";
import AddDialog from "../AddDialog/AddDialog";

let mapStateToProps = (state:any) => {
    return {
        unReadedDialogsId : state.account.unReadedDialogsId,
        unreadNumber: state.account.unreadNumber
    }
}

const UserList = (props:any) => {
    console.log(props.unReadedDialogsId.toString());
    let  dialogs = props.dialogs
            .sort((a:any,b:any)=> {
                if( new Date(a.messages.time) < new Date(b.messages.time)) {
                    return 1;
                } else {
                    return -1;
                }
            })
            .slice(0,props.onPage*props.pageNumber)
            .map((dialog: any) => <User dialog={dialog} setUnRead={props.setUnRead} unReadedDialogsId={props.unReadedDialogsId}/>)
    if (dialogs.length == 0) {
        dialogs =  <div className={style.noDialogs}>Нет диалогов</div>
    }
    return (
        <div>
            <div className={style.list}>
                {dialogs}

            </div>
        </div>
    )
}

export default connect(mapStateToProps, {setUnRead})(UserList);