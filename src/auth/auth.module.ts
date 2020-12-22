import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
    controllers: [AuthController],
    providers: [AuthService, GoogleStrategy, JwtStrategy],
})
export class AuthModule {
}
