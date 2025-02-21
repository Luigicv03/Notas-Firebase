import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext'; // Importa el contexto
import Login from './components/Login';
import NotesList from './components/NotesList';
import NoteForm from './components/NoteForm';

const App = () => {
  const { user } = useContext(AuthContext); // Usa el contexto

  return (
    <Routes>
      <Route 
        path="/" 
        element={user ? <Navigate to="/notes" /> : <Login />} 
      />
      <Route 
        path="/notes" 
        element={user ? <NotesList /> : <Navigate to="/" />} 
      />
      <Route 
        path="/notes/new" 
        element={user ? <NoteForm /> : <Navigate to="/" />} 
      />
      <Route 
        path="/notes/edit/:id" 
        element={user ? <NoteForm /> : <Navigate to="/" />} 
      />
    </Routes>
  );
};

export default App;