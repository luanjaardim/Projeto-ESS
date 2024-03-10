import prisma from '../database';
import { Prisma } from '@prisma/client';
import NotFoundError from '../errors/NotFoundError';
import AuthenticationError from '../errors/AuthenticationError';
import InternalServerError from '../errors/InternalServerError';


class RecoverPasswordModel{
  static async getByEmail(email: string){
      const restaurant = await prisma.restaurant.findUnique({where: {email : email}}); //verifica se o e-mail existe no banco
  
      if(!restaurant) { throw new NotFoundError('Email not found.');} // se não existir jogar
  
    return restaurant;
    }

  static async setCodeByEmail (email: string){
    try{
      const updatedRestaurant = await prisma.restaurant.update({
        where: { email: email },
        data: { code: "12345" }, // se der tempo, fazer enviar para o email
      });
    } catch(error) {
      throw new InternalServerError('Error generating code.'); // todo: criar o error 
    }
  }

  static async verifyCode (email: string, code: string){
    const restaurant = await prisma.restaurant.findUnique({where: {email : email}}); //verifica se o e-mail existe no banco

    if(!restaurant) { throw new NotFoundError('Email not found.');} // se não existir jogar
    if(restaurant.code !== code) { throw new AuthenticationError('Incorrect code.')};
  }

  static async updatePasswordByEmail (email: string, password: string){
    const restaurant = await prisma.restaurant.findUnique({where: {email : email}}); //verifica se o e-mail existe no banco

    if(!restaurant) { throw new NotFoundError('Email not found.');} // se não existir jogar

    try{
      const updatedRestaurant = await prisma.restaurant.update({
        where: { email: email },
        data: { password: password }, // se der tempo, fazer enviar para o email
      });
    } catch(error) {
      throw new InternalServerError('Error updating password.'); // todo: criar o error 
    }
  }
}
 

export default RecoverPasswordModel;