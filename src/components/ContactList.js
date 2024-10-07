// ContactList.js
import React, { useContext, useEffect } from 'react';
import ContactCard from './ContactCard';
import { ContactContext } from '../contexts/ContactContext';

function ContactList({ onEditContact }) {
    const { store, actions } = useContext(ContactContext);
    const { contacts } = store;
  
    useEffect(() => {
      actions.loadContacts();
    }, [actions]);
  
    return (
      <div className="contact-list">
        {contacts.map(contact => (
          <ContactCard 
            key={contact.id} 
            contact={contact} 
            removeContact={() => actions.deleteContact(contact.id)} 
            onEditContact={onEditContact}
          />
        ))}
      </div>
    );
  }
  
  export default ContactList;