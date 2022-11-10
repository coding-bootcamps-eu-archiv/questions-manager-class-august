<template>
  <section class="sessions" id="sessions">
    <ul class="sessions__list" id="sessions-list">
      <li
        class="sessions__element"
        v-for="session in sessions"
        :key="session.id"
      >
        <div class="session__wrapper">
          <h3 class="session__name">{{ session.title }}</h3>
          <p class="session__date">
            {{ dayJS(session.createdAt).fromNow() }}
          </p>
        </div>
        <div class="btn__wrapper">
          <button class="btn btn--detail">Details</button>
          <button class="btn btn--edit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
              />
              <path
                d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
              />
            </svg>
          </button>
          <button class="btn btn--delete">
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
      </li>
    </ul>

    <!-- will be removed after handling all related issues -->
    <pre>{{ sessions }}</pre>
  </section>
</template>

<script>
export default {
  inject: ["dayJS"],
  data() {
    return { sessions: [] };
  },
  async created() {
    const response = await fetch(
      "https://questions-manager-api.jgreg.uber.space/sessions"
    );
    this.sessions = await response.json();
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

.btn--detail {
  padding: 0.5rem;
  cursor: pointer;
  color: var(--clr-text);
}
.btn--detail:hover {
  color: var(--clr-primary);
  border-bottom: 1px solid var(--clr-primary);
}

.btn--delete,
.btn--edit {
  align-self: center;
  padding: 0.5rem;
  cursor: pointer;
  color: var(--clr-text);
  transform: translateY(5%);
}

.btn--delete {
  padding-top: 0.5rem;
}

.btn--edit:hover {
  color: dodgerblue;
}

.btn--delete:hover {
  color: hotpink;
}
</style>
