<template>
  <footer class="footer" id="footer">
    <p class="authors">Margarita | Claudia | Kadir | Nina</p>
    <p>August Klasse 2022</p>
    <p>Coding Bootcamps Europe GmbH</p>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  background-color: var(--clr-primary);
  color: var(--clr-surface);
}

p {
  font-size: 0.8rem;
}
.authors {
  font-size: 1.1rem;
  font-weight: 900;
  margin-top: 2.5rem;
}

p:last-of-type {
  margin-bottom: 2.5rem;
}
</style>
