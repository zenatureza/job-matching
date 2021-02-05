import JobTechnology from '@modules/jobs/infra/typeorm/entities/JobTechnology.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('jobs')
class Job {
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Column()
  recruiting_api_id: number;

  /**
   * Both 'start_experience_range' and 'end_experience_range' are in years.
   */
  // e.g. '0-2 years' <==> start_experience_range = 0, end_experience_range = 2
  @Column()
  start_experience_range: number;

  // e.g. '12+ years' <==> start_experience_range = 12, end_experience_range = null
  @Column({ nullable: true })
  end_experience_range: number;

  @OneToMany(() => JobTechnology, technology => technology.job)
  @JoinTable()
  technologies: JobTechnology[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Job;
