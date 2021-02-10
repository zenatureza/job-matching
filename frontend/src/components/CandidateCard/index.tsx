import faker from 'faker';
import React from 'react';
import { Badge, Card } from 'react-bootstrap';
import { Technology } from '../../interfaces/IGetBestCandidatesResponse.interface';

interface Props {
  candidateId: string;
  city: string;
  technologies: { [key: string]: Technology };
  expectedCity: string;
  experience: string;
  selectedTechnologies: string[];
}

const CandidateCard: React.FC<Props> = ({
  city,
  technologies,
  expectedCity,
  experience,
  selectedTechnologies,
}: Props) => {
  const getMainTechs = () => {
    return Object.values(technologies).filter((tech) => tech.is_main_tech);
  };

  return (
    <Card
      border={city !== expectedCity ? 'primary' : 'success'}
      style={{ margin: '1em' }}
      className="col-md-6"
    >
      <Card.Header>{faker.name.firstName()}</Card.Header>
      <Card.Body>
        <Card.Title>Cidade: {city}</Card.Title>
        <Card.Text>
          Tecnologias:{' '}
          {Object.keys(technologies).map((techId) => (
            <Badge
              className="mx-1 my-1"
              key={techId}
              variant={
                selectedTechnologies.includes(techId) ? 'success' : 'secondary'
              }
            >
              {technologies[techId].technology}
            </Badge>
          ))}
          <br />
          <br />
          Principais tecnologias:{' '}
          {getMainTechs() &&
            getMainTechs().map((tech) => (
              <Badge
                className="mx-1 my-1"
                key={tech.technology}
                variant={'primary'}
              >
                {tech.technology}
              </Badge>
            ))}
        </Card.Text>
      </Card.Body>
      <Card.Footer>Experiência: {experience}</Card.Footer>
    </Card>
  );
};

export default CandidateCard;
