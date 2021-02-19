import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from 'src/i18n';

Vue.use(VueI18n);

const i18n = new VueI18n({
  // Check if there's a language saved in localStorage and set it if so
  locale: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en-us',
  fallbackLocale: 'en-us',
  messages
});

export default ({ app }) => {
  // Set i18n instance on app
  app.i18n = i18n;
};

export { i18n };
