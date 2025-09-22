import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Stack, Badge, ListGroup } from 'react-bootstrap';
import { deleteExpense, updateExpense } from '../services/ExpenseSlice';
import DeleteModal from './ExpenseDelete';
import ExpenseEdit from './ExpenseEdit';

/**
 * Displays a responsive grid of ExpenseCard components with filtering.
 */
const ExpenseList = () => {
  const dispatch = useDispatch();

  // Get expenses from redux store
  const expenses = useSelector(state => state.expenses.items);

  // State for filter values
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDate, setFilterDate] = useState('');

  // State for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  // State for edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  // Filter expenses by category and date
  const filteredExpenses = expenses.filter(expense => {
    const categoryMatch = filterCategory ? expense.category === filterCategory : true;
    const dateMatch = filterDate ? expense.date === filterDate : true;
    return categoryMatch && dateMatch;
  });

  /**
   * Show delete confirmation modal for the selected expense.
   * @param {string} id - ID of expense to delete
   */
  const handleDeleteClick = (id) => {
    setExpenseToDelete(id);
    setShowDeleteModal(true);
  };

  /**
   * Confirm deletion and dispatch action.
   */
  const confirmDelete = () => {
    dispatch(deleteExpense(expenseToDelete));
    setShowDeleteModal(false);
    setExpenseToDelete(null);
  };

  /**
   * Cancel deletion modal.
   */
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setExpenseToDelete(null);
  };

  /**
   * Show edit modal for the selected expense.
   * @param {string} id - ID of expense to edit
   */
  const handleEdit = (id) => {
    const expense = expenses.find(exp => exp.id === id);
    setExpenseToEdit(expense);
    setShowEditModal(true);
  };

  /**
   * Save the edited expense.
   * @param {Object} updatedExpense - The updated expense object
   */
  const handleEditSave = (updatedExpense) => {
    dispatch(updateExpense(updatedExpense));
    setShowEditModal(false);
    setExpenseToEdit(null);
  };

  /**
   * Cancel edit modal.
   */
  const handleEditCancel = () => {
    setShowEditModal(false);
    setExpenseToEdit(null);
  };

  return (
    <>
      <Stack direction="horizontal" gap={3} className="mb-3">
        <Form.Group controlId="filterCategory">
          <Form.Label className="me-2">Category:</Form.Label>
          <Form.Control
            as="select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Others">Others</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="filterDate">
          <Form.Label className="me-2">Date:</Form.Label>
          <Form.Control
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </Form.Group>
      </Stack>

      <ListGroup className="mb-4">
        {filteredExpenses.length === 0 ? (
          <ListGroup.Item className="text-center">No expenses found.</ListGroup.Item>
        ) : (
          filteredExpenses.map(expense => (
            <ListGroup.Item
              key={expense.id}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <h6 className="mb-0">{expense.title}</h6>
                  <Badge bg="primary" pill>
                    {expense.category}
                  </Badge>
                </div>
                <small className="text-muted d-block">₹{expense.amount}</small>
                <small className="text-muted d-block">{expense.date}</small>
                <p className="mb-0">{expense.description}</p>
              </div>
              <div className="btn-group">
                <button 
                  className="btn btn-outline-primary btn-sm rounded-pill me-2"
                  onClick={() => handleEdit(expense.id)}
                >
                  <i className="bi bi-pencil-square me-1"></i>
                  Edit
                </button>
                <button 
                  className="btn btn-outline-danger btn-sm rounded-pill"
                  onClick={() => handleDeleteClick(expense.id)}
                >
                  <i className="bi bi-trash me-1"></i>
                  Delete
                </button>
              </div>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>

      {/* Delete confirmation modal */}
      <DeleteModal
        show={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      {/* Edit expense modal */}
      <ExpenseEdit
        show={showEditModal}
        expense={expenseToEdit}
        onSave={handleEditSave}
        onCancel={handleEditCancel}
      />
    </>
  );
};

export default ExpenseList;
