<template>
  <form @submit.prevent="$emit('submit', localForm)" class="form-container">
    <div class="form-group" v-for="field in fields" :key="field.key">
      <label :for="field.key" class="form-label">{{ field.label }}</label>
      <input
        :id="field.key"
        v-model="localForm[field.key]"
        @input="clearError(field.key)"
        :type="field.type"
        :class="['form-input', { invalid: localErrors[field.key] }]"
        :placeholder="field.placeholder"
      />
      <p v-if="localErrors[field.key]" class="error-message">{{ localErrors[field.key] }}</p>
    </div>
    <div class="form-actions">
      <button type="submit" class="btn-submit">Add Product</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Form',
  props: {
    form: { type: Object, required: true },
    errors: { type: Object, required: true }
  },
  emits: ['submit'],
  data() {
    return {
      // Copy props into local for editing
      localForm: { ...this.form },
      localErrors: { ...this.errors },
      fields: [
        { key: 'name', label: 'Name', type: 'text', placeholder: 'Enter product name' },
        { key: 'price', label: 'Price (UAH)', type: 'number', placeholder: 'Enter price' },
        { key: 'category', label: 'Category', type: 'text', placeholder: 'Enter category' },
        { key: 'description', label: 'Description', type: 'text', placeholder: 'Enter description' },
        { key: 'image', label: 'Image URL', type: 'text', placeholder: 'Enter image URL (optional)' }
      ]
    }
  },
  watch: {
    // Sync prop changes
    form: {
      handler(val) { this.localForm = { ...val } },
      deep: true
    },
    errors: {
      handler(val) { this.localErrors = { ...val } },
      deep: true
    }
  },
  methods: {
    clearError(fieldKey) {
      if (this.localErrors[fieldKey]) {
        this.localErrors[fieldKey] = '';
      }
    }
  }
}
</script>

<style scoped>
.form-container {
  background: #f9f9f9;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  max-width: 100%;
  margin-bottom: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  position: relative;
}

.form-label {
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
}

.form-input {
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus {
  border-color: #4caf50;
  box-shadow: 0 0 0 3px rgba(76,175,80,0.2);
  outline: none;
}

.form-input.invalid {
  border-color: #e53935;
  background-color: #fdecea;
}

.error-message {
  position: absolute;
  bottom: -27px;
  font-size: 12px;
  color: #e53935;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.btn-submit {
  padding: 12px 24px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s, transform 0.1s;
}

.btn-submit:hover {
  background-color: #43a047;
}

.btn-submit:active {
  transform: scale(0.98);
}
</style>
