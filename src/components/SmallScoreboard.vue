<template>
  <v-container>
    <v-row justify="end">
      <!-- Red -->
      <v-col cols="auto">
        Red: {{modelValue.red}}
      </v-col>
      <v-col>
        <v-btn v-for="modifier in modifiers" :key="modifier" @click="modelValue.red += modifier">+{{modifier}}</v-btn>
        <v-btn v-for="modifier in reversedModifiers" :key="modifier"  @click="modelValue.red -= modifier">-{{modifier}}</v-btn>
      </v-col>

      <!-- Green -->
      <v-col cols="auto">
        <v-btn v-for="modifier in modifiers" :key="modifier"  @click="modelValue.green -= modifier">-{{modifier}}</v-btn>
        <v-btn v-for="modifier in reversedModifiers" :key="modifier" @click="modelValue.green += modifier">+{{modifier}}</v-btn>
      </v-col>
      <v-col cols="auto">
        Green: {{modelValue.green}}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    name: "SmallScoreboard",
    computed: {
      reversedModifiers: function() {
        return this.modifiers.slice().reverse()
      }
    },
    props: {
        modelValue: Object,
        modifiers: {
          type: Array
        }
    }
}
</script>
