import Technology from '@modules/technologies/infra/typeorm/entities/Technology.entity';
import { Joi } from 'celebrate';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import Candidate from './Candidate.entity';

@Entity('candidates_technologies')
class CandidateTechnology {
  // @PrimaryColumn({ generated: 'uuid' })
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Column()
  recruiting_api_candidate_id: number;

  @Column({ type: 'uuid', name: 'candidate_id' })
  candidate_id: string;

  @ManyToOne(() => Candidate, candidate => candidate.technologies)
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;

  @Column({ type: 'uuid', name: 'technology_id' })
  technology_id: string;

  @OneToOne(() => Technology, tech => tech.id)
  @JoinColumn({ name: 'technology_id' })
  technology: Technology;

  @Column()
  is_main_tech: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(
    // technology: Technology,
    technology_id: string,
    recruiting_api_candidate_id: number,
    candidate_id?: string,
  ) {
    this.technology_id = technology_id;
    this.recruiting_api_candidate_id = recruiting_api_candidate_id;

    if (candidate_id) {
      this.candidate_id = candidate_id;
    }
  }
}

export default CandidateTechnology;
