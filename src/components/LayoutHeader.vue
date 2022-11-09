<template>
  <header>
    <div class="header__top">
      <!-- <nav>
        <router-link to="/">Home</router-link>
        |
        <router-link to="/about">About</router-link>
      </nav> -->
      <h1 class="header__title">Coding Bootcamps Europe</h1>
      <p class="header__title header__title--slogan">Question Manager</p>
    </div>

    <div class="header__bottom">
      <svg
        class="header__triangle"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polygon points="0,0 50,100 100,0"></polygon>
      </svg>

      <svg
        class="header__triangle--2"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polygon points="0,0 50,100 100,0"></polygon>
      </svg>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  /*justify-content: center;
  align-items: center;
  background-color: var(--clr-primary);*/
}
.header__top {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: var(--clr-primary);
  padding-top: 1.25rem;
  margin: 0;
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
.header__bottom {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 15px;
}
.header__triangle {
  background-color: var(--clr-light);
  fill: var(--clr-primary);
  width: 100%;
}
.header__triangle--2 {
  width: 100%;
  fill: var(--clr-light);
}
</style>
