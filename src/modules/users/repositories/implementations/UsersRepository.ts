import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = Object.assign(new User(), {
      name,
      email,
    });
    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  turnAdmin({ id }: User): User {
    const userIndex = this.users.findIndex((user) => user.id === id);

    this.users[userIndex] = { ...this.users[userIndex], admin: true };

    return this.users[userIndex];
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
