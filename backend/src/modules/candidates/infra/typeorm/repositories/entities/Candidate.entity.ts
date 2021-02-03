import Technology from '@modules/technologies/infra/typeorm/entities/Technology.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import CandidateTechnology from './CandidateTechnology.entity';

@Entity('candidates')
class Candidate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // TODO: city and experience could be entities
  @Column()
  city: string;

  @Column()
  experience: string;

  @OneToMany(() => CandidateTechnology, technology => technology.candidate)
  @JoinTable()
  technologies: CandidateTechnology[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Candidate;
