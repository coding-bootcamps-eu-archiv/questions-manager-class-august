<template>
  <div class="header__container">
    <header class="header">
      <!-- <nav>
        <router-link to="/">Home</router-link>
        |
        <router-link to="/about">About</router-link>
      </nav> -->
      <h1 class="header__title">Coding Bootcamps Europe</h1>
      <p class="header__title header__title--slogan">Question Manager</p>
    </header>
    <svg
      class="header__triangle"
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <polygon points="0,0 50,100 100,0"></polygon>
    </svg>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
.header__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: var(--clr-primary);
  padding: 1rem;
  margin-bottom: 4rem;
  gap: 1rem;
}

.header__title {
  text-transform: uppercase;
  margin: 0;
  color: var(--clr-surface);
  font-weight: bold;
}

.header__title--slogan {
  text-transform: uppercase;
  color: var(--clr-surface);
}

.header__triangle {
  min-width: 100%;
  max-height: 15px;
  fill: var(--clr-primary);
}
.header__triangle--light {
  min-width: 100%;
  height: 15px;
}
</style>
