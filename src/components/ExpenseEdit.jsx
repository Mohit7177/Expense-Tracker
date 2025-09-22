import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

/**
 * Component: Expense Update Modal. 
 */
const ExpenseUpdate = ({ show, expense, onSave, onCancel }) => {
  
  // Local state for updated expense details
  const [UpdatedExp, setUpdatedExp] = useState({
    title: '',
    amount: '',
    category: '',
    date: '',
    description: ''
  });

  // Update local state when the selected expense changes
  useEffect(() => {
    if (expense) {
      setUpdatedExp(expense);
    }
  }, [expense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(UpdatedExp);
  };

  return (
    
    <Modal show={show} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={UpdatedExp.title}
              onChange={(e) => setUpdatedExp({...UpdatedExp, title: e.target.value})}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={UpdatedExp.amount}
              onChange={(e) => setUpdatedExp({...UpdatedExp, amount: e.target.value})}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={UpdatedExp.category}
              onChange={(e) => setUpdatedExp({...UpdatedExp, category: e.target.value})}
            >
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Others">Others</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={UpdatedExp.date}
              onChange={(e) => setUpdatedExp({...UpdatedExp, date: e.target.value})}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={UpdatedExp.description}
              onChange={(e) => setUpdatedExp({...UpdatedExp, description: e.target.value})}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExpenseUpdate;