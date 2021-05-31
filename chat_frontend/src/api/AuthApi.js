import * as axios from "axios/index";
const  {REACT_APP_API_URL} =process.env;
const instance = axios.create({
    baseURL: `http://${REACT_APP_API_URL}:8080/app/`
})
export const AuthAPI = {
    authorizate(login, password) {
        return instance.post(`auth`,
            {
                login: login,
                password: password});
    },
    registrate(login,password, email, name, surname) {
        return instance.post(`registrate`,
            {
                login: login,
                password: password,
                email :email,
                name :name,
                surname:surname
            });
    },
    getUserByToken(headers){
        return instance.get(`user/getUserInfo`,{
            headers: headers
        });
    },
}