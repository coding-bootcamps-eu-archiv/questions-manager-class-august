<template>
  <section class="questions" id="questions">
    <ul class="questions__list" id="questions-list">
      <li
        class="questions_element"
        v-for="question in questions"
        :key="question.id"
      >
        <div class="wrapper">
          <p class="question__date">
            {{ dayJS(question.createdAt).fromNow() }}
          </p>

          <p class="question__name">{{ question.question }}</p>
        </div>

        <div class="wrapper wrapper--modifier">
          <p class="question__counter">{{ question.likes }} Likes</p>
          <div class="btn__wrapper">
            <input type="checkbox" class="open" id="open" />
            <label for="open" class="open__label"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                class="bi bi-check"
                viewBox="0 0 16 16"
              >
                <path
                  d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
                />
              </svg>
            </label>
            <!-- have to make my own function -->
            <button
              @click="ConfirmDeleteSession(session)"
              class="btn btn--delete"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                />
                <path
                  fill-rule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </button>
          </div>
        </div>
      </li>
    </ul>

    <h3 class="session__url">
      Link: <ins>{{ currentUrl }}</ins>
    </h3>

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
  computed: {
    currentUrl() {
      return window.location.href;
    },
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
.session__url {
  all: unset;
  font-size: 16px;
  font-weight: 500;
  color: hotpink;
  background: var(--clr-surface);
  padding: 0.5rem 1.25rem;
  box-shadow: var(--clr-primary-inactive) 0px 2px 5px 0px,
    var(--clr-primary-inactive) 0px 1px 1px 0px;
  border-radius: 2px;
}
.questions {
  padding: 0.75rem;
  display: flex;
  margin: auto;
  max-width: 700px;
  flex-direction: column;
  gap: 1.5rem;
}
.questions__list {
  display: flex;
  flex-direction: column;
}

.questions_element {
  display: flex;
  align-items: center;
  width: 100%;
  background-color: var(--clr-surface);
  box-shadow: var(--clr-primary) 0px 2px 5px 0px,
    var(--clr-primary-inactive) 0px 1px 1px 0px;
  border-radius: 2px;
}
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5rem 2.5rem 4rem 0.75rem;
  gap: 2.5rem;
  width: 100%;
}

.wrapper--modifier {
  align-items: flex-end;
  padding: 0.5rem 0.75rem 4rem 2.5rem;
}
.question__name {
  font-size: 1.25rem;
  font-family: "Montserrat", sans-serif;
  color: var(--clr-text);
}
.question__date {
  font-size: 0.75rem;
  font-weight: normal;
  color: var(--clr-primary-inactive);
}
.question__counter {
  align-items: flex-end;
  white-space: nowrap;
  font-size: 0.85rem;
  font-weight: normal;
  color: var(--clr-primary);
  font-family: "Montserrat", sans-serif;
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

.btn--delete {
  color: var(--clr-primary);
  padding-top: 0.5rem;
}

.btn--delete:hover {
  color: hotpink;
}
input[type="checkbox"] {
  visibility: hidden;
}
.open__label {
  transform: translateY(2px);
}
input[type="checkbox"] + .open__label {
  display: inline-block;
  vertical-align: middle;
  color: salmon;
}
input[type="checkbox"]:checked + .open__label {
  color: green;
}
</style>
