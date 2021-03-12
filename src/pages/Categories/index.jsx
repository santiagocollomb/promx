import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Button, Modal, Form } from 'react-bootstrap';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { app } from '../../firebaseConfig';

import Aux from '../../hoc/_Aux';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();

  const [newCategory, setNewCategory] = useState({
    name: '',
  });

  useEffect(() => {
    app
      .firestore()
      .collection('categories')
      .get()
      .then((categoriesData) => {
        setCategories(
          categoriesData.docs.map((category) => ({
            id: category.id,
            ...category.data(),
          }))
        );
      });
  }, []);

  const addCategory = () => {
    app
      .firestore()
      .collection('categories')
      .add(newCategory)
      .then((cat) => {
        cat.get().then((catData) => {
          categories.push(catData.data());
          setOpenModal(!openModal);
          NotificationManager.success('', 'Categoría agregada');
        });
      });
  };

  const updateCategory = () => {
    const { id, ...c } = selectedCategory;

    app
      .firestore()
      .collection('categories')
      .doc(selectedCategory.id)
      .update(c)
      .then(() => {
        const findIndex = categories.findIndex(
          (x) => x.id === selectedCategory.id
        );
        categories[findIndex] = { id: selectedCategory.id, ...c };
        setOpenEditModal(!openEditModal);
        NotificationManager.success('', 'Categoría editada');
      });
  };

  const deleteCategory = () => {
    app
      .firestore()
      .collection('categories')
      .doc(selectedCategory.id)
      .delete(newCategory.id)
      .then(() => {
        for (var i = 0; i < categories.length; i++) {
          if (categories[i].id === selectedCategory.id) {
            categories.splice(i, 1);
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
              <Card.Title as='h5'>Categorías</Card.Title>
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
              {categories.length > 0 ? (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category, i) => (
                      <tr>
                        <th scope='row'>{i + 1}</th>
                        <td>
                          <span className='text-capitalize'>
                            {category.name}
                          </span>
                        </td>
                        <td colSpan={2}>
                          <i
                            className='feather icon-edit btn-icon'
                            onClick={() => {
                              setSelectedCategory(category);
                              setOpenEditModal(!openEditModal);
                            }}
                          />
                          <i
                            className='feather icon-trash btn-icon ml-3'
                            onClick={() => {
                              setSelectedCategory(category);
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
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                size='sm'
                type='text'
                placeholder='Nombre de categoría'
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    name: e.target.value,
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
          <Button variant='primary' onClick={() => addCategory()}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={openEditModal}
        onHide={() => setOpenEditModal(!openEditModal)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                size='sm'
                type='text'
                placeholder='Nombre de categoría'
                value={selectedCategory && selectedCategory.name}
                onChange={(e) =>
                  setSelectedCategory({
                    ...selectedCategory,
                    name: e.target.value,
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
          <Button variant='primary' onClick={() => updateCategory()}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={openDeleteModal}
        onHide={() => setOpenDeleteModal(!openDeleteModal)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Eliminar categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className='text-center text-uppercase mb-3'>
            ¿Eliminar la categoría{' '}
            <mark>{selectedCategory && selectedCategory.name}</mark>?
          </h4>
          <p className='text-muted mt-2 mb-4 card-text text-center'>
            Una vez eliminada no podrás recuperarla
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={() => setOpenDeleteModal(!openDeleteModal)}
          >
            Cerrar
          </Button>
          <Button variant='primary' onClick={() => deleteCategory()}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
      <NotificationContainer />
    </Aux>
  );
};

export default Categories;
