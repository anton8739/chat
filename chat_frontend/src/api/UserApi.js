import * as axios from "axios/index";
const  {REACT_APP_API_URL} =process.env;
const instance = axios.create({
    baseURL : `http://${REACT_APP_API_URL}:8080/app/`
})

export const  UserAPI = {
    getUserById(id,headers){
        return instance.get(`user/getUserById/${id}`,{
            headers: headers
        });
    },
    getUserList(headers){
        return instance.get(`user/getUserList/`,{
            headers: headers
        });
    },
    getDialogListById(id,headers){
        return instance.get(`user/getDialogList/${id}`,{
            headers: headers
        });
    },

    setLastVisitTime(headers) {
        return instance.post(`user/setLastVisitTime`,
            {},{
                headers: headers
            });
    }
}