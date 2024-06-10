<template>

    <button :class="props.mode">
        <slot></slot>
    </button>


</template>

<script setup>

import { defineProps } from 'vue'
const props = defineProps({
  mode:{
    default: 'outline'
  }
})





</script>

<style lang="less" scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
}

.close {
  background-color: red;
  border-color: red;
  border: none;
}
.flat {
  background-color: transparent;
  color: rgb(70, 213, 130);
  border-color: rgb(70, 213, 130);
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.close:hover,
.close:active,
.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}
</style>