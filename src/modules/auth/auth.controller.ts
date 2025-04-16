import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/common/guards/auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async loginWithEmailController(
    @Body() body: { email: string; role: 'patient' | 'doctor' },
    @Res() response: Response,
  ) {
    const responseFromService = await this.authService.loginWithEmail(
      body.email,
      body.role,
    );

    response.status(responseFromService.statusCode).json({
      message: responseFromService.message,
      data: responseFromService.data,
    });
  }

  @Post('register')
  async registerWithEmailController(
    @Body() body: { name: string; email: string; role: 'patient' | 'doctor' },
    @Res() response: Response,
  ) {
    const responseFromService = await this.authService.registerWithEmail(
      body.name,
      body.email,
      body.role,
    );

    response.status(responseFromService.statusCode).json({
      message: responseFromService.message,
      data: responseFromService.data,
    });
  }

  @Post('sign-in')
  @UseGuards(AuthGuard)
  async signInWithGoogleController(
    @Req() request: Request,
    @Body() body: { role: 'patient' | 'doctor' },
    @Res() response: Response,
  ) {
    if (request.user !== undefined) {
        const responseFromService = await this.authService.signInWithGoogle({
            name: request.user['name'],
            email: request.user['email'],
            imageUrl: request.user['profile_image_url']
        }, body.role);

        response.status(responseFromService.statusCode).json({
            message: responseFromService.message,
            data: responseFromService.data
        })
    }
  }
}
