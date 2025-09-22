import { useDispatch } from 'react-redux';
import { addExpense, updateExpense } from '../services/ExpenseSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';

/**
 * Generates a short unique ID string using Math.random.
 * @returns {string} Unique ID
 */
const generateId = () => Math.random().toString(36).substr(2, 9);

/**
 * Validation schema for the expense form.
 */
const ExpenseSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters'),
  amount: Yup.number()
    .typeError('Amount must be a number')
    .positive('Amount must be positive')
    .required('Amount is required'),
  category: Yup.string()
    .required('Category is required'),
  date: Yup.date()
    .required('Date is required'),
  description: Yup.string()
    .max(200, 'Description must be less than 200 characters'),
});

/**
 * ExpenseForm component using Formik components for validation and form state.
 * It can be used for both adding and editing expenses.
 * @param {object} props - Component props
 * @param {object} props.expenseToEdit - The expense object to edit (optional)
 * @param {function} props.onClose - Function to call to close the form/modal (optional)
 */
const ExpenseForm = ({ expenseToEdit, onClose }) => {
  const dispatch = useDispatch();
  const isEditing = !!expenseToEdit;

  return (
    <Formik
      initialValues={isEditing
        ? {
            title: expenseToEdit.title,
            amount: expenseToEdit.amount,
            category: expenseToEdit.category,
            date: expenseToEdit.date,
            description: expenseToEdit.description || '',
          }
        : {
            title: '',
            amount: '',
            category: '',
            date: '',
            description: '',
          }}
      validationSchema={ExpenseSchema}
      onSubmit={(values, { resetForm }) => {
        if (isEditing) {
          const updatedExpense = {
            ...expenseToEdit,
            ...values,
          };
          dispatch(updateExpense(updatedExpense));
          if (onClose) onClose();
        } else {
          const newExpense = {
            id: generateId(),
            title: values.title,
            amount: parseFloat(values.amount),
            category: values.category,
            date: values.date,
            description: values.description,
          };
          dispatch(addExpense(newExpense));
          resetForm();
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className="mb-4">
          <div className="form-group mb-3">
            <label htmlFor="title">Title</label>
            <Field
              name="title"
              type="text"
              className={`form-control ${
                touched.title && errors.title ? 'is-invalid' : ''
              }`}
              placeholder="Enter expense title"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="invalid-feedback"
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <Field
              name="amount"
              type="number"
              className={`form-control ${
                touched.amount && errors.amount ? 'is-invalid' : ''
              }`}
              placeholder="Enter amount"
            />
            <ErrorMessage
              name="amount"
              component="div"
              className="invalid-feedback"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <Field
              as="select"
              name="category"
              className={`form-control ${
                touched.category && errors.category ? 'is-invalid' : ''
              }`}
            >
              <option value="">Select category</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Others">Others</option>
            </Field>
            <ErrorMessage
              name="category"
              component="div"
              className="invalid-feedback"
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <Field
              name="date"
              type="date"
              className={`form-control ${
                touched.date && errors.date ? 'is-invalid' : ''
              }`}
            />
            <ErrorMessage
              name="date"
              component="div"
              className="invalid-feedback"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="description">Description</label>
            <Field
              as="textarea"
              name="description"
              rows="3"
              className={`form-control ${
                touched.description && errors.description ? 'is-invalid' : ''
              }`}
              placeholder="Enter expense description (optional)"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="invalid-feedback"
            />
          </div>

          <Button type="submit" variant="primary" className="mt-3">
            {isEditing ? 'Update Expense' : 'Add Expense'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ExpenseForm;