import React from "react";
import style from './User.module.css';
import { NavLink } from 'react-router-dom'
import { connect } from "react-redux";
import img from '../../../../static/img/noPhoto.png';
let mapStateToProps = (state:any) => {
    return {
        user : state.auth.user
    }
}
const User = (props:any) => {

    const [st, setStyle] = React.useState();
    React.useEffect(()=>{
        if(props.unReadedDialogsId.includes(props.dialog.id)){
            // @ts-ignore
            setStyle(style.unread);
        }
        if(props.dialog.status == "RECEIVED" && props.dialog.last != props.user.id){
            // @ts-ignore
            setStyle(style.unread);
        }
    })


    return (
        <NavLink  to={`/dialog/${props.dialog.id}`} className={`${style.item} ${st} `}>
            <img  className={style.img} src= {!props.dialog.img ? img : props.dialog.img}/>
            <div className={style.user_name}>
                {props.dialog.title}
            </div>
            <div className={`${style.last_message} `}>
                {!props.dialog.messages.message ? 'Нет сообщений ' : props.dialog.messages.message }
            </div>
        </NavLink>
    )
}

export default connect(mapStateToProps, {})(User);