import { BadRequestException, Injectable } from '@nestjs/common';
const Razorpay = require('razorpay');
import { StatusCodes } from 'src/common/constants/status-codes';
import { VerifyPaymentDto } from 'src/common/interfaces/payment-interfaces';
import * as crypto from "crypto";

@Injectable()
export class PaymentsService {
  private razorpay: any;
  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });
  }
  async paymentService(amount: string) {
    const options = {
      amount: amount,
      currency: 'INR',
      receipt: 'order_rcptid_11',
    };

    try {
      const response = await this.razorpay.orders.create(options);
      return {
        statusCode: StatusCodes.CREATED,
        message: 'Order Created!',
        data: response,
      };
    } catch (error) {
      return {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error!',
      };
    }
  }

  async paymentVerifyService(verifyPaymentDto: VerifyPaymentDto) {
    
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        verifyPaymentDto;

      const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
      const expectedSign = crypto.
        createHmac('sha256', process.env.RAZORPAY_SECRET!)
        .update(sign)
        .digest('hex');
      if (expectedSign !== razorpay_signature) {
        throw new BadRequestException('Invalid signature');
      }
      return {
        statusCode: StatusCodes.OK,
        message: 'Order Verified!',
      };
    } catch (error) {
      return {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error!',
      };
    }
  }
}
