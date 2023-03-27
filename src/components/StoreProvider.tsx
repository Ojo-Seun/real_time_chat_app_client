import { createContext, useReducer, Dispatch } from "react";
import type { UserTypes } from "../utils/types";

const initialValue: StateTypes = {
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")!) : {},
  isConnected: false,
  alert: { message: "" },
};
export const Store = createContext({ state: initialValue, dispatch: {} as Dispatch<ActionTypes> });

interface ActionTypes {
  type: "SIGNIN" | "SIGNOUT" | "CONNECTED" | "ALERT";
  payload?: any;
}

interface StateTypes {
  userInfo: UserTypes;
  isConnected: boolean;
  alert: { message: string };
}

interface Props {
  children: React.ReactNode;
}

const reducer = (state: StateTypes, action: ActionTypes) => {
  switch (action.type) {
    case "SIGNIN":
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload };
    case "SIGNOUT":
      localStorage.removeItem("userInfo");
      return { ...state, userInfo: {} };
    case "CONNECTED":
      return { ...state, isConnected: action.payload };
    case "ALERT":
      return { ...state, alert: action.payload };
    default:
      return state;
  }
};

function StorageProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialValue);
  const values = { state, dispatch };

  return <Store.Provider value={values}>{children}</Store.Provider>;
}

export default StorageProvider;
