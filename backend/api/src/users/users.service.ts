import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from 'src/dto/user.dto';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    public async getOne(userId: number): Promise<UserDTO|null> {
        try {
            const user: User = await this.userRepository.findOneOrFail(userId);
            return this.entityToDTO(user);
        }
        catch (e) {
            return null;
        }
    }

    public async getUserLogin(userId: number): Promise<string|null> {
        const userDTO: UserDTO|null = await this.getOne(userId);
        if (userDTO)
            return userDTO.login;
        return null;
    }

    public async getUserImage(userId: number): Promise<string|null> {
        const userDTO: UserDTO|null = await this.getOne(userId);
        if (userDTO)
            return userDTO.img_url ;
        return null; 
    }

    public async updateImage(userId: number, image: string) {
        const userDTO: UserDTO|null = await this.getOne(userId);
        userDTO.img_url = image;
        const user: User = this.DTOToEntity(userDTO);
        await this.userRepository.save(user);
        console.log(`img : ${user.img_url}`)
    }

    public async updateLogin(userId: number, login: string) {
        const userDTO: UserDTO|null = await this.getOne(userId);
        userDTO.login = login;
        const user: User = this.DTOToEntity(userDTO);
        await this.userRepository.save(user);
    }

    private entityToDTO(user: User): UserDTO {
        const userDTO = new UserDTO();
        userDTO.id = user.id;
        userDTO.intraID  = user.intraId;
        userDTO.login = user.login;
        userDTO.firstName = user.firstName;
        userDTO.lastName = user.lastName;
        userDTO.img_url = user.img_url;

        return userDTO;
    }

    private DTOToEntity(userDTO: UserDTO): User {
        const user = new User();
        user.id = userDTO.id;
        user.intraId  = userDTO.intraID;
        user.login = userDTO.login;
        user.firstName = userDTO.firstName;
        user.lastName = userDTO.lastName;
        user.img_url = userDTO.img_url;

        return user;
    }
}