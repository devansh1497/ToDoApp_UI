import axios from 'axios';

class AuthenticationService{

    executeBasicAuthenticationService(userName, password){
        this.setUpAxiosInterceptor(this.createBasicAuthToken(userName, password));
        return axios.get('http://localhost:8080/basicauth', {
            headers : {
                authorization : this.createBasicAuthToken(userName,password)
            }
        });
    }

    executeJwtAuthenticationService(userName, password){
        return axios.post('http://localhost:8080/authenticate', {
                username : userName,
                password
        }).catch(()=>this.props.history.push("/login"))
    }

    createBasicAuthToken(userName, password){
        return "Basic " + window.btoa(userName + ":" + password);
        
    }

    createJwtToken(token){
        return "Bearer " + token
        
    }

    registerSuccessfulLogin(userName, password){
        sessionStorage.setItem("authenticatedUser",userName);
        this.setUpAxiosInterceptor(this.createBasicAuthToken(userName, password));
    }

    registerSuccessfulLoginForJwt(userName, token){
        sessionStorage.setItem("authenticatedUser",userName);
        this.setUpAxiosInterceptor(this.createJwtToken(token));
    }

    logout(){
        sessionStorage.removeItem("authenticatedUser");
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem("authenticatedUser");
        if(user === null) return false;
        return true;
    }

    findUserName(){
        let user = sessionStorage.getItem("authenticatedUser");
        if(user === null) return '';
        return user;
    }

    setUpAxiosInterceptor(basicAuthHeader){
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()){
                    config.headers.authorization = basicAuthHeader;
                }
                return config; 
            }
        )
    }

}

export default new AuthenticationService()