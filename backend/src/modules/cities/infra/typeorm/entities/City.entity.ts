import State from '@modules/states/infra/typeorm/entities/State.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cities')
class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  state_id: string;

  @OneToOne(() => State, { nullable: true })
  state: State;

  // e.g. name = 'São Paulo', state.initials = 'SP' -> 'São Paulo - SP'
  public getCityWithState() {
    // if remote, this.state is null
    if (!this.state_id || !this.state) {
      return this.name;
    }

    return `${this.name} - ${this.state.initials}`;
  }
}

export default City;
