<template>
  <section class="sessions">
    <form class="sessions__inputform">
      <div class="sessions__input-wrapper">
        <label for="titleSession">Title</label>
        <input
          type="text"
          id="titleSession"
          v-model="title"
          placeholder="Title of your new session"
        />
        <label for="descriptionSession">Description</label>
        <input
          type="text"
          id="descriptionSession"
          v-model="description"
          placeholder="Description of your new session"
        />
        <button
          @click.prevent="AddSessionData(this.title, this.description)"
          class="sessions__add-button"
        >
          Add Session
        </button>
      </div>
    </form>
    {{ newSession }}
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      description: "",
      newSession: {},
    };
  },
  methods: {
    async AddSessionData(title, description) {
      this.newSession = { title, description };
      const response = await fetch(
        process.env.VUE_APP_API_BASE_URL + "/sessions",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(this.newSession),
        }
      );
      this.newSession = await response.json();
      this.$router.push({
        name: "home",
        params: { id: this.newSession.id },
      });
    },
  },
};
</script>

<style scoped>
.sessions {
  margin: auto;
  max-width: 100ch;
}
.sessions__inputform {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}

.sessions__add-button {
  grid-area: button;
}

.sessions__input-wrapper {
  display: grid;
  grid-template-columns: fit-content(100px) 1fr;
  column-gap: 1rem;
  row-gap: 1rem;
  grid-template-areas:
    "title title-text"
    "description description-text"
    "button button";
  align-items: center;
  padding: 0.5rem;
  border: 1px solid var(--clr-primary);
  cursor: pointer;
  flex-grow: 100;
}
</style>
