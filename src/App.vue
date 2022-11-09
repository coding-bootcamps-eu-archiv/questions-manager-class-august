<template>
  <LayoutHeader />
</template>

<script>
import LayoutHeader from "./components/LayoutHeader.vue";
export default {
  components: {
    LayoutHeader,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&family=Source+Sans+Pro&display=swap");
:root {
  --clr-primary-inactive: rgba(106, 28, 195, 0.38);
  --clr-primary: #6a1cc3;
  --clr-secondary: #8849cf;
  --clr-dark-purple: #4b148a;
  --clr-text: rgba(0, 0, 0, 0.87);
  --clr-surface: #fbfbfb;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 14px;
}

h1,
h2,
h3,
h4,
h5 {
  font-family: "Montserrat", sans-serif;
}

p {
  margin: 0;
}
</style>
