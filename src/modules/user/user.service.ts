import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { AccountService } from 'src/modules/account/account.service';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  @Inject(AccountService)
  private readonly accountService: AccountService;
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  public async create(createUserDto: CreateUserDto): Promise<void> {
    const user = await this.userRepository.save(createUserDto);
    await this.accountService.create(`Default account (${user.id})`, user.id);
  }

  public async getById(id: string): Promise<User> {
    this.logger.log(`trying find user: ${id}`);
    return this.userRepository.findOne({ _id: id });
  }

  public async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  public async update(userId: string, userDto: UpdateUserDto): Promise<User> {
    const userFound = await this.userRepository.findOne({ _id: userId });

    if (!userFound) {
      throw new BadRequestException('User not found');
    }
    return this.userRepository.update(userId, userDto);
  }

  public async delete(userId: string): Promise<void> {
    await this.userRepository.delete({ _id: userId });
  }
}
