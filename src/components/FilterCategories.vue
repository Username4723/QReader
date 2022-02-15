<template>
  <!-- Basic intro and details -->
  <v-card>
    <v-row justify="start">
      <v-col cols="auto">
        <v-card-title>Select Categories</v-card-title>
      </v-col>
      <v-col>
        <v-btn small color="secondary" @click="setAll(true)">All</v-btn>
        <v-btn small color="secondary" @click="setAll(false)">None</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <!-- Show for each category -->
      <!-- Pass a {subcat1: true, subcat2: ...} to each individual filterSubCategories -->
      <v-col v-for="(subcategories, category) in modelValue" :key="category" cols="auto">
        <v-card-subtitle>{{category}}</v-card-subtitle>
        <FilterSubCategories v-model="modelValue[category]"/>
        <v-divider vertical/>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import FilterSubCategories from './FilterSubCategories.vue'

export default {
  name: 'FilterCategories',
  components: {
    FilterSubCategories,
  },

  // Only accept an input of {cat1: {subcat1: true, subcat2: false, subcat3: true, ...}, ...}
  props: {
    modelValue: Object
  },

  methods: {
    // Emits an update event with a value only composing of {cat1: {subcat1: value, subcat2: value, ...}, ...}
    setAll(value) {
      let object = {};
      for (let categoryName in this.modelValue) {
        object[categoryName] = {};
        for (let subcategoryName in this.modelValue[categoryName]) {
          object[categoryName][subcategoryName] = value;
        }
      }

      this.$emit("update:modelValue", object);
    }
  }
}
</script>
