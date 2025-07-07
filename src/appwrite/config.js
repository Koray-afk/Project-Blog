import conf from "../conf/conf";
import { Client, ID , Storage , Databases , Query } from "appwrite";

export class Service{
    client = new Client()
    databases;
    bucket;   // this is actually the storage 

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            this.databases= new Databases(this.client)
            this.bucket = new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,userId,status}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,   // Database ID
                conf.appwriteCollectionId,  // Collection ID
                slug,   // Document ID
                {
                    title,
                    content,
                    featuredImage,
                    userId,
                    status
                }

            )
        }
        catch(error){
            console.log("the error in your code is",error)
            throw error
        }
    }

    async updatePost(slug,{title,content,featuredImage,userId,status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    userId,
                    status
                }
            
            )
        }
        catch(error){
            console.log("The error in your code", error)
            return false
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        }
        catch(error){
            console.log("The error in your code",error)
            return false

        }
     
    }

    async getPost(slug){  // if you want to get a single post then do this
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

        }
        catch(error){
            console.log(error)
            throw error
        }
    }

    async getAllPost(queries = [Query.equal("status","active")]){   // we only want those in which status is true 
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        }
        catch(error){
            console.log(error)
            return false
        }
    }

    //File upload service 
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        }
        catch(error){
            console.log("The error in Uploading file is",error)
            return false
        }
    }

    async deleteFile(FileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                FileId
            )
        }
        catch(error){
            console.log("Your file has not been deleted due to",error)
            return false
        }
    }

    getFilePreview(FileId){
      return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        FileId
      )  
    }


}


const service = new Service()
export default service

