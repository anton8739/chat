import * as axios from "axios/index";
const  {REACT_APP_API_URL} =process.env;
const instance = axios.create({
    baseURL : `http://${REACT_APP_API_URL}:8080/app/`
})
export const  DialogAPI = {
    getMessagesByDialogId(id,page,headers){
        return instance.get(`message/getMessageListByDialogId/${id}/${page}`,{
            headers: headers
        });
    },
    createDialog(userId, partnerId,headers) {
        return instance.post(`dialog/create`,
            {
                userId: userId,
                partnerId: partnerId
            }, {
                headers: headers
            });
    },
    getPartnerInfo(dialogId,currentUserId,headers){
        return instance.get(`dialog/getPartnerByDialogId/${dialogId}/${currentUserId}`,{
            headers: headers
        });
    },
    markDialogAsDeliverd (dialogId,currentUserId,headers){
        return instance.get(`dialog/markDialogAsDeliverd/${dialogId}/${currentUserId}`,{
            headers: headers
        });
    }
}