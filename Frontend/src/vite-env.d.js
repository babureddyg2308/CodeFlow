<reference types="vite/client" />

import { CompilerSliceStateType } from "./redux/slices/compilerSlice";

// User types
const userInfoType = {
  username: "",
  picture: "",
  email: "",
  savedCodes: [],
};

const loginCredentialsType = {
  userId: "",
  password: "",
};

const signupCredentialsType = {
  username: "",
  email: "",
  password: "",
};

const codeType = {
  fullCode: { html: "", css: "", javascript: "" },
  title: "",
  _id: "",
};
