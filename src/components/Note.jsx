import { FaTrash, FaEdit } from 'react-icons/fa';
import { db } from '../firebase/config';
import { doc, deleteDoc } from 'firebase/firestore';
import './Note.css';

const Note = ({ note, variant = 'default', onEdit }) => {
  const variants = {
    default: 'note-default',
    minimal: 'note-minimal',
    card: 'note-card'
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('¿Eliminar nota?')) {
      try {
        if (!note.id) {
          throw new Error("El ID de la nota no está definido");
        }
        await deleteDoc(doc(db, 'notes', note.id));
        console.log("Nota eliminada correctamente");
      } catch (error) {
        console.error("Error eliminando nota:", error);
        alert("Error al eliminar la nota");
      }
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(note);
  };

  return (
    <div className={`note ${variants[variant]}`}>
      <h3 className="note-title">{note.title}</h3>
      <div className="note-content">
        {note.content.length > 100 ? 
          `${note.content.substring(0, 100)}...` : note.content
        }
      </div>
      <div className="note-actions">
        <FaEdit onClick={handleEdit} className="edit-icon" />
        <FaTrash onClick={handleDelete} className="delete-icon" />
      </div>
    </div>
  );
};

export default Note;