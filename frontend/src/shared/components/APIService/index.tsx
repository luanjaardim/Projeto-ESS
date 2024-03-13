import axios from "axios";
import { AxiosInstance } from "axios";

interface Restaurant {
  name?: string;
  email?: String;
  CNPJ?: string;
  password?: string;
}

interface Client {
  password?: string;
  name?: string;
  cpf?: string;
  email?: String;
  address?: String;
}




export default class APIService {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5001",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  getRestaurants() {
    return this.api.get("/restaurants");
  }

  getItems(restaurantId: number) {
    return this.api.get(`/restaurants/${restaurantId}/items`);
  }

  createRestaurant(restaurant: Restaurant) {
    return this.api.post("/restaurants", restaurant);
  }

  deleteRestaurant(restaurantId: number) {
    return this.api.delete(`/restaurants/${restaurantId}`);
  }

  updateRestaurant(restaurantId: number, restaurant: Restaurant) {
    return this.api.put(`/restaurants/${restaurantId}`, restaurant);
  }

  getAllItems() {
      return this.api.get('/items/');
  }

  async getUser(userId: number) {
      const users = await this.api.get(`/clients/`);
      return users.data.find((user: any) => user.id === userId);
  }

  getCartItemsInfo(cart: any, items: any, restaurants: any) {
    return cart.map((cartItem: any) => {
         const item = items.find((item) => cartItem.itemId === item.id);
         return {
           id: item.id,
           name: item.name,
           price: item.price,
           quantity: cartItem.quantity,
           restaurantName: (restaurants.find((restaurant: any) => restaurant.id === item.restaurantId)).name
         }
    });
  }


  async getShoppingCart(userId: number) {
      const cart = (await this.api.get(`/${userId}/shopping_cart/`)).data;
      const items = (await this.getAllItems()).data;
      const restaurants = (await this.getRestaurants()).data;
      return this.getCartItemsInfo(cart, items, restaurants);
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
  
  getClients() {
    return this.api.get("/clients");
  }


  createClient(client: Client) {
    return this.api.post("/clients", client);
  }

  deleteClient(clientId: number) {
    return this.api.delete(`/clients/${clientId}`);
  }

  updateClient(clientId: number, client: Restaurant) {
    return this.api.put(`/clients/${clientId}`, client);
  }
}
