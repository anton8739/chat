import React from "react";
import { NavLink } from "react-router-dom";
import img from '../../../static/img/noPhoto.png';
import style from './DialogNavBar.module.css';
import moment from "moment";
import { connect } from "react-redux";


const DialogNavBar = (props:any) => {
    let status;
    let oldDate = props.partner.time;
    let time;
    let flag:boolean =false;
    if(oldDate) {
        let mom = moment(oldDate, "YYYY-MM-DD HH:mm:ss");
        time = mom.locale('ru').format('LLL');

        let d1 =Date.now();
        let d2 =Date.parse(oldDate)+1000*60*3;
        if (d1 > d2){
            flag=true;
            status=style.disabled;
        } else {
            flag=false;
            status=style.active;
        }
    } else  {

    }



    return (
        <div className={style.bar}>
            <div className={style.col1}>
                <NavLink to="/account" className={style.btnBack}>
                    Назад
                </NavLink>
            </div>
            <div className={style.col2}>
                <div className={style.userName}>
                    {`${props.partner.username} ${props.partner.userSurname}`}
                </div>
                <div className={style.status}>
                    <span>{!flag ? 'Онлайн': `Последнее посещение : ${time}`}</span>
                    <span className={`${style.statusIcon} + ${status}`}></span>
                </div>
            </div>
            <div className={style.col3}>
                <img className={style.img} src={!props.partner.img ? img: props.partner.img}/>
            </div>
        </div>
    )
}

export default DialogNavBar;