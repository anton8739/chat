import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getUserByToken} from "../redux/redusers/AuthReducer";
import Cookies from "universal-cookie";

const cookies = new Cookies();
export let AuthHoc = (Compoment) => {

    let AuthComponent = (props) => {
        React.useEffect(()=> {
            props.getUserByToken()
        });
            if (!cookies.get('loginedUser')) {
                return <Redirect to="/login"></Redirect>
            } else {
                return <Compoment {...props}/>
            }

    }
    let mapStateToProps = (state) => {
        return {
            logined : state.auth.logined
        }
    }
    return connect (mapStateToProps, {getUserByToken}) (AuthComponent);
}

