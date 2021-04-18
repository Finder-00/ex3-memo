import Tache from './Tache';
import './Taches.scss';
import * as crudTaches from '../services/crud-taches';
import { useState, useEffect } from 'react';

export default function Taches({etatTaches, utilisateur}) {
  const uid = utilisateur.uid;
  const [taches, setTaches] = etatTaches;
  // Le prochain état est utilisé pour raffraichir l'affichage après ajout d'une
  // nouvelle tâche.
  const [nouvelleTache, setNouvelleTache] = useState(null);

  /**
   * On cherche les tâches une seule fois après l'affichage du composant
   */

  /* Ex3 - Point E)iii) */
    useEffect(() => 
    crudTaches.lireTout(uid).then(
      taches => setTaches(taches)
    )
  , [setTaches, nouvelleTache, uid]);

  /**
   * Gérer le formulaire d'ajout de nouvelle tâche en appelant la méthode 
   * d'intégration Firestore appropriée, puis actualiser les tâches en faisant 
   * une mutation de l'état 'taches'.
   * @param {string} uid Identifiant Firebase Auth de l'utilisateur connecté
   * @param {Event} e Objet Event JS qui a déclenché l'appel
   */
  function gererAjoutTache(uid, e) {
    e.preventDefault();
    const texte = e.target.texteTache.value;
    if(texte.trim() !== '') {
      e.target.reset();
      crudTaches.creer(uid, {texte: texte, completee: false}).then(
        // Actualiser l'état nouvelleTache avec l'identifiant de la tâche ajoutée
        docref => setNouvelleTache(docref.id)
      );
    }
  }

  return (
    <section className="Taches">
      <form onSubmit={e => gererAjoutTache(uid, e)}>
        <input 
          type="text"   
          placeholder="Ajoutez une tâche ..." 
          name="texteTache"
          autoComplete="off" 
          autoFocus={true} 
        />
      </form>
      <div className="listeTaches">
        {
          taches.map(tache => <Tache key={tache.id} {... tache} />)
        }
      </div>
    </section>
  );
}