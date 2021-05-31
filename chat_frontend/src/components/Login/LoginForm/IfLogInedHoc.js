import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export let IfLogInedHoc = (Compoment) => {

    let CheckLoginComponent = (props) => {
        if ( !cookies.get('loginedUser')) {
            return <Compoment {...props}/>

        } else {
            return <Redirect to="/account"></Redirect>
        }
    }
    let mapStateToProps = (state) => {
        return {
            logined : state.auth.logined
        }
    }
    return connect (mapStateToProps, {}) (CheckLoginComponent);
}


