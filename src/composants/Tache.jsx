import formaterDateEtHeure from '../services/utilitaires';
import './Tache.scss';
/* Ex3 - Point F)ii) */
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Tache({id, texte, completee, date}) {
  return (
    <div className="Tache">
      {/* Ex3 - Point F)iii) */}
      <CheckIcon/>
      {/* Ex3 - Point F)i) */}
      <span className="texte">{texte}</span>
      {/* Ex3 - Point F)ii) */}
      <span className="date">{formaterDateEtHeure(date)}</span>
      {/* Ex3 - Point F)iii) */}
      <DeleteIcon/>
    </div>
  );
}