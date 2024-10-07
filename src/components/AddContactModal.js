import React, { useContext, useEffect, useState } from 'react';
import { ContactContext } from "../contexts/ContactContext";
import "./AddContactModal.css"; 

function AddContactModal({ show, handleClose, contactToEdit = null }) {
    console.log(show); 

    const { actions } = useContext(ContactContext);


    const [contact, setContact] = useState({
        id: null,
        full_name: "",
        address: "",
        phone: "",
        email: "",
    });


    useEffect(() => {
        if (show && contactToEdit) {
            setContact(contactToEdit);
        } else if (!show) {
            setContact({
                id: null,
                full_name: "",
                address: "",
                phone: "",
                email: "",
            });
        }
    }, [contactToEdit, show]);

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleOutsideClick = (e) => {
        if (e.target.className.includes("modal")) {
            handleClose();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (contact.id) {
          await actions.editContact(contact.id, {
            full_name: contact.full_name, 
            email: contact.email,
            address: contact.address,
            phone: contact.phone,
            agenda_slug: "downtown_xii", 
          });
        } else {
          await actions.addContact({
            full_name: contact.full_name,
            email: contact.email,
            address: contact.address,
            phone: contact.phone,
            agenda_slug: "downtown_xii",
          });
        }
        handleClose();
      };

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) handleClose();
        };

        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [handleClose]);

    if (!show) return null;

    return (
        <div className={`modal ${show ? "show" : ""}`} onClick={handleOutsideClick}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
                <span className="close" onClick={handleClose}>&times;</span>
                <h2>{contact.id ? "Edit Contact" : "Add a new contact"}</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Nombre</label>
                    <input type="text" id="full_name" name="full_name" placeholder="Nombre Apellidos" onChange={handleChange} value={contact.full_name} required />
                    <label htmlFor="email">Correo</label>
                    <input type="email" id="email" name="email" placeholder="Correo electrónico" onChange={handleChange} value={contact.email} required />
                    <label htmlFor="phone">Teléfono</label>
                    <input type="text" id="phone" name="phone" placeholder="Número" onChange={handleChange} value={contact.phone} required />
                    <label htmlFor="address">Dirección</label>
                    <input type="text" id="address" name="address" placeholder="Dirección" onChange={handleChange} value={contact.address} required />
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button onClick={handleClose} className="btn btn-secondary btn-sm float-left">Or get back to contacts</button>
                </form>
            </div>
        </div>
    );
}

export default AddContactModal;