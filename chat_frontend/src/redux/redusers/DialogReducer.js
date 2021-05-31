import Cookies from "universal-cookie";
import {DialogAPI} from "../../api/DialogApi";
import {setNumberOfDialogs} from "./AccountReducer";
const cookies = new Cookies();

let initializationState = {
    messages : [],
    page : 1,
    partner : {},
    fetching: false,
    currentDialogId : 1,
    newMessage : null,
    message_notification_played : false
}
let DialogReducer = (state=initializationState, action) => {
    switch (action.type){
        case 'SET_FETCHING_Dialog':
            return {
                ...state,
                fetching: action.fetching
            }
        case 'SET_MESSAGES':
            return {
                ...state,
                messages:  [...state.messages, ...action.messages]
            }

        case 'PUSH_MESSAGE' :
            return {
                ...state,
                messages: [ action.message, ...state.messages]
            }
        case 'SET_PARTNER':
            return {
                ...state,
                partner: action.partner
            }
        case 'SEND_MESSAGE':
            return {
                ...state,
                newMessage: action.newMessage
            }
        case 'MESSAGE_NOTIFICATION' :

            return {
                ...state,
                message_notification_played : action.played
            }
        case 'SET_CURRENT_DIALOG' :
            return {
                ...state,
                currentDialogId :action.currentDialogId,
                messages : [],
                page : 1,
                partner : {},
            }
        case 'SET_PAGE' :
            return  {
                ...state,
                page: action.page
            }
        default :
            return {
                ...state
            }
    }
}

/*Action*/

export let setFetchingDialog = (fetching) => {
    return {
        type: 'SET_FETCHING_Dialog',
        fetching: fetching

    }
}

export let setCurrentDialogId = (currentDialogId) => {
    return {
        type: 'SET_CURRENT_DIALOG',
        currentDialogId: currentDialogId

    }
}
export let setMessages = (messages) => {
    return {
        type: 'SET_MESSAGES',
        messages: messages

    }
}
export let pushMessage= (message) => {
    return {
        type: 'PUSH_MESSAGE',
        message : message

    }
}
export let setPartner= (partner) => {
    return {
        type: 'SET_PARTNER',
        partner: partner

    }
}
export let sendMessage= (newMessage) => {
    return {
        type: 'SEND_MESSAGE',
        newMessage : newMessage

    }
}
export let messageNotification = (played) => {
    return {
        type: 'MESSAGE_NOTIFICATION',
        played : played

    }
}
export let setPage = (page) => {
    return {
        type: 'SET_PAGE',
        page : page

    }
}
/*Thunk*/
export let getMessageList = (id,currentUserId, page) => (dispatch) => {
    let token = cookies.get('loginedUser').token;
    if (token) {
        let headers = {
            'Authorization': token
        }
        dispatch(setFetchingDialog(true));
        DialogAPI.getMessagesByDialogId(id, page, headers).then(respounse => {
            let messages = respounse.data
            console.log("!" +messages);
           if(!respounse.data) {
               dispatch(setPage(-1));
               dispatch(setFetchingDialog(false));
           } else {
               dispatch(setMessages(messages));
               dispatch(setFetchingDialog(false));
           }

        }).catch(err => {
            console.log("err");
            dispatch(setFetchingDialog(false));
        })
        DialogAPI.getPartnerInfo(id, currentUserId, headers).then(respounse => {
            let partner = respounse.data
            dispatch(setPartner(partner));

        }).catch(err => {
            console.log("err");
        })
    } else {
        console.log("errNoTokenInCookies")
    }
}

export let markDialogAsDeliverd = (dialogId, currentUserId) => (dispatch) => {
    let token = cookies.get('loginedUser').token;
    if (token) {
        let headers = {
            'Authorization': token
        }
        DialogAPI.markDialogAsDeliverd (dialogId,currentUserId, headers).then(respounse => {
            if(respounse.state == 200) {
                console.log("set dialog as deliverd")
            }

        }).catch(err => {
            console.log("err");
        })
    } else {
        console.log("errNoTokenInCookies")
    }
}
export default DialogReducer;