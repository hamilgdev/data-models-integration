import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

import axiosInstance from '../utils/AxiosInstance';
import { Row, Col, Image, ListGroup } from 'react-bootstrap';

const ModelScreen = ({ match }) => {
  const [model, setModel] = useState({});

  useEffect(() => {
    const fetchModel = async () => {
      console.log('Request a model...');
      const { data } = await axiosInstance.get(`models/${match.params.id}`);
      setModel(data);
    };
    fetchModel();
  }, [match]);

  return (
    <>
      <Row>
        <Col md={4}>
          <Image src={model.image} alt={model.name} fluid />
        </Col>

        <Col md={4}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{model.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>Desarrollado por: {model.author}</ListGroup.Item>
            <ListGroup.Item variant='flush'>
              Descripción: {model.description}
            </ListGroup.Item>
            <ListGroup.Item variant='flush'>
              Estado: {model.status}
            </ListGroup.Item>
          </ListGroup>
          <Button variant='outline-warning'>Ejecutar Modelo</Button>
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <strong>Precio:</strong> {model.price}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ModelScreen;
