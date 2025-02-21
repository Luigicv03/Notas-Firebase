import { useState, useContext } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore'; // Usa useCollection
import { db } from '../firebase/config';
import { collection, query, where } from 'firebase/firestore';
import Note from './Note';
import ModalNote from './ModalNote';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './NotesList.css';

const NotesList = () => {
  const { user, logout } = useContext(AuthContext);
  const [selectedNote, setSelectedNote] = useState(null);
  const navigate = useNavigate();
  
  const notesQuery = query(
    collection(db, 'notes'),
    where('userId', '==', user?.uid)
  );
  
  const [snapshot, loading] = useCollection(notesQuery); // Obtén el snapshot
  const notes = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Extrae ID + datos

  const handleEdit = (note) => {
    navigate(`/notes/edit/${note.id}`);
  };

  if (loading) return <div>Cargando notas...</div>;

  return (
    <div className="notes-container">
      <div className="header">
        <h1>Mis Notas</h1>
        <button onClick={logout} className="logout-button">
          Cerrar Sesión
        </button>
      </div>
      <Link to="/notes/new" className="new-note-button">
        Nueva Nota
      </Link>
      <div className="notes-grid">
        {notes?.map(note => (
          <div key={note.id} onClick={() => setSelectedNote(note)}>
            <Note 
              note={note} 
              variant="card"
              onEdit={handleEdit}
            />
          </div>
        ))}
      </div>
      {selectedNote && (
        <ModalNote note={selectedNote} onClose={() => setSelectedNote(null)} />
      )}
    </div>
  );
};

export default NotesList;