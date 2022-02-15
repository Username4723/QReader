import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

const app = createApp(App)
  .use(vuetify)

// Load the configs for each comp
app.config.globalProperties.$competitions = {
  sciencebowl: {
    ...require("./data/questions_sciencebowl_metadata.json"),
    name: "National Science Bowl",
    points: [4, 10], // Use for all possible point values
    timers: { // Can be either an array of numbers or an object
      "Toss-Up": 5,
      "Bonus": 20
    },
    timerWarnings: true, // Should a 5s warning be audibly played
    questionFormat: "dual", // Options: "dual" for SKB-style questions, "normal" by default,
    roundLength: 25, // Mutually exclusive with roundFormat
    eachCategoryHasEquualWeight: true // This also applies to subcategories
  },
  quizbowl: {
    ...require("./data/questions_quizbowl_metadata.json"),
    name: "Quiz Bowl",
    points: [5, 10],
    timers: [10, 30, 45, 60, 90, 120],
    roundFormat: { // Not actually true in Quiz Bowl, but it's saved for later
      "world-language": 1,
      "social-science": 3,
      "english": 3,
      "mathematics": 3,
      "science": 3,
      "art": 3,
      "review": 1
    },
    eachCategoryHasEquualWeight: true // Only for subcategories
  }
}

app.mount('#app')
