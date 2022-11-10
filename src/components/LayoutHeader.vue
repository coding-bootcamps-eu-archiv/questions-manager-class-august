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
  margin-bottom: 4.5rem;
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
  max-height: 20px;
  position: relative;
}
.header__triangle {
  position: absolute;
  background-color: var(--clr-secondary);
  fill: var(--clr-primary);
  width: 100%;
  height: 15px;
}
.header__triangle--2 {
  position: absolute;
  width: 100%;
  height: 15px;
  fill: var(--clr-secondary);
  top: 1rem;
}
</style>
