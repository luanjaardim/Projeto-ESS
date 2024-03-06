import ItemsModel from '../models/ItemsModel';
import { Request, Response, Router } from 'express';

const parseWithError = (value: string, errorStr: string, asInt?: boolean) => {
    const parsedValue = asInt ? parseInt(value) : parseFloat(value);
    if (isNaN(parsedValue)) {
        throw new Error(errorStr);
    }
    return parsedValue;
}

export default class ItemsController {
    private static prefix = '/restaurants/:restaurant_id/items';

    static setupRoutes(router: Router) {
        router.get(this.prefix, this.indexItems);
        router.post(this.prefix, this.insertItem);
        router.delete(this.prefix, this.removeItem);
        router.put(this.prefix, this.updateItem);
    }

    private static async indexItems(req: Request, res: Response) {
        try {
            const restaurantId = parseWithError(req.params.restaurant_id, 'Invalid restaurant id', true);
            const items = await ItemsModel.index(restaurantId);
            res.status(200).json(items);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    private static async insertItem(req: Request, res: Response) {
        try {
            const restaurantId = parseWithError(req.params.restaurant_id, 'Invalid restaurant id', true);
            const { name, price } = req.body;
            const price_float : number = parseWithError(price, 'Invalid price');
            const item = await ItemsModel.insert(restaurantId, name, price_float);
            res.status(201).json({ message: 'Item created', item: item });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    private static async removeItem(req: Request, res: Response) {
        try {
            const itemId = parseWithError(req.body.itemId, 'Invalid Item id', true);
            const item = await ItemsModel.remove(itemId);
            res.status(204).json({ message: 'Item removed', item: item });
        }
        catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    private static async updateItem(req: Request, res: Response) {
        try{
            const itemId = parseWithError(req.body.itemId, 'Invalid Item id', true);
            const { name, price } = req.body;
            var price_float : number = parseWithError(price, 'Invalid price');
            const item = await ItemsModel.update(itemId, name, price_float);
            if(item === null)
                res.status(404).json({ message: 'Item not found' });
            else
                res.status(200).json({ message: 'Item updated', item: item });
        } catch (error: any) {
            switch(error.code){
                case 'P2025':
                    res.status(400).json({ message: 'Item not found' });
                    break;
                default:
                    res.status(400).json({ message: error.message });
            }
        }
    }
}
