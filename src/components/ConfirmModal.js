import React from 'react';
import './ConfirmModal.css'; 

function ConfirmModal({ isOpen, onCancel, onConfirm }) {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content" id="confirm-modal">
          <h4>¿Estás seguro?</h4>
          <p>yo no lo haria jamas</p>
          <div className="modal-actions">
            <button onClick={onCancel} className="btn btn-primary">no!</button>
            <button onClick={onConfirm} className="btn btn-light">Yes!</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default ConfirmModal;