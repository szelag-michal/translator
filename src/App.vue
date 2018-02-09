<template>
  <div id="app" class="container">
    <div class="row">

      <div class="col">
        <select-language :placeholder="'From'" :source="apiUrl" v-on:onChangeValue="updatedLangFrom($event)" class="form-inline"></select-language>
      </div>
      <div class="col"><select-language :placeholder="'To'" :source="apiUrl" v-on:onChangeValue="updatedLangTo($event)"  class="form-inline"></select-language></div>
      <div class="col-12">
        <div v-if="langFrom && langTo" class="d-flex">
          <input type="text" placeholder="enter your word" v-model="searchedWord" @keyup.enter="search($event.target.value)" class="form-control w-100 mr-3">
          <button class="btn btn-primary" @click="search(searchedWord)">search</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="jumbotron-fluid">
          <h1>
            <span v-if="!langTo">Select Languages</span>
            <span v-for="translation in translations">
      {{translation}}
    </span></h1>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
const API_URL = 'https://translate.yandex.net/api/v1.5/tr.json/';
const API_KEY = 'trnsl.1.1.20180208T144525Z.0de95503d1a75cb8.e00c36889547605063341cb2c41b6a2cc11ddeae';

import axios from'axios';
import SelectLanguage from './components/Select.vue';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faExchangeAlt from '@fortawesome/fontawesome-free-solid/faExchangeAlt'


export default {
  components: {
    'select-language': SelectLanguage,
    'font-awesome-icon': FontAwesomeIcon
  },
	data() {
		return {
			translations: [],
			languages: [],
			langFrom: '',
			langTo: '',
			searchedWord: '',
			word: '',
      apiUrl: API_URL+'getLangs?key='+API_KEY+'&ui=en'
		}
	},
  computed: {
    exchange () {
      return faExchangeAlt
    },
    search: function(e) {
      this.searchedWord = e;
      console.log(e);
      axios.get(API_URL+'translate?key='+API_KEY+'&lang='+this.langFrom+'-'+this.langTo+'&text='+e)
        .then(response => {
          this.translations = response.data.text;
          console.log(API_URL+'translate?key='+API_KEY+'&lang=en-pl&text='+e);
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
  },

	methods: {
    updatedLangFrom: function(e) {
      this.langFrom = e
    },
    updatedLangTo: function(e) {
      this.langTo= e;
    },
//		switchLanguages: function(f, t) {
//				this.langTo = f;
//				this.langFrom = t;
//
//          this.search(this.translations[0]);
//		},
	},

}
</script>

<style lang="scss">
  @import '../node_modules/bootstrap/scss/bootstrap';
  #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
