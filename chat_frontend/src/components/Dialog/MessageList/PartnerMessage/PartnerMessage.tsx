import moment from "moment";
import 'moment/locale/ru'
import React from "react";

import style from './PartnerMessage.module.css';


const PartnerMessage = (props:any) => {

    let oldDate = props.message.time;

    let mom = moment(oldDate, "YYYY-MM-DD HH:mm:ss");

    let time = mom.locale('ru').format('LLL');

    return (
        <div className={style.message}>
            <div >
                <div>{props.message.message}</div>
                <div>{time}</div>
            </div>
        </div>
    )
}

export default PartnerMessage;