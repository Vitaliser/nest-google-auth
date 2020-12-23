import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService, Provider } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly authService: AuthService) {
        super({
            clientID: process.env.clientID,                                                                      // client id from https://console.developers.google.com/
            clientSecret: process.env.clientSecret,                                                              // client secret from https://console.developers.google.com/
            callbackURL: (process.env.SSL === 'true' ? process.env.callbackURLSSL : process.env.callbackURL),    // our callback
            scope: ['email', 'profile'],                                                                         // return email and profile info from google OAuth 2.0
            passReqToCallback: true,
        });
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile, done: VerifyCallback,): Promise<any> {
        try {
            const jwt: string = await this.authService.validateOAuthLogin(
                profile.id,
                Provider.GOOGLE,
                profile.name,
                profile.emails,
            );
            const user = {
                jwt,
            };
            done(null, user);
        } catch (err) {
            done(err, false);
        }
    }
}
