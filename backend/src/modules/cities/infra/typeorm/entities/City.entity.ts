import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('cities')
class City {
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Column()
  name: string;

  // e.g. RS, SC, SP
  @Column()
  state_initials: string;

  // @Column()
  // state_id: string;

  // @OneToOne(() => State, { nullable: true })
  // state: State;

  // e.g. name = 'São Paulo', state.initials = 'SP' -> 'São Paulo - SP'
  public getCityWithState() {
    // if remote this.state is null
    if (!this.state_initials) {
      return this.name;
    }

    return `${this.name} - ${this.state_initials}`;
  }
}

export default City;
