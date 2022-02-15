<template>
  <v-col cols="auto">
    <!-- Create a switch -->
    <v-switch hide-details v-for="subcategory in Object.keys(modelValue)"
      :modelValue="modelValue[subcategory]"
      @change="update(subcategory)"
      :label="subcategory"
      color="secondary"/>
  </v-col>
</template>

<script>
export default {
  name: 'FilterCategories',
  props: {
    modelValue: Object, // The working object, ie "{subcat1: true, subcat2: false, subcat3: true}"
  },
  methods: {
    update(subcategory) {
      const object = {...this.modelValue}
      object[subcategory] = !object[subcategory];
      this.$emit("update:modelValue", object)
    }
  }
}
</script>
