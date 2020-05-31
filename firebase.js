import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import { api_params } from "./config";

const { key, domian, url } = api_params;

const config = {
  apiKey: key,
  authDomain: domian,
  databaseURL: url,
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
