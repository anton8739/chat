import React from 'react';
import {connect} from 'react-redux';
import {messageNotification} from "../../../redux/redusers/DialogReducer";
// @ts-ignore
import notification_sound from '../../../static/mp3/notification_sound.mp3';

let mapStateToProps = (state: any) => {
    return {
        played: state.dialog.message_notification_played
    }
}
const NotificationAudio = (props: any) => {
    let audio: any = React.useRef();
    if (props.played) {
        console.log(audio.current);
        audio.current.play()
        setTimeout(() => {
            audio.current.pause();
            audio.current.currentTime = 0;

            props.messageNotification(false)
        }, 1000)
    }


    return (
        <div>
            <audio ref={audio} src={notification_sound}/>
        </div>
    )
}

export default connect(mapStateToProps, {messageNotification})(NotificationAudio);