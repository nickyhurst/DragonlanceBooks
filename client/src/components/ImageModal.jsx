import { Modal, Button } from "react-bootstrap";

export default function ImageModal({ open, image, alt, onClose }) {
  return (
    <Modal show={open} onHide={onClose} centered size="lg">
      <Modal.Body className="text-center">
        {image ? (
          <img
            src={image}
            alt={alt}
            style={{ maxWidth: "100%", maxHeight: "80vh", objectFit: "contain" }}
          />
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}