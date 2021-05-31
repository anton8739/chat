import React from "react";

import style from './YourMessage.module.css';
import moment from "moment";


const YourMessage = (props:any) => {
    let oldDate = props.message.time;
    let mom = moment(oldDate, "YYYY-MM-DD HH:mm:ss");

    let time = mom.locale('ru').format('LLL');
    return (
        <div className={style.message}>
            <div>
                <div>{props.message.message}</div>
                <div>{time}</div>
            </div>
        </div>
    )
}

export default YourMessage;