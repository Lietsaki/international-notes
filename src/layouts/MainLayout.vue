<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title>
          International Notes
        </q-toolbar-title>
        <!-- Language switcher -->
        <q-btn
          label="App Languages"
          icon="translate"
          color="primary"
          unelevated
        >
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item
                v-for="language in langOptions"
                :key="language.label"
                clickable
                v-close-popup
                @click="lang = language.value"
              >
                <q-item-section>{{ language.label }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <!-- <q-select
          v-model="lang"
          :options="langOptions"
          label="App Language"
          dense
          borderless
          emit-value
          map-options
          options-dense
          style="min-width: 150px"
        /> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Menu
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="row">
        <div class="col-12">
          <router-view />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue';

// I'm just a normal comment
// !  This should be deleted
// * Do not forget to update this later
// ? Should we test this feature?
// TODO: Refactor this method to be more modular
// //  Hey! I'm strikethrough #fff

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: this.$t('layout.home'),
          caption: this.$t('layout.homeDescription'),
          icon: 'home',
          link: '/'
        }
      ],
      lang: this.$i18n.locale,
      langOptions: [
        { value: 'en-us', label: 'English' },
        { value: 'es-es', label: 'Español' },
        { value: 'pt-br', label: 'Português' }
      ]
    };
  },
  watch: {
    // NOTE: In watchers, the first automatically passed argument is the new value of that property,
    // and the second one is the previous value (the one we're replacing)
    lang(newLang) {
      this.$i18n.locale = newLang;

      // 1) Save the new item in localStorage
      localStorage.setItem('lang', newLang);

      // * Update the caption in the essential links. This is done because each essential link is an object
      // * within an array, and hence every time that the locale is changed, it will not affect them.
      this.essentialLinks[0].caption = this.$t('layout.homeDescription');
      this.essentialLinks[0].home = this.$t('layout.home');
    }
  }
};
</script>
