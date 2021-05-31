import React from "react";
import UserList from "./UserList/UserList";
import style from './Account.module.css';
import UserProfile from "./UserProfile/UserProfile";

import {connect} from "react-redux";
import {getDialogList} from "../../redux/redusers/AccountReducer";
import {AuthHoc} from "../../hoc/authHoc";
import {logOut} from "../../redux/redusers/AuthReducer";
import StompClient from "../../ws/StompClientDialog";
import StompClientAccount from "../../ws/StompClientAccount";
import AddDialog from "./AddDialog/AddDialog";


let mapStateToProps = (state: any) => {
    return {
        numberOfChats: state.account.numberOfChats,
        dialogs: state.account.dialogs,
        fetching: state.account.fetching,
        user : state.auth.user,
        unReadedDialogsId : state.account.unReadedDialogsId
    }
}

const Account = (props: any) => {

    let onPage =2;
    React.useEffect(() => {
        if (props.user.id){
            props.getDialogList(props.user.id)
        }
    },[props.user.id, props.numberOfChats]);
    React.useEffect(()=> {
        if (props.dialogs && props.dialogs.length <= onPage) {
            setState(prevState => {
                return {
                    ...state,
                    btnVisability: false
                }
            })
        } else if (props.dialogs && props.dialogs.length >= onPage) {
            setState(prevState => {
                return {
                    ...state,
                    btnVisability: true
                }
            })
        }
    }, [props.dialogs])

    let [state, setState] = React.useState({
        pageNumber : 1,
        btnVisability : true
    });


    let showMore =()=> {
        if (state.pageNumber <props.numberOfChats/onPage-1){
            setState(prevState => {
                return {
                    ...state,
                    pageNumber : prevState.pageNumber+1
                }
            })
        }
        else {
            setState(prevState => {
                return {
                    ...state,
                    pageNumber : prevState.pageNumber+1,
                    btnVisability: false
                }
            })
        }

    }
    return (
        <div>
            {!props.fetching ?
                <div>
                    <UserProfile numberOfChats={props.numberOfChats} logOut={props.logOut} unReadedDialogsId={props.unReadedDialogsId}/>

                    <div className={style.userList}>
                        <UserList pageNumber={state.pageNumber} onPage={onPage} dialogs={props.dialogs}/>
                        { state.btnVisability ? <div onClick={()=>{showMore()}} className={style.btn}>Показать все</div>: null
                        }
                        <AddDialog/>
                    </div>

                </div> :
                null
            }

            <StompClientAccount />

        </div>
    )
}

export default AuthHoc(connect(mapStateToProps,
    {
        getDialogList, logOut
    }
)(Account));