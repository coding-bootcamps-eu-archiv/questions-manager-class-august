<template>
  <h2>{{ subheader }}</h2>
</template>

<script>
export default {
  name: "subHeader",
  props: {
    subheader: String,
    type: String,
  },
};
</script>
<style scoped>
h2 {
  color: var(--clr-primary);
}
</style>
