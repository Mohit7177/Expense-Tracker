import { Container, Row, Col } from 'react-bootstrap';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseSummary from '../components/ExpenseSummary';

/**
 * Page 1: Expense Tracker page.
 */
const ExpenseTracker = () => {
  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Expense Tracker</h1>
      <Row>
        <Col md={4}>
          <ExpenseForm />
          <ExpenseSummary />
        </Col>
        <Col md={8}>
          <ExpenseList />
        </Col>
      </Row>
    </Container>
  );
};

export default ExpenseTracker;
