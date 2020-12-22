import { Controller, Get, UseGuards, Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleLogin() {
        // initiates the Google OAuth2 login flow
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleLoginCallback(@Req() req,) {
        // handles the Google OAuth2 callback
        return this.authService.reportJwt(req)
    }

    @Get('protected')
    @UseGuards(AuthGuard('jwt'))
    protectedResource(@Req() req,) {
        console.log(req.user);
        return this.authService.userInfo(req);
    }
}
