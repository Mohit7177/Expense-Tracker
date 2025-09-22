import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Table, Badge } from 'react-bootstrap';

/**
 * ExpenseStatistics computes and displays key statistics:
 * - Total spend
 * - Average spend per expense
 * - Highest and lowest single expense
 * - Count of expenses
 * - Top category by spend
 */
const ExpenseStatistics = () => {
  const expenses = useSelector(state => state.expenses.items);

  const count = expenses.length;
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const average = count > 0 ? total / count : 0;

  let highest = null;
  let lowest = null;
  let categoryTotals = {};

  for (const e of expenses) {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    if (!highest || e.amount > highest.amount) highest = e;
    if (!lowest || e.amount < lowest.amount) lowest = e;
  }

  const topCategory = Object.keys(categoryTotals).length
    ? Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]
    : null;

  return (
    <Card className="mb-4 et-card">
      <Card.Body>
        <Card.Title className="et-title">Statistics</Card.Title>
        {count === 0 ? (
          <p className="et-muted">No expenses yet to compute statistics.</p>
        ) : (
          <>
            <Table striped bordered hover size="sm" className="mb-3">
              <tbody>
                <tr>
                  <td>Total spend</td>
                  <td>₹{total.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Average per expense</td>
                  <td>₹{average.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Number of expenses</td>
                  <td>{count}</td>
                </tr>
                <tr>
                  <td>Highest expense</td>
                  <td>
                    ₹{highest.amount.toFixed(2)}{' '}
                    {highest.title ? <Badge bg="danger">{highest.title}</Badge> : null}
                  </td>
                </tr>
                <tr>
                  <td>Lowest expense</td>
                  <td>
                    ₹{lowest.amount.toFixed(2)}{' '}
                    {lowest.title ? <Badge bg="success">{lowest.title}</Badge> : null}
                  </td>
                </tr>
                <tr>
                  <td>Top category</td>
                  <td>
                    {topCategory ? (
                      <>
                        <strong>{topCategory[0]}</strong>: ₹{topCategory[1].toFixed(2)}
                      </>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default ExpenseStatistics;


