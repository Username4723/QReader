<template>
  <v-card class="text-center">
    <v-card v-if="!scores">
      <v-card-title>Scores Not Found</v-card-title>
    </v-card>
    <v-card v-if="scores" class="bg-danger text-light">
      <v-card-title>Red: {{scores.red}}</v-card-title>
    </v-card>
    <br/>
    <v-card v-if="scores" class="bg-success text-light">
      <v-card-title>Green: {{scores.green}}</v-card-title>
    </v-card>
  </v-card>
</template>

<script>
export default {
    name: "LargeScoreboard",
    props: {
        scores: Object
    }
}
</script>