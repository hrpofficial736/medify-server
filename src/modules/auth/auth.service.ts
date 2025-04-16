import { Injectable } from '@nestjs/common';
import { StatusCodes } from 'src/common/constants/status-codes';
import { PrismaService } from '../prisma/prisma.service';
import { GoogleUserInterface } from 'src/common/interfaces/google-user.interface';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  async loginWithEmail(email: string, role: string) {
    try {
      const existingUser =
        role === 'patient'
          ? await this.prismaService.patient.findUnique({
              where: {
                email,
              },
            })
          : await this.prismaService.doctor.findUnique({
              where: {
                email,
              },
            });
      if (!existingUser) {
        return {
          statusCode: StatusCodes.NOT_FOUND,
          message: 'User not found!',
        };
      }

      return {
        statusCode: StatusCodes.OK,
        message: 'User authenticated successfully!',
        data: existingUser
      };
    } catch (error) {
      return {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Internal server error!',
      };
    }
  }

  async registerWithEmail(name: string, email: string, role: string) {
    try {
      const existingUser =
        role === 'patient'
          ? await this.prismaService.patient.findUnique({
              where: {
                email,
              },
            })
          : await this.prismaService.doctor.findUnique({
              where: {
                email,
              },
            });
      if (existingUser) {
        return {
          statusCode: StatusCodes.BAD_REQUEST,
          message: 'User already exists!',
        };
      }

      const user =
        role === 'patient'
          ? await this.prismaService.patient.create({
              data: {
                email: email,
                name: name,
              },
            })
          : await this.prismaService.doctor.create({
              data: {
                email: email,
                name: name,
              },
            });

      return {
        statusCode: StatusCodes.CREATED,
        message: 'User created successfully!',
        data: user,
      };
    } catch (error) {
      return {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Internal server error!',
      };
    }
  }
  async signInWithGoogle(googleUser: GoogleUserInterface, role: string) {
    try {
      const existingUser =
        role === 'patient'
          ? await this.prismaService.patient.findUnique({
              where: {
                email: googleUser.email,
              },
            })
          : await this.prismaService.doctor.findUnique({
              where: {
                email: googleUser.email,
              },
            });
      if (existingUser) {
        return {
          statusCode: StatusCodes.OK,
          message: 'User authenticated successfully!',
        };
      }

      const user =
        role === 'patient'
          ? await this.prismaService.patient.create({
              data: {
                email: googleUser.email,
                name: googleUser.name,
              },
            })
          : await this.prismaService.doctor.create({
              data: {
                email: googleUser.email,
                name: googleUser.name,
              },
            });

      return {
        statusCode: StatusCodes.CREATED,
        message: 'User created successfully!',
        data: user,
      };
    } catch (error) {
      return {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Internal server error!',
      };
    }
  }
}
