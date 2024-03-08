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

    postLoginClient(email: String, password: String) {
        return this.api.post('/clients/login', {email: email, password: password});
    }

    postTokenClient(token: String) {
        return this.api.post('/clients/home', {header: 'Bearer ' + token});
    }

    postLoginRestaurant() {
        return this.api.post('/restaurant/login');
    }

    postTokenRestaurant() {
        return this.api.post('/restaurant/home');
    }
}
