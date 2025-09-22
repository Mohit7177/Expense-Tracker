import React from 'react';
import { Card, Button } from 'react-bootstrap';

/**
 * Displays single expense as a card with actions.
 */
const ExpenseCard = ({ 
  id, 
  title,
  amount, 
  category, 
  date, 
  description,
  onEdit, 
  onDelete 
}) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          Amount: ₹{Number(amount).toFixed(2)}<br/>
          Category: {category}<br/>
          Date: {new Date(date).toLocaleDateString()}<br/>
          {description}

        </Card.Text>
        <Button variant="primary" className="mr-2" onClick={() => onEdit(id)}>Edit</Button>
        <Button variant="danger" onClick={() => onDelete(id)}>Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default ExpenseCard;