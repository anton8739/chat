import React from "react";
import {Field, formValueSelector, reduxForm,reset} from "redux-form";
import style from './NewMessageForm.module.css';
import {Input} from "../../../common/FormControl/FormControl";
import { maxLength20, required} from "../../../../redux/formValidators/validator";
import { connect } from "react-redux";
import {sendMessage} from "../../../../redux/redusers/DialogReducer";
const selector = formValueSelector('newMessage');
let mapStateToprops =(state:any)=>{
    return {
        userId: state.auth.user.id,
        username: 'Anton',
        message: selector(state, 'message')
    }
}
type Message = {
    userId :number
    username : string,
    message :string,
    time :number
}

const NewMessageForm = (props:any) => {

    let message:any =React.useRef();
    let handleSubmit = (event:any) => {
        event.preventDefault();

        if (message.current.props._reduxForm.valid){
            let msg:Message = {
                userId : props.userId,
                username : props.username,
                message : props.message,
                time : new Date().getTime()
            }
            props.sendMessage(msg);
        } else  {
            console.log("err")
        }
        props.reset('newMessage')
    }
    return (
        <div>
            <form  className={style.newMessage} onSubmit={handleSubmit}>
                <Field ref={message} name="message" component={Input} type="text" placeholder="ваше сообщение"
                       validate={[required,maxLength20]}
                       errorClass={style.error}
                       textClass={style.text}
                       formControlClass={style.formControl}/>
                <input type="submit" className={style.btnSubmit} value="Отправить"></input>
            </form>
        </div>

    )
}

export default reduxForm<{}, any>({
    form: 'newMessage'
})(connect(mapStateToprops,{sendMessage,reset})(NewMessageForm));