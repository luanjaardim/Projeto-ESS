static async getByEmail(email: string){
    const restaurant = await prisma.restaurant.findUnique({where: {email : email}});
 
     if(!restaurant) { throw new NotFoundError('Email not found.');}
 
   return restaurant;
   }