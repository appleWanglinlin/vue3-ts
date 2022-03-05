<template>
  <h4>{{ message }}</h4>
</template>

<script>
export default {
  data() {
    return {
      message: '12'
    }
  },
  created () {
    console.log('message', this.message)
  }
}
</script>

<style>
h4 {
  color: bisque;
}
</style>