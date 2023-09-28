import React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

function UserModals({ isOpen, onClose, onConfirm, text }) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="user-edit-confirmation-modal"
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "20px",
          outline: "none",
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
        }}
      >
        <p>{text}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "8%",
          }}
        >
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            style={{ marginLeft: "1%" }}
            variant="contained"
            color="primary"
            onClick={onConfirm}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default UserModals;
