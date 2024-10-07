import { Client, Account,Databases} from 'appwrite';

export const client = new Client();
console.log(import.meta.env.VITE_APPWRITE_URL)
export const databases =new Databases(client)
client
    .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); 

export const account = new Account(client);





export { ID,Permission } from "appwrite";
