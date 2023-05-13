import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

function History({ history, onDelete }) {
  return (
    <>
      <ListGroup>
        <ListGroup.Item variant="light">Search History</ListGroup.Item>
        {history.map((item, index) => (
          <ListGroup.Item key={index}>{item}</ListGroup.Item>
        ))}
      </ListGroup>
      <Button variant="danger" onClick={onDelete}>
        Clear History
      </Button>
    </>
  );
}

export default History;
