import City from '@modules/cities/infra/typeorm/entities/City.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import CandidateTechnology from './CandidateTechnology.entity';

@Entity('candidates')
class Candidate {
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Column()
  recruiting_api_id: number;

  @Column()
  city_id: string;

  @OneToOne(() => City)
  city: City;

  /**
   * Both 'start_experience_range' and 'end_experience_range' are in years.
   */
  // e.g. '0-2 years' <==> start_experience_range = 0, end_experience_range = 2
  @Column()
  start_experience_range: number;

  // e.g. '12+ years' <==> start_experience_range = 12, end_experience_range = null
  @Column()
  end_experience_range: number;

  public getExperience() {
    const end =
      (this.end_experience_range ? '-' + this.end_experience_range : '+') +
      ' years';
    return `${this.start_experience_range}${end}`;
  }

  @OneToMany(() => CandidateTechnology, technology => technology.candidate)
  @JoinTable()
  technologies: CandidateTechnology[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Candidate;
