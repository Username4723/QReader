<template>
  <div>
    <v-app-bar color="deep-purple accent-4">
      <v-btn icon @click="$emit('reset')">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-app-bar-title>{{ formattedTime }}</v-app-bar-title>

      <v-spacer/>

      <!-- display each time as a button -->
      <v-btn v-for="(time, name) in computedOptions"
        :key="name"
        color="primary"
        :disabled="timer > 0"
        @click="timer = time">
          {{name}}
      </v-btn>
      <!-- cancel button -->
      <v-btn :color="timer <= 0 ? 'error' : 'primary'" :disabled="timer <= 0" @click="timer = -1">Cancel Timer</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
const end = new Audio(require('../assets/end.mp3'))
const warn = new Audio(require('../assets/warn.mp3'))

export default {
  name: "CustomTimers",
  data: () => {
    return {
      timer: -1
    }
  },
  computed: {
    // Show the time with "Second(s)", or Time if done
    formattedTime: function() {
      if (this.timer <= 0) return "Time!"
      return this.timer == 1 ? this.timer + " Second" : this.timer + " Seconds"
    },

    // If options is an array, convert it to an object for use later
    computedOptions: function() {
      if (!Array.isArray(this.options)) return this.options;
      let object = {};
      for (var i in this.options) object[this.options[i] + "s"] = this.options[i];

      return object;
    }
  },
  watch: {
    // When timer is set, start counting down. If at 6s, play a warning.
    timer: function(value) {
      if (value > 0) {
        setTimeout(() => {
          this.timer -= 1;
          if (value == 1) end.play();
          else if (value == 6 && this.warning) warn.play();
        }, 1000);
      }
    }
  },

  props: {
    // The values in an object with keys of the button's name and values of the time associated with it
    // If options is an array, add "s" to the end to get the buttons
    options: {
      type: [Array, Object]
    },

    // Whether or not to warn the person when time is up
    warning: {
      type: Boolean,
      default: false
    }
  }
}
</script>
