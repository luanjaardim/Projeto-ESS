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
        return this.api.get('/restaurants/');
    }

    getAllItems() {
        return this.api.get('/items/');
    }

    getItems(restaurantId: number) {
        return this.api.get(`/restaurants/${restaurantId}/items/`);
    }

    async getUser(userId: number) {
        const users = await this.api.get(`/clients/`);
        return users.data.find((user: any) => user.id === userId);
    }

    async getShoppingCart(userId: number) {
        const cart = (await this.api.get(`/${userId}/shopping_cart/`)).data;
        const items = (await this.getAllItems()).data;
        const itemsInCart = [];
        for(var i = 0; i < cart.length; i++){
            items.find((item: any) => {
                if (item.id === cart[i].itemId) {
                    itemsInCart.push({ id: item.id, name: item.name, price: item.price, quantity: cart[i].quantity });
                }
            });
        }
        return itemsInCart;
    }

    async addItemToCart(userId: number, itemId: number) {
        return this.api.post(`/${userId}/shopping_cart/`, JSON.stringify({ itemId: itemId }))
            .then((response) => response)
            .catch((error) => error.response);
    }

    async removeItemFromCart(userId: number, itemId: number) {
        return this.api.delete(`/${userId}/shopping_cart/`, { data: { itemId: itemId } })
            .then((response) => response)
            .catch((error) => error.response);
    }

    async updateItemFromCart(userId: number, itemId: number, quantity: number) {
        return this.api.put(`/${userId}/shopping_cart/`, JSON.stringify({ itemId: itemId, quantity: quantity }))
            .then((response) => response)
            .catch((error) => error.response);
    }

    async finishOrder(userId: number, price: number) {
        const orderId = (await this.api.get(`/${userId}/shopping_cart/orderId`)).data.orderId;
        return this.api.put(`/orders/${orderId}/`, JSON.stringify({ price }));
    }

    async getOrders(clientId: number, password: String) {
        return this.api.post(`/clients/${clientId}/orders`, {password: password},);
    }

    async cancelOrder(clientId: number, orderId: number, password: String, reason: String) {
        return this.api.put(`/clients/${clientId}/orders/${orderId}/cancellation`, {password: password, reason: reason}); 
    }

    postLoginClient(email: String, password: String) {
        return this.api.post('/clients/login', {email: email, password: password});
    }

    postTokenClient(token: String) {
        return this.api.post('/clients/home', {header: 'Bearer ' + token});
    }

    postLoginRestaurant(email: String, password: String) {
        return this.api.post('/restaurant/login', {email: email, password: password});
    }

    postTokenRestaurant(token: String) {
        return this.api.post('/restaurant/home', {header: 'Bearer ' + token});
    }
}