import City from '@modules/cities/infra/typeorm/entities/City.entity';
import getExperienceRange from '@shared/utils/getExperienceRange';
import e from 'express';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @Column({ type: 'uuid', name: 'city_id' })
  city_id: string;

  @OneToOne(() => City)
  @JoinColumn({ name: 'city_id' })
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

    const result = `${this.start_experience_range}${end}`;

    return result;
  }

  @OneToMany(() => CandidateTechnology, technology => technology.candidate)
  @JoinTable()
  technologies: CandidateTechnology[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(
    experience: string,
    city_id?: string,
    recruiting_api_id?: number,
  ) {
    this.setExperienceRange(experience);

    if (recruiting_api_id) {
      this.recruiting_api_id = recruiting_api_id;
    }

    if (city_id) {
      this.city_id = city_id;
    }
  }

  public setExperienceRange(experience: string) {
    if (!experience) return;

    const [start, end] = getExperienceRange(experience);

    // experience invalid
    // 0 <==> '+', e.g. '4+ years',
    // start = 4, end = 0 (+)
    if (end && end !== 0 && end < start) {
      return;
    }

    this.start_experience_range = start;
    this.end_experience_range = end;
  }
}

export default Candidate;
