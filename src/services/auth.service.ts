import firebase from 'firebase';

export class AuthService {

  public signup(email: string, password: string){
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  public signin(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  public logout() {
    firebase.auth().signOut();
  }

  public getActiveUser() {
    return firebase.auth().currentUser;
  }

  public getUserByEmail(email: string) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  public updatePassword(currentPassword:any, newPassword: string) {
    let user = this.getActiveUser();
    console.log(user.email);
    console.log(newPassword);
    let credential = firebase.auth.EmailAuthProvider
      .credential(
        user.email,
        currentPassword
    );
    return user.reauthenticateWithCredential(credential)
            .then(()=> {
              user.updatePassword(newPassword);
            }, (error) => {
              console.log(error);
            });
  }
}
