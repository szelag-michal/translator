<template>
  <div id="app">
	  <select v-model="langFrom">
	  	<option v-for="(lang, i, value) in languages" :value="i">{{lang}}</option>
	  </select>
	  <select v-if="langFrom" v-model="langTo">
	  	<option v-for="(lang, i, value) in languages" :value="i">{{lang}}</option>
	  </select>
	  <div v-if="langFrom && langTo">
	  		<input type="text" placeholder="enter your word" v-model="searchedWord" @keyup.enter="search($event.target.value)">
			<button @click="switchLanguages(langFrom, langTo)">switch</button>
			<button @click="search(searchedWord)">search</button>
	  </div>

	<div v-if="searchedWord" v-for="translation in translations">
		{{translation}}
	</div>
  </div>

</template>

<script>
const API_URL = 'https://translate.yandex.net/api/v1.5/tr.json/';
const API_KEY = 'trnsl.1.1.20180208T144525Z.0de95503d1a75cb8.e00c36889547605063341cb2c41b6a2cc11ddeae';
import axios from'axios';

export default {
	data() {
		return {
			translations: [],
			languages: [],
			langFrom: '',
			langTo: '',
			searchedWord: '',
			word: ''
		}
	},
	methods: {
		onSearch: function(e) {
      //this.searchedWord = e;
      this.search(e);
		},
		switchLanguages: function(f, t) {
				this.langTo = f;
				this.langFrom = t;

				console.log(this.langFrom, this.langTo, this.translations[0]);
				this.search(this.translations[0]);
		},
		selectLanguage: function(e) {
			console.log(e)
		},
		search: function(e) {
			this.searchedWord = e;
			axios.get(API_URL+'translate?key='+API_KEY+'&lang='+this.langFrom+'-'+this.langTo+'&text='+e)
				.then(response => {
					this.translations = response.data.text;
					console.log(API_URL+'translate?key='+API_KEY+'&lang=en-pl&text='+e);
				})
				.catch(e => {
					this.errors.push(e)
				})
		}
	},
	created() {

			axios.get(API_URL+'getLangs?key='+API_KEY+'&ui=en')
				.then(response => {
					this.languages = response.data.langs;
					console.log(response);
				})
				.catch(e => {
					this.errors.push(e)
				})

	}
}
</script>

<style lang="scss">
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
