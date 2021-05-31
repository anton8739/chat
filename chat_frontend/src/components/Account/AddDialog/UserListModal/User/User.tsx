import React from "react";
import style from './User.module.css';
import img from '../../../../../static/img/noPhoto.png';
import {getDialogList} from "../../../../../redux/redusers/AccountReducer";


const User = (props:any) => {

    let addDialog = () => {
        props.createDialog(props.AuthUser.id, props.user.id)
        props.closeModal()
    }

    return (
        <div onClick={() => {addDialog()}}  className={`${style.item} `}>
            <img  className={style.img} src= {!props.user.img ? img : props.user.img}/>
            <div className={style.user_name}>
                {`${props.user.username} ${props.user.userSurname}`}
            </div>
        </div>
    )
}

export default User;