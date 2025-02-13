import React from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

import styles from "../styles/CardCollection.module.css";

const CardCollection = ({columns, cardsRef, objects, handleRowClick}) => {
   
  return (
    <div className={styles.CardConteiner} ref={cardsRef}>
      {objects.map((object) => (
        <Col xs={12} sm={6} key={object.id}>
          <Card
            className={styles.Card}
            onClick={() => handleRowClick(object)}
          >
            <Card.Body className={styles.CardBody}>
              <Card.Title className={styles.CardTitle}>
                {object[columns[0].accessor] || `Object ${object.id}`}
              </Card.Title>
              <Card.Text className={styles.CardText}>
                <ListGroup className="list-group-flush">
                  {columns.slice(1).map(({ Header, accessor, Cell }) => (
                    <ListGroupItem
                      className={styles.CardListGroupItem}
                      key={Header}
                    >
                      <strong>{Header}: </strong>{" "}
                      {Cell === undefined
                        ? object[accessor]
                        : Cell(object[accessor])}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </div>
  );
};

export default CardCollection;
