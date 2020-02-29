import * as firebase from "firebase";

export const readAuth = password => {
  const user = firebase.auth().currentUser;
  const creadetials = firebase.auth.EmailAuthProvider.credential(
    user.email,
    password
  );
  return user.reauthenticateWithCredential(creadetials);
};
