import firebase from 'firebase/app';
import { instanceFirebaseAuth, instanceFirebaseUI, instanceFirestore} from './firebase-initialisation'
import 'firebaseui/dist/firebaseui.css';
import { collUtil } from '../services/config';

/**
 * Initialiser le widget FirebaseUI et l'injecte dans la page Web
 * @param {string} eltAncrage sélecteur DOM où injecter le widget de connexion
 */
export function initUI(eltAncrage) {
  instanceFirebaseUI.start(eltAncrage, {
    signInOptions: [
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        fullLabel: 'Connexion avec Google'
      }
    ],
    signInFlow: 'popup'
  });
}

/**
 * Observer les changements de connexion dans Firebase Auth pour valider 
 * l'état de l'utilisateur connecté
 * @param {Function} mutateurEtatUtil fonction de mutation de l'état utilisateur
 */
export function observerConnexion(mutateurEtatUtil) {
  instanceFirebaseAuth.onAuthStateChanged(
    util => {
      // On fait la mutation de l'état utilisateur
      mutateurEtatUtil(util);
      // Si un utilisateur est connecté ...
      if(util) {
        // ... on créé son profil dans la collection Firestore au besoin
        instanceFirestore.collection(collUtil).doc(util.uid).set(
          creerProfil(util.uid, util.displayName, util.email)
        )
      }
    }
  );
}

/**
 * Créer un profil d'utilisateur s'il n'y en pas un ; fusionner le profil sinon
 * @param {string} id Identifiant Firebase de l'utilisateur connecté
 * @param {string} nom Nom de l'utilisateur
 * @param {string} courriel Adresse courriel de l'utilisateur
 */
export function creerProfil(id, nom, courriel) {
  {util.id, util.nom, util.courriel}
  {merge: true}
}

/**
 * Déconnecter l'utilisateur de Firebase Auth
 */
export function deconnexion() {
  instanceFirebaseAuth.signOut();
}