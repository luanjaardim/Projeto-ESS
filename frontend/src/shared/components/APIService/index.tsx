import axios from "axios";
import { AxiosInstance } from "axios";

interface Restaurant {
  name?: string;
  email?: String;
  CNPJ?: string;
  password?: string;
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
}
