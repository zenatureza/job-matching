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
  recruiting_api_candidate_id: number;

  @Column()
  candidate_id: string;

  @ManyToOne(() => Candidate, candidate => candidate.technologies)
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;

  @OneToOne(() => Technology)
  @JoinColumn()
  technology: Technology;

  @Column()
  is_main_tech: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(
    technology: Technology,
    recruiting_api_candidate_id: number,
    candidate_id?: string,
  ) {
    this.technology = technology;
    this.recruiting_api_candidate_id = recruiting_api_candidate_id;

    if (candidate_id) {
      this.candidate_id = candidate_id;
    }
  }
}

export default CandidateTechnology;
