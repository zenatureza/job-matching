import React from 'react';
import { Col, Form } from 'react-bootstrap';
import Select from 'react-select';

import { Container, Input, Submit } from './styles';

const Index: React.FC = () => {
  const cityOptions = [
    { value: 'salvador', label: 'Salvador - BA' },
    { value: 'criciuma', label: 'Criciúma - SC' },
    { value: 'fortalzza', label: 'Fortaleza - CE' },
  ];

  const experienceOptions = [
    { value: '0to1', label: '0-1 years' },
    { value: '1to2', label: '1-2 years' },
    { value: '12', label: '12+ years' },
  ];

  return (
    <Form.Row>
      Busque candidatos para a vaga conforme os filtros:
      <Container xs={12}>
        <Col>
          <Select placeholder="Selecione a localização" options={cityOptions} />
        </Col>

        <Col>
          <Select
            placeholder="Selecione o tempo de experiência"
            options={experienceOptions}
          />
        </Col>

        <Col xs="auto">
          <Input type="text" placeholder="Digite as tecnologias" />
        </Col>

        <Submit>Pesquisar melhores resultados</Submit>
      </Container>
      <div>
        Ou navegue nas vagas disponíveis abaixo para encontrá-los:
        {/* TODO: Componente que contém uma lista de vagas */}
        <ul>
          <li>Vaga 1</li>
          <li>Vaga 2</li>
          <li>Vaga 3</li>
        </ul>
      </div>
    </Form.Row>
  );
};

export default Index;
