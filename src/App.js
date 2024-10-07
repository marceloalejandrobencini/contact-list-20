import React, { useState } from 'react';
import ContactList from './components/ContactList';
import AddContactModal from './components/AddContactModal';
import { ContactProvider } from './contexts/ContactContext';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);


  
  const handleEditContact = (contact) => {
    console.log("Editing contact...");
    setContactToEdit(contact); 
    setIsModalOpen(true); 
  };

  const handleShowModal = () => {
    console.log("Opening modal...");
    setContactToEdit(null); 
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log("Closing modal...");
    setIsModalOpen(false);
    setContactToEdit(null);
  };


  return (
    <ContactProvider>
      <div className="container mt-4">
        {/* Botón para agregar nuevo contacto */}
        <div className="text-end mb-3">
          <button type="button" className="btn btn-success" onClick={handleShowModal}>
            Añadir nuevo contacto
          </button>
        </div>

        {/* Modal para agregar o editar contacto */}
        <AddContactModal
  show={isModalOpen}
  handleClose={handleCloseModal}
  contactToEdit={contactToEdit}
/>

        {/* Lista de contactos con prop. para manejar la edición */}
        <ContactList onEditContact={handleEditContact} />
      </div>
    </ContactProvider>
  );
}

export default App;