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

    getClients() {
        return this.api.get('/clients');
    }

    createClients(clientData){
        return this.api.post('/clients',clientData);
    }

    deleteClients(clientsid: number){
        return this.api.delete(`/clients/${clientsid}`);
    }

    updateClients(clientsid: number, client: Client) {
        return this.api.put(`/clients/${clientsid}`, client);
      }


}
