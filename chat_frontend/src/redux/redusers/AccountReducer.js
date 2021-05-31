import {UserAPI} from "../../api/UserApi";
import Cookies from "universal-cookie";
import {DialogAPI} from "../../api/DialogApi";
const cookies = new Cookies();

let initializationState = {
    numberOfChats: 0,
    dialogs: [],
    userList : [],
    unReadedDialogsId : [],
    unreadNumber : 0,
    fetching: false
}


let AccountReducer = (state = initializationState, action) => {
    switch (action.type) {
        case 'SET_DIALOGS' :
            return {
                ...state,
                dialogs: action.dialogs
            }
        case 'SET_FETCHING' :
            return {
                ...state,
                fetching: action.fetching
            }
        case 'SET_NUMBER' :
            return {
                ...state,
                numberOfChats: action.numberOfChats
            }
        case 'SET_UNREAD' :
            return  {
                ...state,
                unReadedDialogsId : [...state.unReadedDialogsId, action.unread ]
            }
        case 'SET_NUMBER_OF_UNREADED' :
            return {
                ...state,
                unreadNumber : action.unreadNumber
            }
        case 'SET_USER_LIST' :
            return  {
                ...state,
                userList: action.users
            }
        default :
            return {
                ...state,

            }
    }
}
/*Action*/
export let setDialogs = (dialogs) => {
    return {
        type: 'SET_DIALOGS',
        dialogs: dialogs

    }
}
export let setUserList = (users) => {
    return {
        type: 'SET_USER_LIST',
        users: users

    }
}
export let setNumberOfDialogs = (numberOfChats) => {
    return {
        type: 'SET_NUMBER',
        numberOfChats: numberOfChats

    }
}
export let setFetching = (fetching) => {
    return {
        type: 'SET_FETCHING',
        fetching: fetching

    }
}
export let setUnRead = (unread) => {
    return {
        type: 'SET_UNREAD',
        unread: unread

    }
}
export let setNumberOfUnReaded = (unreadNumber) => {
    return {
        type: 'SET_NUMBER_OF_UNREADED',
        unreadNumber: unreadNumber

    }
}
/*Thunk*/
export let getDialogList = (id) => (dispatch) => {
    let token = cookies.get('loginedUser').token;
    if (token) {
        let headers = {
            'Authorization': token
        }
        dispatch(setFetching(true));
        UserAPI.getDialogListById(id, headers).then(respounse => {
            let dialogs = respounse.data
            let unreadNumber=0;

            dialogs.forEach(dialog => {
                if (dialog.status ==="RECEIVED" && dialog.last != id) {
                    unreadNumber++;
                }
            })
            dispatch(setDialogs(dialogs));

            dispatch(setNumberOfDialogs(dialogs.length));
            dispatch(setNumberOfUnReaded(unreadNumber));
            dispatch(setFetching(false));
        }).catch(err => {
            console.log("err");
            dispatch(setFetching(false));
        })
    } else {
        console.log("errNoTokenInCookies")
    }
}
export let createDialog = (userId,partnerId) => (dispatch) => {
    let token = cookies.get('loginedUser').token;
    if (token) {
        let headers = {
            'Authorization': token
        }
        DialogAPI.createDialog(userId, partnerId, headers).then(respounse => {
            let dialog = respounse.data;
            dispatch(getDialogList(userId))

    }).catch(err => {
    console.log("err");
})
} else {
    console.log("errNoTokenInCookies")
}
}
export let getUserList = () => (dispatch) => {
    let token = cookies.get('loginedUser').token;
    if (token) {
        let headers = {
            'Authorization': token
        }
        UserAPI.getUserList(headers).then(respounse => {
            let users = respounse.data
            console.log(users)
            dispatch(setUserList(users));
        }).catch(err => {
            console.log("err");
        })
    } else {
        console.log("errNoTokenInCookies")
    }
}
export default AccountReducer;