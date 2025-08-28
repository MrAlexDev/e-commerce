import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_FIREBASE_DB_URL || 'https://online-shop-ef501-default-rtdb.firebaseio.com'
})

export const products = {
  list() {
    return api.get('/products.json')
  },
  create(data) {
    return api.post('/products.json', data)
  },
  update(id, data) {
    return api.patch(`/products/${id}.json`, data)
  },
  remove(id) {
    return api.delete(`/products/${id}.json`)
  }
}

export { api }



