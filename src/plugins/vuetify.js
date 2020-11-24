import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: "#6200EE",
        secondary: "#03DAC6",
        accent: "#B15DFF",
        error: "#FF6859",
        info: "#72DEFF",
        success: "#4CAF50",
        warning: "#FFCF44"
      }
    }
  }
});
