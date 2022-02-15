<template>
  <v-card>
    <v-row>
      <!-- Title -->
      <v-col cols="auto">
        <v-card-title>
          <slot/>
        </v-card-title>
      </v-col>

      <!-- All or nothing buttons -->
      <v-col>
        <v-btn small color="secondary" @click="modelValue = setAll(true)">All</v-btn>
        <v-btn small color="secondary" @click="modelValue = setAll(false)">None</v-btn>
      </v-col>
    </v-row>

    <!-- The actual options -->
    <v-row justify="start">
      <v-col cols="auto" v-for="(value, name) in modelValue">
        <v-switch hide-details
          v-model="modelValue[name]"
          :label="name"
          color="secondary"/>
      </v-col>
    </v-row>

  </v-card>
</template>

<script>
export default {
  name: 'FilterSimple',
  props: {
    modelValue: Object
  },
  methods: {
    setAll(value) {
      let object = {}
      for (let key in this.modelValue) {
        object[key] = value
      }
      this.$emit("update:modelValue", object)
    }
  }
}
</script>
