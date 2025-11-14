import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_FIREBASE_DB_URL || 'https://online-shop-ef501-default-rtdb.firebaseio.com/'
})

// Mock data for development
const mockProducts = {
  "product1": {
    name: "Smartphone",
    price: 599,
    category: "Electronics",
    description: "Latest model smartphone with advanced features",
    image: "https://via.placeholder.com/200x200/007bff/ffffff?text=Phone"
  },
  "product2": {
    name: "Laptop",
    price: 999,
    category: "Electronics", 
    description: "High-performance laptop for work and gaming",
    image: "https://via.placeholder.com/200x200/28a745/ffffff?text=Laptop"
  },
  "product3": {
    name: "Coffee Mug",
    price: 15,
    category: "Home",
    description: "Ceramic coffee mug with beautiful design",
    image: "https://via.placeholder.com/200x200/dc3545/ffffff?text=Mug"
  },
  "product4": {
    name: "Running Shoes",
    price: 89,
    category: "Sports",
    description: "Comfortable running shoes for daily exercise",
    image: "https://via.placeholder.com/200x200/ffc107/000000?text=Shoes"
  }
};

export const products = {
  async list() {
    try {
      return await api.get('/products.json')
    } catch (error) {
      if (error.response?.status === 401) {
        console.warn('Firebase access denied, using mock data');
        return { data: mockProducts };
      }
      throw error;
    }
  },
  async create(data) {
    try {
      return await api.post('/products.json', data)
    } catch (error) {
      if (error.response?.status === 401) {
        console.warn('Firebase access denied, simulating product creation');
        const id = 'mock_' + Date.now();
        return { data: { name: id } };
      }
      throw error;
    }
  },
  async update(id, data) {
    try {
      return await api.patch(`/products/${id}.json`, data)
    } catch (error) {
      if (error.response?.status === 401) {
        console.warn('Firebase access denied, simulating update');
        return { data: data };
      }
      throw error;
    }
  },
  async remove(id) {
    try {
      return await api.delete(`/products/${id}.json`)
    } catch (error) {
      if (error.response?.status === 401) {
        console.warn('Firebase access denied, simulating deletion');
        return { data: null };
      }
      throw error;
    }
  }
}

export { api }



