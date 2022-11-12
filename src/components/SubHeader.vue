<template>
  <h2>{{ subheader }}</h2>
  <div v-if="title" class="title-description">
    <div>
      <h4>Title:</h4>
      <p>{{ title }}</p>
    </div>
    <div>
      <h4>Author:</h4>
      <p>Comming soon!</p>
    </div>
    <div>
      <h4>Description:</h4>
      <p>{{ description }}</p>
    </div>
    <div>
      <h4>Date:</h4>
      <p>{{ date }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "subHeader",
  props: {
    subheader: String,
    title: String,
    description: String,
    date: String,
  },
};
</script>
<style scoped>
h2 {
  color: var(--clr-primary);
}
.title-description {
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  box-shadow: var(--clr-primary) 0px 2px 5px 0px,
    var(--clr-primary-inactive) 0px 1px 1px 0px;
  background-color: var(--clr-surface);
  border-radius: 2px;
  padding: 0.5rem 1.25rem;
}
h4 {
  color: var(--clr-primary);
}
p {
  color: var(--clr-secondary);
}
</style>
