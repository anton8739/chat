import React from "react";
import LoginForm from "./LoginForm/LoginForm";
import style from './LoginForm.module.css';
import {connect} from "react-redux";
import {setErrorMessage} from "../../redux/redusers/AuthReducer";
import RegistrationForm from "./RegistrationForm/RegistrationForm";

let mapStateToProps = (state: any) => {
    return {
        errorMessage: state.auth.errorMessage
    }
}
const Login = (props: any) => {


    const [state, setState] = React.useState({
        opemed: false
    })

    const setRegistrationFormOpened = () => {
       setState({
           opemed: true
       })
    }
    return (
        <div>
            <div className={style.h1}>Добро пожаловать в чат!</div>
            <div className={style.h2}>Авторизируйтесь, чтобы продолжить</div>
            <div className={style.logForm}>
                <LoginForm/>
                <div className={style.authError}>{props.errorMessage}</div>
            </div>
            <div>
                {!state.opemed ? <div onClick={() => {
                    setRegistrationFormOpened()
                }} className={style.btnReg}>
                    Зарегистрироваться
                </div> :  <div className={style.logForm}>
                    <RegistrationForm/>
                </div>}

            </div>

        </div>
    )
}

export default connect(mapStateToProps, {setErrorMessage})(Login);