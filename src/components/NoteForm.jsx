import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase/config';
import { doc, getDoc, addDoc, updateDoc, collection } from 'firebase/firestore';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './NoteForm.css';

const NoteForm = () => {
  const { id } = useParams(); // Obtiene el ID de la URL
  const { user, logout } = useContext(AuthContext); // Agregamos logout
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Cargar nota existente
  useEffect(() => {
    const loadNote = async () => {
      if (id) {
        const noteDoc = await getDoc(doc(db, 'notes', id));
        if (noteDoc.exists()) {
          setTitle(noteDoc.data().title);
          setContent(noteDoc.data().content);
        }
      }
    };
    loadNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const noteData = {
      title,
      content,
      userId: user.uid,
      createdAt: new Date()
    };
  
    try {
      if (id) {
        await updateDoc(doc(db, 'notes', id), noteData);
      } else {
        await addDoc(collection(db, 'notes'), noteData);
      }
      navigate('/notes'); // Redirige a la lista
    } catch (error) {
      console.error("Error guardando nota:", error);
      alert("Error al guardar cambios");
    }
  };

  return (
    <div className="note-form">
      <div className="form-header">
        <button onClick={() => navigate(-1)} className="back-button">← Volver</button>
        <button onClick={logout} className="logout-button">Cerrar Sesión</button>
      </div>
      <h2>{id ? 'Editar Nota' : 'Nueva Nota'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Contenido"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default NoteForm;