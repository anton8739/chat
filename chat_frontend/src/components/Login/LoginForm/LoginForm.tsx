import React from "react";
import style from './LoginForm.module.css'
import {Field, formValueSelector, reduxForm} from "redux-form";
import {Input} from "../../common/FormControl/FormControl";
import {maxLength20, required} from "../../../redux/formValidators/validator";
import { connect } from "react-redux";
import {authorizateUser} from "../../../redux/redusers/AuthReducer";
import { IfLogInedHoc } from "./IfLogInedHoc";
const selector = formValueSelector('login');

let mapStateToProps = (state:any) => {
    return {
        login: selector(state, 'login'),
        password: selector(state, 'password')
    }
}

const LoginForm = (props:any) => {

    let login:any =React.useRef();
    let password:any =React.useRef();
    let handleSubmit = (event:any) => {
        event.preventDefault();
        if (login.current.props._reduxForm.valid && password.current.props._reduxForm.valid){
            console.log(props.login+" "+ props.password)
            props.authorizateUser(props.login, props.password)
        } else  {
            console.log("err")
        }
    }

    return (

            <form  className={style.loginForm} onSubmit={handleSubmit}>
                <Field ref={login} name="login" component={Input} type="text" placeholder="login"
                       validate={[required,maxLength20]}
                       errorClass={style.error}
                       textClass={style.text}
                       formControlClass={style.formControl}/>
                <Field ref={password} name="password" component={Input} type="password" placeholder="Пароль"
                       validate={[required,maxLength20]}
                       errorClass={style.error}
                       textClass={style.text}
                       formControlClass={style.formControl}/>
                <input type="submit" className={style.btnSubmit} value="Войти"></input>
            </form>

    )
}

export default IfLogInedHoc(connect(mapStateToProps, {authorizateUser})(reduxForm<{}, any>({
    form: 'login'
})(LoginForm)));