import { Column, Entity, PrimaryColumn } from 'typeorm';
import getCityWithState from '@shared/utils/getCityWithState';

@Entity('cities')
class City {
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Column()
  name: string;

  // e.g. RS, SC, SP
  @Column()
  state_initials: string;

  // e.g. name = 'São Paulo', state.initials = 'SP' -> 'São Paulo - SP'
  public getCityWithState() {
    return getCityWithState(this.name, this.state_initials);
  }
}

export default City;
