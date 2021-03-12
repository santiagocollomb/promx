import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Card,
  Button,
  Tabs,
  Tab,
  Modal,
  Form,
} from 'react-bootstrap';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { app } from '../../firebaseConfig';

import { PromxCard } from '../../App/components/PromxCard/';

import Aux from '../../hoc/_Aux';

const Services = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [newService, setNewService] = useState({
    name: '',
  });
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [services, setServices] = useState([]);

  useEffect(() => {
    app
      .firestore()
      .collection('categories')
      .get()
      .then((categories) => {
        setSelectedCategory(categories.docs[0].data().id);
        setCategories(
          categories.docs.map((category) => ({
            id: category.id,
            ...category.data(),
          }))
        );
      });
  }, []);

  useEffect(() => {
    selectedCategory &&
      app
        .firestore()
        .collection('services')
        .where('category', '==', selectedCategory)
        .get()
        .then((servicesData) => {
          setServices(
            servicesData.docs.map((service) => ({
              id: service.id,
              ...service.data(),
            }))
          );
        });
  }, [selectedCategory]);

  const addService = () => {
    app
      .firestore()
      .collection('categories')
      .add(newService)
      .then((cat) => {
        cat.get().then((catData) => {
          categories.push(catData.data());
          setOpenModal(!openModal);
          NotificationManager.success('', 'Categoría agregada');
        });
      });
  };

  const updateService = () => {
    const { id, ...c } = selectedService;

    app
      .firestore()
      .collection('categories')
      .doc(selectedService.id)
      .update(c)
      .then(() => {
        const findIndex = categories.findIndex(
          (x) => x.id === selectedService.id
        );
        categories[findIndex] = { id: selectedService.id, ...c };
        setOpenEditModal(!openEditModal);
        NotificationManager.success('', 'Categoría editada');
      });
  };

  const deleteService = () => {
    app
      .firestore()
      .collection('categories')
      .doc(selectedService.id)
      .delete(newService.id)
      .then(() => {
        for (var i = 0; i < categories.length; i++) {
          if (categories[i].id === selectedService.id) {
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
      </Row>

      <Row>
        <Col xs={12}>
          {categories.length > 0 ? (
            <Tabs
              variant='pills'
              onSelect={(k) => {
                setSelectedCategory(k);
              }}
              activeKey={selectedCategory}
              className='mb-3'
            >
              {categories.length > 0 ? (
                categories.map((category) => (
                  <Tab
                    eventKey={category.id}
                    title={category.name}
                    key={category.id}
                  >
                    {services.map((service) => (
                      <Row>
                        <Col xs={12} md={4} lg={3} key={service.id}>
                          <PromxCard name={service.name} />
                        </Col>
                      </Row>
                    ))}
                  </Tab>
                ))
              ) : (
                <h3 className='text-center'>
                  No hay servicios en esta categoría
                </h3>
              )}
            </Tabs>
          ) : (
            <></>
          )}
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
                value={newService.name}
                onChange={(e) =>
                  setNewService({
                    ...newService,
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
          <Button variant='primary' onClick={() => addService()}>
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
                value={selectedService && selectedService.name}
                onChange={(e) =>
                  setSelectedService({
                    ...selectedService,
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
          <Button variant='primary' onClick={() => updateService()}>
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
            <mark>{selectedService && selectedService.name}</mark>?
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
          <Button variant='primary' onClick={() => deleteService()}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
      <NotificationContainer />
    </Aux>
  );
};

export default Services;
