export enum UserStatusEnum {
  Admin = "Admin",
  User = "User",
}

export interface UserModel {
  name: string;
  email: string;
  accountId: string;
  status: UserStatusEnum;
  imageUrl: string | null;
  joinedAt: Date;
}
