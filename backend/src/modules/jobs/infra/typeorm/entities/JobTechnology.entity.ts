import Job from '@modules/jobs/infra/typeorm/entities/Job.entity';
import Technology from '@modules/technologies/infra/typeorm/entities/Technology.entity';
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

@Entity('jobs_technologies')
class JobTechnology {
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Column()
  job_id: string;

  @ManyToOne(() => Job, job => job.technologies)
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @OneToOne(() => Technology)
  technology: Technology;

  // TODO: should have is_main_tech?

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default JobTechnology;
