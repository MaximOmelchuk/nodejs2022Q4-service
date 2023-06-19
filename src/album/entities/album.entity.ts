import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('AlbumEntity')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null;
}
