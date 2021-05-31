import React from 'react'
import style from './RegistrationForm.module.css'
import {Field, formValueSelector, reduxForm} from "redux-form";
import {Input} from "../../common/FormControl/FormControl";
import {maxLength20, required} from "../../../redux/formValidators/validator";
import { connect } from 'react-redux';
import {registrateUser} from "../../../redux/redusers/AuthReducer";
const selector = formValueSelector('registration');


let mapStateToProps = (state:any) => {
    return {
        login: selector(state, 'login'),
        password: selector(state, 'password'),
        email: selector(state, 'email'),
        name: selector(state, 'name'),
        surname: selector(state, 'surname')
    }
}
const RegistrationForm = (props:any) => {

    let login:any =React.useRef();
    let password:any =React.useRef();
    let email:any =React.useRef();
    let name:any =React.useRef();
    let surname:any =React.useRef();
    let handleSubmit = (event:any) => {
        event.preventDefault();
        if (login.current.props._reduxForm.valid &&
            password.current.props._reduxForm.valid &&
            email.current.props._reduxForm.valid &&
            name.current.props._reduxForm.valid &&
            surname.current.props._reduxForm.valid){

            props.registrateUser(props.login,props.password,props.email,props.name,props.surname);
            console.log("done")
        } else  {
            console.log("err")
        }
    }



    return (
        <form  className={style.loginForm} onSubmit={handleSubmit}>

            <Field ref={login} name="login" component={Input} type="text" placeholder="Логин"
                   validate={[required,maxLength20]}
                   errorClass={style.error}
                   textClass={style.text}
                   formControlClass={style.formControl}/>
            <Field ref={password} name="password" component={Input} type="password" placeholder="Пароль"
                   validate={[required,maxLength20]}
                   errorClass={style.error}
                   textClass={style.text}
                   formControlClass={style.formControl}/>
            <Field ref={email} name="email" component={Input} type="text" placeholder="Email"
                   validate={[required,maxLength20]}
                   errorClass={style.error}
                   textClass={style.text}
                   formControlClass={style.formControl}/>
            <Field ref={name} name="name" component={Input} type="text" placeholder="Ваше имя"
                   validate={[required,maxLength20]}
                   errorClass={style.error}
                   textClass={style.text}
                   formControlClass={style.formControl}/>
            <Field ref={surname} name="surname" component={Input} type="text" placeholder="Ваша фамилия"
                   validate={[required,maxLength20]}
                   errorClass={style.error}
                   textClass={style.text}
                   formControlClass={style.formControl}/>
            <input type="submit" className={style.btnSubmit} value="Зарегистрироваться"></input>
        </form>
    )
}

export default connect(mapStateToProps,{registrateUser})(reduxForm<{}, any>({
    form: 'registration'
})(RegistrationForm));