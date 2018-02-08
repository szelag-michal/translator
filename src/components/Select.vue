<template>
  <div>
    <select v-model="val" @change="onChange(val)">
      <option v-for="(lang, val, i) in languages" :value="val">{{lang}}</option>
    </select>
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    props: {
      source: {
        type: [String, Array],
        required: true
      }
    },
    data() {
      return {
        languages: [],
        val: ''
      }
    },
    methods: {
      onChange: function(e) {
        this.$emit('onChangeValue', this.val);
      }
    },
    created() {

      axios.get(this.source)
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
<style>

</style>
