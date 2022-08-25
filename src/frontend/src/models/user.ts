import IWithTotalCount from "./withTotalCounts";

export default interface IUser {
  id: number;
  username: string;
  password: string;
  status: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export type IUserWithTotalCount = IWithTotalCount<IUser>;
