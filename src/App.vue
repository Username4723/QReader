<template>
  <v-app id="app" fluid class="primary fill-height">
    <!-- Timers -->
    <CustomTimers :options="competition.timers" :warning="competition.timerWarnings" @reset="this.round_questions = undefined"/>

    <v-main>
      <!-- Loading Overlay -->
      <v-overlay :modelValue="loading" contained class="align-center justify-center">
          <v-progress-circular indeterminate color="primary"/>
      </v-overlay>

      <!-- Setup -->
      <v-container v-if="round_questions == undefined" fluid>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>Round Setup</v-card-title>

              <!-- Show all the competitions and have a button to select each -->
              <v-card-subtitle>Select Competition</v-card-subtitle>
              <v-row>
                <v-col>
                  <v-radio-group v-model="selected_competition" row mandatory>
                    <v-radio v-for="(competition, key) in $competitions"
                      :label="competition.name" :value="key" color="secondary"/>
                    </v-radio-group>
                  </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>

        <!-- Allow filtering by category -->
        <v-row>
          <v-col>
            <FilterCategories v-model="selected_categories[selected_competition]" :categories="competition.categories"/>
          </v-col>
        </v-row>

        <!-- Allow filtering by source -->
        <v-row>
          <v-col>
            <FilterSimple v-model="selected_sources[selected_competition]" :categories="competition.sources">Sources</FilterSimple>
          </v-col>
          <v-col>
            <FilterSimple v-model="selected_difficulties[selected_competition]" :categories="competition.difficulties">Difficulties</FilterSimple>
          </v-col>
        </v-row>

        <!-- Allow filtering by difficulty -->

        <!-- Summary -->
        <v-row>
          <v-col>
            <v-card>
              <!-- Generate the round -->
              <v-btn @click="generate_round()">Generate Round</v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- Questions -->
      <v-container v-else fluid>
        <v-row v-for="(question, index) in round_questions" :key="index">
          <v-col>
            <QuestionDual v-if="competition.questionFormat == 'dual'"
              :question="question" :index="index"/>
            <QuestionNormal v-else
              :question="question" :index="index"/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Scoreboard -->
    <v-bottom-navigation>
      <SmallScoreboard v-if="scores" v-model="scores" :modifiers="competition.points"/>
    </v-bottom-navigation>
  </v-app>
</template>

<script>

import SmallScoreboard from './components/SmallScoreboard.vue'
import CustomTimers from './components/CustomTimers.vue'
import FilterCategories from './components/FilterCategories.vue'
import FilterSimple from './components/FilterSimple.vue'

import QuestionDual from './components/questions/QuestionDual.vue'
import QuestionNormal from './components/questions/QuestionNormal.vue'

import JsonOptimize from 'json-optimize'

export default {
  name: 'App',
  components: {
    CustomTimers,
    SmallScoreboard,
    FilterCategories,
    FilterSimple,

    QuestionDual,
    QuestionNormal
  },
  computed: {
    competition: function() {
      return this.$competitions[this.selected_competition]
    },
  },

  methods: {
    random_questions() {
      const questions = this.loaded_data[this.selected_competition].filter(it =>
        this.selected_categories[this.selected_competition][it.category][!it.subcategory ? null : it.subcategory] &&
        this.selected_difficulties[this.selected_competition][!it.difficulty ? null : it.difficulty] &&
        this.selected_sources[this.selected_competition][!it.source ? null : it.source])
      const index = Math.floor(Math.random() * questions.length - 25)
      return questions.slice(index, index + 25)
    },

    async generate_round() {
      this.round_questions = this.random_questions()
      this.scores = {
        red: 0,
        green: 0
      }

      this.seen_questions = this.seen_questions.concat(this.round_questions.map(it => it.id))
      localStorage.setItem("seen-items", JSON.stringify(this.seen_questions))
    },
  },

  data: function () {
    let seen_questions_text = localStorage.getItem("seen-items")
    let create_empty = (creator) => {
      let object = {}
      for (let key in this.$competitions) object[key] = creator(this.$competitions[key])
      return object
    }

    return {
      seen_questions: seen_questions_text == null ? [] : JSON.parse(seen_questions_text),

      selected_categories: create_empty(it => {
        let object = {}
        for (let category in it.categories) {
          object[category] = {}
          it.categories[category].forEach(it => object[category][it] = true)
        }
        return object
      }),

      selected_sources: create_empty(it => {
        let object = {};
        it.sources.forEach(it => object[it] = true);
        return object;
      }),

      selected_difficulties: create_empty(it => {
        let object = {};
        it.difficulties.forEach(it => object[it] = true);
        return object;
      }),

      selected_competition: "sciencebowl",

      round_questions: undefined,
      scores: undefined,

      loading: false,
      loaded_data: {},
      unpack: new JsonOptimize().unpack,
      publicPath: process.env.BASE_URL
    }
  },

  watch: {
    //when scores are changed, send them to the other window
    scores: {
      handler: function(newValue) {
        if (!window.api) return;
        window.api.send("scores-send", JSON.stringify(newValue));
      },
      deep: true
    },

    selected_competition: {
      handler: async function(newValue) {
        if (this.loaded_data[newValue] == null) {
          this.loading = true
          this.axios.get(`${this.publicPath}questions_${newValue}.json`).then(response => {
            this.loaded_data[newValue] = this.unpack(response.data)
            this.loading = false
          })
        }
      },
      immediate: true
    }
  }
}
</script>
<style>
body {
  background-color: black;
}
</style>
