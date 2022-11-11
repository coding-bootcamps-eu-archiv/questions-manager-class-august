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
  border: 1.75px solid var(--clr-primary);
  border-radius: 2px;
  background-color: var(--clr-surface);
  box-shadow: 3.5px 3.5px 0px var(--clr-primary-inactive);
  padding: 8px 20px;
  font-family: "Source Sans Pro";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  color: var(--clr-primary);
  margin-top: 1rem;
}

.sessions__add-button:hover {
  background: var(--clr-primary);
  color: var(--clr-surface);
  border-radius: 2px;
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
  padding: 3rem;
  box-shadow: var(--clr-primary) 0px 2px 5px 0px,
    var(--clr-primary-inactive) 0px 1px 1px 0px;
  cursor: pointer;
  flex-grow: 100;
}

input {
  padding: 1rem;
  background: var(--clr-surface);
  border: 1.75px solid var(--clr-primary-inactive);
}

input:focus-within {
  outline: none;
  border: 1px solid var(--clr-primary);
}

::placeholder {
  font-family: "Source Sans Pro";
  font-size: 1rem;
  color: var(--clr-primary-inactive);
}

label {
  font-family: "Source Sans Pro";
  font-size: 1rem;
  font-weight: 600;
}
</style>
