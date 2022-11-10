<template>
  <section class="questions" id="questions">
    <ul class="questions__list" id="questions-list">
      <li
        class="questions_element"
        v-for="question in questions"
        :key="question.id"
      >
        <div class="question__wrapper">
          <p>{{ dayJS(question.createdAt).fromNow() }}</p>
          <h3 class="question__name">{{ question.question }}</h3>
          <!-- <p class="session__date">
            {{ dayJS(session.createdAt).fromNow() }}
          </p> -->
        </div>
      </li>
    </ul>

    <!-- will be removed after handling all related issues -->
    <pre>{{ questions }}</pre>
  </section>
</template>

<script>
export default {
  inject: ["dayJS"],
  data() {
    return { questions: [] };
  },
  async created() {
    //will be replaced with streaming function of api in a later issue (see api docs)
    const response = await fetch(
      process.env.VUE_APP_API_BASE_URL +
        "/questions?sessionId=" +
        this.$route.params.id
    );

    this.questions = await response.json();
  },
};
</script>

<style scoped>
ul,
li {
  all: unset;
}

.questions {
  margin: auto;
  max-width: 100ch;
}
.questions__list {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}

.questions_element {
  display: flex;
  align-items: center;
  width: 100%;
}
.question__wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5rem;
  border: 1px solid var(--clr-primary);
  cursor: pointer;
  gap: 2rem;
  width: 100%;
}
.question__name {
  font-size: 1rem;
  font-weight: normal;
  color: var(--clr-text);
}
.question__date {
  font-size: 0.75rem;
  font-weight: normal;
  color: var(--clr-primary-inactive);
}
.question__wrapper:hover .question__name {
  color: var(--clr-primary);
  text-decoration: underline;
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
