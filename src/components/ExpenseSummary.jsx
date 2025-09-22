import React from 'react';
import { useSelector } from 'react-redux';
import { Card, ListGroup, Badge } from 'react-bootstrap';

/**
 * ExpenseSummary shows total amount spent per category.
 */
const ExpenseSummary = () => {
  const expenses = useSelector(state => state.expenses.items);

  // Sum amounts grouped by category
  const totals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  return (
    <Card className="mb-4 et-card">
      <Card.Body>
        <Card.Title className="mb-3 et-title">Summary by Category</Card.Title>
        {Object.keys(totals).length === 0 ? (
          <p className="et-muted mb-0">No expenses added yet.</p>
        ) : (
          <ListGroup variant="flush">
            {Object.entries(totals).map(([category, total]) => (
              <ListGroup.Item key={category} className="d-flex justify-content-between align-items-center">
                <span>{category}</span>
                <Badge bg="secondary">₹{total.toFixed(2)}</Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
};

export default ExpenseSummary;