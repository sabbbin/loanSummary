import { Logout } from "@mui/icons-material";
import create from "zustand";
import IUser from "./models/user";

type LoginStatus = "IsLoggedIn" | "IsLoggedOut" | "Uncertain";
export const useAuthenticationStore = create<{
  loginstatus: LoginStatus;
  access_token: string;
  user: IUser | null;
  loginFunc(access_token: string, user: IUser): void;
  logoutFunc(): void;
}>((set) => ({
  loginstatus: "Uncertain",
  access_token: "",
  user: null,
  loginFunc: (token: string, user: IUser) =>
    set(() => ({
      loginstatus: "IsLoggedIn",
      access_token: token,
      user,
    })),
  logoutFunc() {
    set(() => ({
      loginstatus: "IsLoggedOut",
      access_token: "",
      user: null,
    }));
  },
}));
