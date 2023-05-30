import { UserEntity } from 'src/user/entities/user.entity';
export class Store {
  users: UserEntity[] = [];
  //   artist: UserEntity[] = [];
  //   track: User[] = [];
  //   album: User[] = [];
  //   favorites: User[] = [];
}

const store = new Store();
export default store;
