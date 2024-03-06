import prisma from '../database';

export default class ItemsModel {

    static async index(restaurantId: number): Promise<any[]> {
        return await prisma.item.findMany({
            where: { restaurantId },
            select: { id: true, name: true, price: true },
        });
    }

    static async insert(restaurantId: number, name: string, price: number): Promise<any> {
        return await prisma.item.create({
            data: {
                restaurantId,
                name,
                price,
            },
        });
    }

    static async remove(itemId: number): Promise<any> {
        return await prisma.item.delete({
            where: {
                id: itemId,
            },
        });
    }

    static async update(itemId: number, name: string, price: number): Promise<any> {
        return await prisma.item.update({
            where: {
                id: itemId,
            },
            data: {
                name,
                price,
            },
        });
    }
}
