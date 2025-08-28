<template>
  <div class="filters">
    <!-- Search input -->
    <div class="search-wrapper">
      <input
        :value="search"
        @input="$emit('update:search', $event.target.value)"
        type="text"
        placeholder="Search..."
      />
      <button
        v-if="search"
        type="button"
        class="clear-btn"
        @click="$emit('update:search', '')"
      >
        ×
      </button>
    </div>

    <!-- Price range slider -->
    <div class="price-range">
      <label>Price (UAH):</label>
      <!-- Numeric inputs -->
      <div class="inputs">
        <input
          type="number"
          v-model.number="localMin"
          :min="0"
          :max="maxPrice"
        />
        -
        <input
          type="number"
          v-model.number="localMax"
          :min="0"
          :max="maxPrice"
        />
      </div>
      <!-- Double range sliders -->
      <div class="sliders">
        <input
          class="slider slider-min"
          type="range"
          :min="0"
          :max="maxPrice"
          v-model.number="localMin"
        />
        <input
          class="slider slider-max"
          type="range"
          :min="0"
          :max="maxPrice"
          v-model.number="localMax"
        />
      </div>
    </div>

    <!-- Category buttons -->
    <div class="categories">
      <button
        v-for="c in ['All', ...categories]"
        :key="c"
        :class="{ active: c === selectedCategory }"
        @click="$emit('update:selectedCategory', c)"
      >
        {{ c }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Filters',
  props: {
    search: { type: String, default: '' },
    priceMin: { type: Number, default: 0 },
    priceMax: { type: Number, required: true },
    categories: { type: Array, default: () => [] },
    selectedCategory: { type: String, default: 'All' },
    maxPrice: { type: Number, required: true }
  },
  emits: ['update:search', 'update:priceMin', 'update:priceMax', 'update:selectedCategory'],
  data() {
    return {
      // Initialize with passed props
      localMin: this.priceMin,
      localMax: this.priceMax
    }
  },
  watch: {
    // When parent updates priceMax (e.g. after fetch), sync slider
    priceMax(val) {
      this.localMax = val
    },
    // Lower slider
    localMin(val) {
      const newVal = Math.min(val, this.localMax)
      this.localMin = newVal
      this.$emit('update:priceMin', newVal)
    },
    // Upper slider
    localMax(val) {
      const newVal = Math.max(val, this.localMin)
      this.localMax = newVal
      this.$emit('update:priceMax', newVal)
    }
  }
}
</script>

<style scoped>
.filters {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 40px;
}
.search-wrapper {
  position: relative;
}
.search-wrapper input {
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding-right: 24px;
}
.clear-btn {
  position: absolute;
  top: 50%;
  right: 6px;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  line-height: 1;
  padding: 0;
}
.price-range {
  display: flex;
  flex-direction: column;
}
.inputs {
  display: flex;
  align-items: center;
  gap: 8px;
}
.inputs input {
  width: 80px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.sliders {
  position: absolute;
  bottom: -18px;
  width: 100%;
  height: 6px;
}

.price-range {
  position: relative;
}

.price-range label {
  position: absolute;
  top: -23px;
  font-size: 14px;
}

/* Track only from slider-min */
.sliders .slider-min::-webkit-slider-runnable-track {
  background: #ccc;
  height: 6px;
  border-radius: 3px;
}
.sliders .slider-min::-moz-range-track {
  background: #ccc;
  height: 6px;
  border-radius: 3px;
}

/* Hide track of slider-max */
.sliders .slider-max::-webkit-slider-runnable-track,
.sliders .slider-max::-moz-range-track {
  background: transparent;
}

/* Common thumb styles */
.sliders input[type="range"]::-webkit-slider-thumb,
.sliders input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  background: #4caf50;
  border: 2px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: all;
  margin-top: -6px;
}

/* Ensure both thumbs visible: max above min */
.sliders .slider-min {
  z-index: 1;
}
.sliders .slider-max {
  z-index: 2;
}
.sliders .slider-min::-webkit-slider-thumb,
.sliders .slider-min::-moz-range-thumb {
  z-index: 1;
}
.sliders .slider-max::-webkit-slider-thumb,
.sliders .slider-max::-moz-range-thumb {
  z-index: 2;
}
.sliders input[type="range"] {
  position: absolute;
  width: 100%;
  margin: 0;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  pointer-events: none;
}
.sliders input[type="range"]::-webkit-slider-runnable-track {
  background: #4caf50;
  height: 6px;
  border-radius: 3px;
}
.sliders .slider-min::-webkit-slider-thumb,
.sliders .slider-max::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  background: #4caf50;
  /* border: 2px solid #fff; */
  border-radius: 50%;
  margin-top: -6px;
  pointer-events: all;
  cursor: pointer;
  z-index: 100;
}
.sliders .slider-min::-webkit-slider-thumb {
  z-index: 2;
}
.sliders .slider-max::-webkit-slider-thumb {
  z-index: 1;
}
/* Firefox */
.sliders input[type="range"]::-moz-range-track {
  background: #ccc;
  height: 6px;
  border-radius: 3px;
}
.sliders .slider-min::-moz-range-thumb,
.sliders .slider-max::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background: #4caf50;
  border: 2px solid #fff;
  border-radius: 50%;
  margin-top: 0;
  pointer-events: all;
  cursor: pointer;
  z-index: 10;
}
.sliders .slider-min::-moz-range-thumb {
  z-index: 2;
}
.sliders .slider-max::-moz-range-thumb {
  z-index: 1;
}
.categories button {
  padding: 5px 10px;
  margin-right: 10px;
  border: none;
  background: #eee;
  border-radius: 4px;
  cursor: pointer;
}
.categories button:last-child {
  margin-right: 0;
}
.categories button.active {
  background: #333;
  color: #fff;
}
</style>
