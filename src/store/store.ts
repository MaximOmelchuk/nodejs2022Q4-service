import { UserEntity } from 'src/user/entities/user.entity';
export class Store {
  users: UserEntity[] = [];
  artist: UserEntity[] = [];
  //   private track: User[] = [];
  //   private album: User[] = [];
  //   private favorites: User[] = [];
}

const store = new Store();
export default store;
