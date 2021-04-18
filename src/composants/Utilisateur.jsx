import './Utilisateur.scss';
import { Avatar, Button } from '@material-ui/core';
import { instanceFirebaseAuth } from '../services/firebase-initialisation';
import deconnexion from '../services/crud-utilisateurs';

export default function Utilisateur({utilisateur}) {
  return (
    <div className="Utilisateur">
      {/* Ex3 - Point D)iii) */}
      <span className="nom">{utilisateur.displayName}</span>
      <Avatar className="avatar" alt="Alibaba" src={utilisateur.photoURL} />

      <Button 
        variant="outlined"
        size="small"
        className="btnDeconnexion"
        onClick={() => deconnexion()} // log out
        >Déconnexion
      </Button>
    </div>
  );
}