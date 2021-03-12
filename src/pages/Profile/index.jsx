import React, { useContext } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Auth } from '../../context/authContext';

import Aux from '../../hoc/_Aux';

const Profile = () => {
  const { user } = useContext(Auth);
  return (
    <Aux>
      <Row>
        <Col xs='12'>
          <Card>
            <Card.Header>
              <Card.Title as='h5'>Mi cuenta</Card.Title>
            </Card.Header>
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <Card>
            <Card.Body>
              <div class='d-flex flex-column align-items-center text-center'>
                <img
                  src={
                    user && user.image
                      ? user.image
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRePoVhTeaks5ESIWqL34k8BOO9Wh6UZdZECw&usqp=CAU'
                  }
                  alt='Admin'
                  class='rounded-circle'
                  width='100'
                />
                <div class='mt-3'>
                  <h4>
                    {user.name} {user.surname}
                  </h4>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};

export default Profile;
