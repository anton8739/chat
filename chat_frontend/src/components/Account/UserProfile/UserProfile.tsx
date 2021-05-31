import React from "react";
import { connect } from "react-redux";
import img from '../../../static/img/noPhoto.png';
import style from './UserProfile.module.css';
import {logOut, setLastVisitTime} from "../../../redux/redusers/AuthReducer";
import Cookies from "universal-cookie";
let cookies = new Cookies()
let mapStateToProps = (state : any) => {
    return {
        user: state.auth.user,
        unreadNumber: state.account.unreadNumber
    }
}

const UserProfile = (props:any) => {



    let logout = () => {

        props.logOut();
    }

    return (
        <div className={style.profile}>
            <img className={style.img} src={!props.user.img ? img : props.user.img}/>
            <div className={style.username}>{`${props.user.username} ${props.user.userSurname}`} </div>
            <div onClick={()=> logout()} className={style.btnLogOut}>Выйти из профиля</div>
            <div className={style.menu}>
                <div>
                    <span className={style.link}>Всего чатов</span>
                    <span className={style.counter}>{props.numberOfChats}</span>
                </div>
                <div>
                    <span className={style.link}>Непрочитанных сообщений</span>
                    <span className={style.counter}>{props.unreadNumber}</span>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, {setLastVisitTime})(UserProfile);