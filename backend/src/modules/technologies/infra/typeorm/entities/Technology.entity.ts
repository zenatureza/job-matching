import CandidateTechnology from '@modules/candidates/infra/typeorm/entities/CandidateTechnology.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity('technologies')
class Technology {
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Column()
  name: string;

  @OneToOne(() => CandidateTechnology)
  candidate_technology: CandidateTechnology;

  @CreateDateColumn()
  created_at: Date;
}

export default Technology;
