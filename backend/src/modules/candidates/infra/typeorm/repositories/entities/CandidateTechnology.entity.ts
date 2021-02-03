import Technology from '@modules/technologies/infra/typeorm/entities/Technology.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Candidate from './Candidate.entity';

@Entity('candidates_technologies')
class CandidateTechnology {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  candidate_id: string;

  @ManyToOne(() => Candidate, candidate => candidate.technologies)
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;

  @OneToOne(() => Technology)
  technology: Technology;

  @Column()
  is_main_tech: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CandidateTechnology;
