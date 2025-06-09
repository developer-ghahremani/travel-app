import { Account, Client, Databases, Storage } from "appwrite";

const appWriteConfig = {
  endPoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  userCollection: import.meta.env.VITE_APPWRITE_USER_COLLECTION,
  tripCollection: import.meta.env.VITE_APPWRITE_TRIP_COLLECTION,
};

const appWriteClient = new Client()
  .setEndpoint(appWriteConfig.endPoint) // Your API Endpoint
  .setProject(appWriteConfig.projectId); // Your project ID

const appWriteAccount = new Account(appWriteClient);
const appWriteDatabase = new Databases(appWriteClient);
const appWriteStorage = new Storage(appWriteClient);

export { appWriteAccount, appWriteConfig, appWriteDatabase, appWriteStorage };
