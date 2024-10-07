// flux.js
const URL_BASE = 'https://playground.4geeks.com/apis/fake/contact/';

const getState = ({ getStore, setStore }) => {
  return {
    store: {
      contacts: [],
    },
    actions: {
      loadContacts: async () => {
        try {
          const response = await fetch(`${URL_BASE}agenda/downtown_xii`);
          if (!response.ok) throw new Error('Network response was not ok');
          const contacts = await response.json();
          setStore({ ...getStore(), contacts });
        } catch (error) {
          console.error("Error loading contacts:", error);
        }
      },
      addContact: async (newContact) => {
        try {
          const response = await fetch(`${URL_BASE}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...newContact, agenda_slug: "downtown_xii" }),
          });
          if (!response.ok) throw new Error('Network response was not ok');
          getStore().actions.loadContacts();
        } catch (error) {
          console.error("Error adding contact:", error);
        }
      },
      editContact: async (contactId, updatedContact) => {
        try {
          const response = await fetch(`${URL_BASE}${contactId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedContact),
          });
          if (!response.ok) throw new Error('Network response was not ok');
          getStore().actions.loadContacts();
        } catch (error) {
          console.error("Error editing contact:", error);
        }
      },
      deleteContact: async (contactId) => {
        try {
          const response = await fetch(`${URL_BASE}${contactId}`, {
            method: 'DELETE',
          });
          if (!response.ok) throw new Error('Network response was not ok');
          getStore().actions.loadContacts();
        } catch (error) {
          console.error("Error deleting contact:", error);
        }
      },
    },
  };
};

export default getState;