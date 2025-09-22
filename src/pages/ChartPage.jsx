import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ExpenseSummary from './../components/ExpenseSummary';
import ExpenseChart from './../components/ExpenseChart';
import ExpenseStatistics from './../components/ExpenseStatistics';

/**
 * Page 2: Charts page.
 */
const ChartsPage = () => {
  return (
    <Container className="my-4">
      <Row className="g-4">
        <Col md={8}>
          <Card className="et-card">
            <Card.Header>
              <h5 className="mb-0 et-title">Analytics</h5>
            </Card.Header>
            <Card.Body className="d-flex justify-content-center">
              <div className="et-chart-wrap w-100">
                <ExpenseChart />
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <div className="et-card card mb-4">
            <ExpenseSummary />
          </div>
          <div className="et-card card">
            <ExpenseStatistics />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChartsPage;
