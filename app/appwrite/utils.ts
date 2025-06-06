import { ID, OAuthProvider, Query, type Models } from "appwrite";
import { appWriteAccount, appWriteConfig, appWriteDatabase } from "./config";
import type { UserModel } from "~/models/user.model";

export function loginWithGoogle() {
  appWriteAccount.createOAuth2Session(
    OAuthProvider.Google,
    import.meta.env.VITE_BASE_URL + "/admin/dashboard",
    import.meta.env.VITE_BASE_URL + "/admin/error"
  );
}

export const getGoogleImage = async () => {
  try {
    const { providerAccessToken } = await appWriteAccount.getSession("current");
    const response = await fetch("https://people.googleapis.com/v1/people/me?personFields=photos", {
      headers: { authorization: `Bearer ${providerAccessToken}` },
    });
    const data = await response.json();
    if (data.photos && data.photos.length > 0) return data.photos[0].url;
    else return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUsers = (queries?: string[]) => {
  return appWriteDatabase.listDocuments<UserModel & Models.Document>(
    appWriteConfig.databaseId,
    appWriteConfig.userCollection,
    queries
  );
};

export const getCurrentUser = async (): Promise<(UserModel & Models.Document) | null> => {
  try {
    const currentUser = await appWriteAccount.get();
    if (!currentUser.$id) return null;

    const { documents } = await getUsers([Query.equal("accountId", currentUser.$id)]);
    if (documents.length === 0) return null;

    return documents[0];
  } catch (error) {
    return null;
  }
};

export const createUser = (user: UserModel) => {
  return appWriteDatabase.createDocument(
    appWriteConfig.databaseId,
    appWriteConfig.userCollection,
    ID.unique(),
    user
  );
};
