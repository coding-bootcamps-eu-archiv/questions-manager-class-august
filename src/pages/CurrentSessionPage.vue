<template>
  <section class="sessions" id="sessions">
    <ul class="sessions__list" id="sessions-list">
      <li
        class="sessions__element"
        v-for="question in questions"
        :key="question.id"
      >
        <div class="session__wrapper">
          <h3 class="session__name">{{ question }}</h3>
          <!-- <p class="session__date">
            {{ dayJS(session.createdAt).fromNow() }}
          </p> -->
        </div>
      </li>
    </ul>

    <!-- will be removed after handling all related issues -->
    <pre>{{ sessionId }}</pre>
  </section>
</template>

<script>
export default {
  inject: ["dayJS"],
  data() {
    return { sessionId: this.$route.query.sessionId, questions: [] };
  },
  created() {
    const evtSource = new EventSource(
      process.env.VUE_APP_API_BASE_URL + "/stream/" + this.sessionId
    );

    evtSource.addEventListener(
      "message",
      (event) => {
        console.log(JSON.parse(event.data));
        this.questions = JSON.parse(event.data);
      },
      false
    );
  },
};
</script>

<style scoped>
ul,
li {
  all: unset;
}

.sessions {
  margin: auto;
  max-width: 100ch;
}
.sessions__list {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}

.sessions__element {
  display: flex;
  align-items: center;
  width: 100%;
}
.session__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid var(--clr-primary);
  cursor: pointer;
  flex-grow: 100;
}
.session__name {
  font-size: 1rem;
  font-weight: normal;
  color: var(--clr-text);
}
.session__date {
  font-size: 0.75rem;
  font-weight: normal;
  color: var(--clr-primary-inactive);
}
.session__wrapper:hover .session__name {
  color: var(--clr-primary);
  text-decoration: underline;
}

.btn__wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem;
  gap: 0.5rem;
  flex-grow: 1;
}
.btn {
  all: unset;
}
.open {
  font-size: 1.5rem;
  color: var(--clr-primary-inactive);
}
.answered {
  font-size: 1.5rem;
  color: salmon;
}
</style>
