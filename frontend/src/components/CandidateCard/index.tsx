import React from 'react';
import { Badge, Card } from 'react-bootstrap';
import { Technology } from '../../interfaces/IGetBestCandidatesResponse.interface';
import faker from 'faker';

interface Props {
  candidateId: string;
  city: string;
  technologies: { [key: string]: Technology };
  expectedCity: string;
}

const CandidateCard: React.FC<Props> = ({
  candidateId,
  city,
  technologies,
  expectedCity,
}: Props) => {
  return (
    <Card
      border={city !== expectedCity ? 'primary' : 'success'}
      style={{ width: '50rem', margin: '1em' }}
    >
      <Card.Header>{faker.name.firstName()}</Card.Header>
      <Card.Body>
        <Card.Title>Cidade: {city}</Card.Title>
        <Card.Text>
          Tecnologias:{' '}
          {Object.keys(technologies).map((techId) => (
            <Badge
              variant={
                technologies[techId].is_main_tech ? 'success' : 'primary'
              }
            >
              {technologies[techId].technology}
            </Badge>
          ))}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CandidateCard;
