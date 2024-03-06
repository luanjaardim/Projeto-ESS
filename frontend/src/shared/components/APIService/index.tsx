import axios from 'axios';
import { AxiosInstance } from 'axios';

export default class APIService {
    private api: AxiosInstance;
    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:5001',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    getRestaurants() {
        return this.api.get('/restaurants');
    }

    getItems(restaurantId: number) {
        return this.api.get(`/restaurants/${restaurantId}/items`);
    }
}
