import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { BlacklistService } from './blacklist.service';
import { localizedResponse } from '../utils/response';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private blacklistService: BlacklistService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.usersService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id };
    const token = this.jwtService.sign(payload);
    return localizedResponse(
      { access_token: token },
      'Login berhasil',
      'Login successful',
    );
  }

  logout(token: string) {
    this.blacklistService.add(token);
    return localizedResponse(
        null,
        'Logout berhasil',
        'Logout successful',
      );
    }
}
