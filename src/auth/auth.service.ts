import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

export enum Provider {
    GOOGLE = 'google',
}

@Injectable()
export class AuthService {

    private readonly JWT_SECRET_KEY = process.env.JWTKEY;                                        // Randomly generated key to sign jwt and verify it later

    constructor() {
    }

    async validateOAuthLogin(thirdPartyId: string, provider: Provider, name: string, email: string): Promise<string> {
        try {
            const payload = {thirdPartyId, provider, name, email,};
            return sign(payload, this.JWT_SECRET_KEY, {expiresIn: 3600});                        // create jwt, valid for 1 hour
        } catch (err) {
            throw new InternalServerErrorException('validateOAuthLogin', err.message);
        }
    }

    reportJwt(req) {
        const jwt: string = req.user.jwt;
        if (jwt) return {
            message: 'authentication succeeded',
            jwt: jwt,
        };
        else return {message: "Authentication failed."}
    }

    userInfo(req) {
        if (!req.user) {
            return 'nothing found!';
        }
        return {
            message: 'success',
            familyName: req.user.name.familyName,
            firstName: req.user.name.givenName,
            email: req.user.email[0].value,
        };
    }
}
