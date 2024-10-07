import React, { useState, useContext } from 'react';
import './ContactCard.css';
import ConfirmModal from './ConfirmModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhoneFlip, faEnvelope, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ContactContext } from '../contexts/ContactContext'; 


function ContactCard({ contact, onEditContact }) {
    const [isConfirmOpen, setConfirmOpen] = useState(false);
    const { actions } = useContext(ContactContext); 
  
    const showConfirmModal = () => setConfirmOpen(true);
    const hideConfirmModal = () => setConfirmOpen(false);
  
    const handleDelete = () => {
        actions.deleteContact(contact.id); 
        hideConfirmModal();
    };
  
    const handleEditClick = () => {
      console.log("Handle edit click...");
      onEditContact(contact);
    };
  
    const { full_name, address, phone, email } = contact; 
    const imagePath = process.env.PUBLIC_URL + '/images/laroca.jpeg'; 

  return (
    <>
      <div className="container">
        <div className="row align-items-center contact-card">
          <div className="col-md-2 col-sm-2">
            <img src={imagePath} alt="Profile" className="img-fluid profile-photo-lg" />
          </div>
          <div className="col-md-6 col-sm-6">
            <h5>{full_name}</h5>
            <p><FontAwesomeIcon icon={faLocationDot} /> {address}</p>
            <p><FontAwesomeIcon icon={faPhoneFlip} /> {phone}</p>
            <p><FontAwesomeIcon icon={faEnvelope} /> {email}</p>
          </div>
          <div className="col-md-4 col-sm-4 d-flex justify-content-end">
            <button onClick={handleEditClick} className="btn btn-warning btn-edit me-2"><FontAwesomeIcon icon={faPencil} /> Editar</button>
            <button onClick={showConfirmModal} className="btn btn-danger btn-delete"><FontAwesomeIcon icon={faTrash} /> Eliminar</button>
          </div>
        </div>
      </div>
      <ConfirmModal 
          isOpen={isConfirmOpen} 
          onCancel={hideConfirmModal} 
          onConfirm={handleDelete}
      />
    </>
  );
}

export default ContactCard;