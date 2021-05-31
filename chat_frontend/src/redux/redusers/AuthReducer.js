import Cookies from 'universal-cookie';
import {AuthAPI} from "../../api/AuthApi";
import {UserAPI} from "../../api/UserApi";
const cookies = new Cookies();

let initializationState = {
    user : {},
    logined : false,
    errorMessage : null,
    fetching: false
}

let AuthReducer = (state = initializationState, action) => {
    switch (action.type) {
        case 'AUTH_USER' :
            return {
                ...state,
                user : action.user
            }
        case 'SET_ERROR_MESSAGE' :
            return {
                ...state,
                errorMessage: action.message
            }
        case 'SET_LOGINED' :
            return  {
                ...state,
                logined :action.logined
            }
        case  'LOG_OUT':
            cookies.remove('loginedUser', { path : '/'});
            return {
                ...state,
                user : {},
                logined : false,
            }
        default :
            return {
                ...state
            }
    }
}

/*Action*/
export let setAuthUser = (user) => {
    return {
        type: 'AUTH_USER',
        user: user

    }
}
export let setLogIned = (logined) => {
    return {
        type: 'SET_LOGINED',
        logined: logined

    }
}
export let setErrorMessage = (message) => {
    return {
        type: 'SET_ERROR_MESSAGE',
        message: message

    }
}
export let setFetching = (value) => {
    return {
        type: 'SET_FETCHING',
        value: value
    }
}
export let logOut = () => {
    return {
        type: 'LOG_OUT',
    }
}
/*Thunk*/
export let authorizateUser = (login,password) => (dispatch) => {
    dispatch(setFetching(true));
    AuthAPI.authorizate(login,password).then(response => {
        cookies.set('loginedUser', {
            token: 'Bearer_' + response.data.token,
        }, {path: '/'});
        let user = {
            id: response.data.id,
            img: response.data.img,
            token: response.data.token,
            userSurname: response.data.userSurname,
            username: response.data.username
        }
        dispatch(setAuthUser(user))
        dispatch(setLogIned(true))
        dispatch(setErrorMessage(null))
        dispatch(setFetching(false));
    }).catch(err => {
        console.log(err.message)
        dispatch(setErrorMessage("Неверный логин или пароль!"))
        dispatch(setFetching(false));
        console.log("errAuth")
    })
}
export let registrateUser = (login,password, email, name, surname) => (dispatch) => {
    dispatch(setFetching(true));

    AuthAPI.registrate(login,password, email, name, surname).then(response => {

        cookies.set('loginedUser', {
            token: 'Bearer_' + response.data.token,
        }, {path: '/'});
        let user = {
            id: response.data.id,
            img: response.data.img,
            token: response.data.token,
            userSurname: response.data.userSurname,
            username: response.data.username
        }
        dispatch(setAuthUser(user))
        dispatch(setLogIned(true))
        dispatch(setFetching(false));
    }).catch(err => {
        dispatch(setFetching(false));
        console.log("errRegistrate")
    })
}
export let getUserByToken = () => (dispatch) => {
    if (cookies.get('loginedUser')) {
        let token = cookies.get('loginedUser').token;
        let headers = {
            'Authorization': token
        }
        AuthAPI.getUserByToken(headers).then(response => {
            let user = {
                id: response.data.id,
                img: response.data.img,
                token: response.data.token,
                time : response.data.time,
                userSurname: response.data.userSurname,
                username: response.data.username
            }
            dispatch(setAuthUser(user))
            dispatch(setLogIned(true))
        }).catch(err => {
            console.log("errAuth")
        })
    } else {
        console.log("errNoTokenInCookies")
    }

}
export let setLastVisitTime = (token) => (dispatch) => {
        let headers = {
            'Authorization': token
        }
        UserAPI.setLastVisitTime(headers).then(response => {
            if (response.status === 200) {
                    console.log("LastVisitTimeSeted")
            }
        }).catch(err => {
            console.log("errSetLastVisitTime")
        })

}
export default AuthReducer;
