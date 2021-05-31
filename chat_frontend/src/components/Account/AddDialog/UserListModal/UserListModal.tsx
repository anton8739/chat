import React from 'react';
import ReactDOM from 'react-dom';
import style from './UserListModal.module.css';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import User from "./User/User";
import {createDialog, getDialogList, getUserList} from "../../../../redux/redusers/AccountReducer";


let mapStateToProps = (state: any) => {
    return {
        AuthUser: state.auth.user,
        userList: state.account.userList,
        dialogs: state.account.dialogs
    }
}

Modal.setAppElement('#root')
const UserListModal = (props: any) => {
    React.useEffect(() => {
        if (props.modalIsOpen == true) {
            props.getUserList();
        }

    }, [props.modalIsOpen])

    let users = props.userList.map((user: any) => {
            let flag = false;
            props.dialogs.forEach((dialog: any) => {
                if (user.id === dialog.partnerId) {
                    flag = true;
                    return;
                }

            })
            if (flag) {
                return null;
            } else {
                return <User AuthUser={props.AuthUser} getDialogList={props.getDialogList} createDialog={props.createDialog} closeModal={props.closeModal}
                             user={user}/>
            }

        }
    )
    return (
        <Modal
            isOpen={props.modalIsOpen}
            onAfterOpen={props.afterOpenModal}
            onRequestClose={props.closeModal}
            contentLabel="Example Modal"
        >
            {users}
            <div className={style.btn} onClick={() => props.closeModal()}>close</div>

        </Modal>
    )
}

export default connect(mapStateToProps, {getUserList, createDialog,getDialogList})(UserListModal);