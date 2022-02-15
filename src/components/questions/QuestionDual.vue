<template>
  <v-card>
    <v-card-text class="text-center"><b>TOSS-UP</b></v-card-text>
    <v-card-text>
      {{index + 1}}) {{question.category}} <i>{{question.tossup_format}}</i>
      <span v-html="' ' + question.tossup_question.replace(/\n/g,'<br/>')"></span>
    </v-card-text>
    <v-card-text>ANSWER: {{question.tossup_answer}}</v-card-text>

    <v-divider inset thickness="1"/>

    <v-card-text class="text-center"><b>BONUS</b></v-card-text>
    <v-card-text>
      {{index + 1}}) {{question.category}} <i>{{question.bonus_format}}</i>
      <span v-html="' ' + question.bonus_question.replace(/\n/g,'<br/>')"></span>
    </v-card-text>
    <v-card-text>ANSWER: {{question.bonus_answer}}</v-card-text>

    <v-card-text>Source: {{question.source}}</v-card-text>

    <v-divider/>
  </v-card>
</template>

<script>
export default {
  name: 'QuestionDual',
  props: {
    question: Object,
    index: Number
  }
}
</script>
