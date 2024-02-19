import Env from '../env';
import { InternalServerError } from '../utils/errors/http.error';
import * as nodemailer from 'nodemailer';

class EmailServiceMessageCode {
  public static readonly send_email_error = 'send_email_error';
}

export default class EmailService {
  public static async sendEmail(emailTo: string, title: string, msg: string): Promise<void> {
    const infomations = {
      service: 'gmail',
      auth: {
        user: Env.EMAIL_FROM,
        pass: Env.PASSWORD_FROM
      }
    }

    const transporter = nodemailer.createTransport(infomations);

    const mailOptions = {
      from: Env.EMAIL_FROM,
      to: emailTo,
      subject: title,
      text: msg
    };

    transporter.sendMail(mailOptions, function(error: any, info: any){
      if(error){
        throw new InternalServerError({
          msg: 'Error in sending email!',
          msgCode: EmailServiceMessageCode.send_email_error,
        });
      }
    });
  }
}