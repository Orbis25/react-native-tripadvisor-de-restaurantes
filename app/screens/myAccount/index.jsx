import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import Loading from "../../components/loading";
import UserLogged from "../userLogged";
import UserGuest from "../userGuest";

const MyAccount = () => {
  const [Auth, setAuth] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      !user ? setAuth(false) : setAuth(true);
    });
  }, []);

  if (Auth == null) {
    return <Loading text="Cargando..." isVisible={true} />;
  }

  return Auth ? <UserLogged /> : <UserGuest />;
};

export default MyAccount;
