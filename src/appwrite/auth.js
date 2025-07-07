import conf from "../conf/conf";

import { Client,Account,ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({email,password,name}){
        try{
            const userAccount =await this.account.create(ID.unique(),email,password,name)
            if(userAccount){
                // call another method
                return this.login({email,password})
            }
        }
        catch(error){
            console.log(error)
            throw error
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailSession(email,password)
        }
        catch(error){
            console.log(error)
        }
    }

    async getCurrentUser() {
        try {
          return await this.account.get(); // works only if logged in
        } catch (error) {
          console.log("No active session or unauthorized:", error.message);
          return null;
        }
      }

    async logout(){
        try{
            return await this.account.deleteSessions()
        }
        catch(error){
            console.log(error)
        }
    }
}

const authService = new AuthService(); // we have defined a object here only


export default authService

// what is a Client ? - A Client connects your app to the appwrite backend 
// why we have created a constructor class ? - this part connects your app to the appwrite backend using Project URL and Project ID using environment variables 
// Next we have create Features / Methods 
// like createAccount() , Login () , Logout () , signout() , getcurrentuser()

// const authService = new AuthService 
// export default authService 
// this one creates a ready to use Object of yr AuthService so u can import this and use it in yr app easily 
 