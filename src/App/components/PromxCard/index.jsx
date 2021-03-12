import React from 'react';
import { Row, Col, Dropdown } from 'react-bootstrap';
import './style.css';

export const PromxCard = ({ name, handleEdit, handleDelete }) => {
  return (
    <div className='profile-card-4 text-center'>
      <div className='image-container'>
        <div className='image-overlay' />
        <img
          src='https://www.moto1pro.com/sites/default/files/226767_ktm_250_sx-f_us_helmet_my_2019.jpg'
          alt='Service descriptive'
          className='img img-responsive'
        />
      </div>

      <div className='profile-content'>
        <div className='profile-name'>
          <p>{name}</p>
        </div>
        <div className='profile-description'>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor.
        </div>
        <Row>
          <Col xs={5}>
            <div className='profile-overview'>
              <p>Fecha</p>
              <h4>12/04</h4>
            </div>
          </Col>
          <Col xs={{ span: 5, offset: 2 }} offset={2}>
            <div className='profile-overview'>
              <Dropdown>
                <Dropdown.Toggle>
                  <i className='feather icon-more-horizontal' />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleDelete()}>
                    Eliminar
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleEdit()}>
                    Editar
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
