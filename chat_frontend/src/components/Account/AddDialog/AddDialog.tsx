import React from 'react';
import { connect } from 'react-redux';
import style from './AddDialog.module.css';
import UserListModal from "./UserListModal/UserListModal";
import {getUserList} from "../../../redux/redusers/AccountReducer";

let mapStateToProps =(state:any) => {
    return {

    }
}
const AddDialog = (props:any) => {
   /* React.useEffect(()=> {
        props.getUserList();
    }, [])*/
    const [modalIsOpen,setIsOpen] = React.useState(false);
    const  openModal = () => {
        setIsOpen(true);
    }

    const afterOpenModal= () =>  {


    }

    const closeModal = () => {
        setIsOpen(false);
    }
    return (
        <div>
            <div className={style.createDialog} onClick={()=> openModal()}>
                Создать диалог
            </div>
            <UserListModal modalIsOpen={modalIsOpen}
                           afterOpenModal={afterOpenModal}
                           closeModal={closeModal}
            />
        </div>

    )
}

export default connect(mapStateToProps, {getUserList})(AddDialog);