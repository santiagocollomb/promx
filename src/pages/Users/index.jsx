import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Button, Modal, Form } from 'react-bootstrap';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { app } from '../../firebaseConfig';

import Aux from '../../hoc/_Aux';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  const [newUser, setNewUser] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    app
      .firestore()
      .collection('users')
      .get()
      .then((usersData) => {
        setUsers(
          usersData.docs.map((user) => ({
            id: user.id,
            ...user.data(),
          }))
        );
      });
  }, []);

  const addUser = () => {
    app
      .firestore()
      .collection('users')
      .add(newUser)
      .then((us) => {
        us.get().then((usData) => {
          users.push(usData.data());
          setOpenModal(!openModal);
          NotificationManager.success('', 'Categoría agregada');
        });
      });
  };

  const updateUser = () => {
    const { id, ...c } = selectedUser;

    app
      .firestore()
      .collection('users')
      .doc(selectedUser.id)
      .update(c)
      .then(() => {
        const findIndex = users.findIndex((x) => x.id === selectedUser.id);
        users[findIndex] = { id: selectedUser.id, ...c };
        setOpenEditModal(!openEditModal);
        NotificationManager.success('', 'Categoría editada');
      });
  };

  const deleteUser = () => {
    app
      .firestore()
      .collection('categories')
      .doc(selectedUser.id)
      .delete(newUser.id)
      .then(() => {
        for (var i = 0; i < users.length; i++) {
          if (users[i].id === selectedUser.id) {
            users.splice(i, 1);
          }
        }

        setOpenDeleteModal(!openDeleteModal);
        NotificationManager.success('', 'Categoría eliminada');
      });
  };

  return (
    <Aux>
      <Row>
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title as='h5'>Usuarios</Card.Title>
              <div className='card-header-right'>
                <Button
                  variant='outline-primary'
                  onClick={() => setOpenModal(!openModal)}
                >
                  Agregar
                </Button>
              </div>
            </Card.Header>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Body>
              {users.length > 0 ? (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, i) => (
                      <tr>
                        <th scope='row'>{i + 1}</th>
                        <td>
                          {user.name}, {user.surname}
                        </td>
                        <td>{user.email}</td>
                        <td colSpan={2}>
                          <i
                            className='feather icon-edit btn-icon'
                            onClick={() => {
                              setSelectedUser(user);
                              setOpenEditModal(!openEditModal);
                            }}
                          />
                          <i
                            className='feather icon-trash btn-icon ml-3'
                            onClick={() => {
                              setSelectedUser(user);
                              setOpenDeleteModal(!openDeleteModal);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <></>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={openModal} onHide={() => setOpenModal(!openModal)}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                size='sm'
                type='email'
                placeholder='Enter email'
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    email: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                size='sm'
                type='password'
                placeholder='Password'
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    password: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setOpenModal(!openModal)}>
            Cerrar
          </Button>
          <Button variant='primary' onClick={() => addUser()}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={openEditModal}
        onHide={() => setOpenEditModal(!openEditModal)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                size='sm'
                type='email'
                placeholder='Enter email'
                value={selectedUser && selectedUser.email}
                onChange={(e) =>
                  selectedUser({
                    ...selectedUser,
                    email: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={() => setOpenEditModal(!openEditModal)}
          >
            Cerrar
          </Button>
          <Button variant='primary' onClick={() => updateUser()}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={openDeleteModal}
        onHide={() => setOpenDeleteModal(!openDeleteModal)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Eliminar usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className='text-center text-uppercase mb-3'>
            ¿Eliminar el usuario{' '}
            <mark>{selectedUser && selectedUser.email}</mark>?
          </h4>
          <p className='text-muted mt-2 mb-4 card-text text-center'>
            Una vez eliminado no podrás recuperarlo
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={() => setOpenDeleteModal(!openDeleteModal)}
          >
            Cerrar
          </Button>
          <Button variant='primary' onClick={() => deleteUser()}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
      <NotificationContainer />
    </Aux>
  );
};

export default Users;
