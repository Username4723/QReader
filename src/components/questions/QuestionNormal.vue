<template>
  <v-card>
    <v-card-text>
      {{index}}) {{question.category}} - {{question.subcategory}}
    </v-card-text>

    <v-divider inset/>

    <v-card-text>{{question.text}}</v-card-text>
    <v-card-text>ANSWER: {{question.answer}}</v-card-text>

  </v-card>
</template>

<script>
export default {
  name: 'QuestionNormal',
  props: {
    question: Object,
    index: Number
  }
}
</script>
