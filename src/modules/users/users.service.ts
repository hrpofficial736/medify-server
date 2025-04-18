import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StatusCodes } from 'src/common/constants/status-codes';

@Injectable()
export class UsersService {
    constructor (private prismaService : PrismaService) {};
    async fetchDataService (role : string, email: string) {
        try {
            const user = role === "patient" ? await this.prismaService.patient.findUnique({
                where: {
                    email
                }
            }) : await this.prismaService.doctor.findUnique({
                where: {
                    email
                }
            });
            if (!user) return {
                statusCode: StatusCodes.NOT_FOUND,
                message: "User not found!"
            }
            return {
                
            }
        } catch (error) {
            
        }
    }
}
