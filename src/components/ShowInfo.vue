<template>
  <teleport to="body">
    <div v-if="show" class="modal-backdrop" @click.self="close">
      <div class="modal" @click.stop>
        <div class="modal-body">
          <!-- Левый блок: форма редактирования -->
          <div class="modal-text">
            <label class="input-group">
              <span>Name:</span>
              <input v-model="localProduct.name" type="text" class="modal-input" />
            </label>
            <label class="input-group">
              <span>Price (UAH):</span>
              <input v-model.number="localProduct.price" type="number" class="modal-input" />
            </label>
            <label class="input-group">
              <span>Category:</span>
              <input v-model="localProduct.category" type="text" class="modal-input" />
            </label>
            <label class="input-group">
              <span>Description:</span>
              <textarea v-model="localProduct.description" class="modal-textarea"></textarea>
            </label>
            <label class="input-group">
              <span>Image URL:</span>
              <input v-model="localProduct.image" type="text" class="modal-input" />
            </label>
            <div class="modal-buttons">
              <button type="button" @click="save" class="btn btn-save">Save</button>
              <button type="button" @click="confirmDelete" class="btn btn-delete">Delete</button>
              <button type="button" @click="close" class="btn btn-close">Close</button>
            </div>
          </div>
          <!-- Правый блок: изображение -->
          <div class="modal-image">
            <img :src="imageSrc" alt="Product Image" />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { products as productsApi } from '@/services/api'

export default {
  name: 'ShowInfo',
  props: {
    show: { type: Boolean, required: true },
    product: { type: Object, required: false, default: () => ({}) }
  },
  emits: ['close', 'updated', 'deleted'],
  data() {
    return {
      localProduct: this.product ? { ...this.product } : {}
    }
  },
  watch: {
    // Синхронизируем при изменении входного prop
    product: {
      handler(newProd) {
        this.localProduct = newProd ? { ...newProd } : {}
      },
      immediate: true
    }
  },
  computed: {
    imageSrc() {
      return (this.localProduct && this.localProduct.image) || 'https://via.placeholder.com/300x300?text=No+Image'
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async save() {
      if (!this.localProduct || !this.localProduct.id) return
      try {
        await productsApi.update(this.localProduct.id, {
          name: this.localProduct.name,
          price: this.localProduct.price,
          category: this.localProduct.category,
          description: this.localProduct.description,
          image: this.localProduct.image
        })
        this.$emit('updated', { ...this.localProduct })
        this.close()
      } catch (err) {
        console.error('Save error', err)
        alert('Failed to save changes')
      }
    },
    confirmDelete() {
      if (!this.localProduct || !this.localProduct.id) return
      if (window.confirm('Are you sure you want to delete this product?')) {
        this.deleteItem()
      }
    },
    async deleteItem() {
      try {
        await productsApi.remove(this.localProduct.id)
        this.$emit('deleted', this.localProduct.id)
        this.close()
      } catch (err) {
        console.error('Delete error', err)
        alert('Failed to delete product')
      }
    }
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}
.modal {
  background: #fff;
  border-radius: 12px;
  max-width: 800px;
  width: 90%;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}
.modal-body {
  display: flex;
  flex-wrap: wrap;
}
.modal-text {
  flex: 1 1 400px;
  padding: 24px;
  box-sizing: border-box;
}
.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}
.input-group span {
  margin-bottom: 4px;
  font-weight: 600;
  color: #333;
}
.modal-input,
.modal-textarea {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;
}
.modal-input:focus,
.modal-textarea:focus {
  border-color: #4caf50;
  outline: none;
}
.modal-textarea {
  resize: vertical;
  min-height: 80px;
}
.modal-buttons {
  margin-top: 24px;
  display: flex;
  gap: 12px;
}
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}
.btn-save { background: #4caf50; color: #fff; }
.btn-save:hover { background: #43a047; }
.btn-delete { background: #f44336; color: #fff; }
.btn-delete:hover { background: #e53935; }
.btn-close { background: #9e9e9e; color: #fff; }
.btn-close:hover { background: #757575; }
.modal-image {
  flex: 8 0 300px;
  /* height: 300px; */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}
.modal-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
