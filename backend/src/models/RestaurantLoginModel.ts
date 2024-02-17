import prisma from '../database';
import bcrypt from 'bcrypt'; //hash de senhas e comparação

class RestaurantLoginModel{
  static async authenticate (
    email: string,
    password: string
    ) {
    const restaurant = await prisma.restaurant.findUnique({where: {email}});
    if (!restaurant)
    {
      throw new Error('Login e/ou senha incorretos');
    }

    const passwordIsCorrect = await bcrypt.compare(password, restaurant.password);
    if (!passwordIsCorrect)
    {
      throw new Error('Login e/ou senha incorretos');
    }

    return { status: 'OK', restaurant };}
}

export default RestaurantLoginModel;