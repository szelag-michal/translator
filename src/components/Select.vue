<template>
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <label class="input-group-text">{{placeholder}}</label>
    </div>
    <select v-model="val" @change="onChange(val)" class="">
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
      },
      placeholder: {
        type: String
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



    }
  }
</script>
<style>

</style>
