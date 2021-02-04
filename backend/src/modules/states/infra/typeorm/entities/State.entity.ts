import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('states')
class State {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // e.g. RS, SC, SP...
  @Column()
  initials: string;

  // e.g. Rio Grande do Sul
  @Column()
  name: string;
}

export default State;
