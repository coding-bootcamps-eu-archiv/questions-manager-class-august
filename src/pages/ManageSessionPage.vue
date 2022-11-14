<template>
  <section class="sessions" id="sessions">
    <SubHeader :subheader="headline" />
    <ul class="sessions__list" id="sessions-list">
      <li
        class="sessions__element"
        v-for="(session, index) in sessions"
        :key="session.id"
      >
        <div class="session__wrapper">
          <div class="name__wrapper">
            <h3 class="session__name">
              <a @click="toggleDescription" :id="index">
                {{ session.title }}
              </a>
            </h3>
            <p class="session__date">
              {{ dayJS(session.createdAt).fromNow() }}
            </p>
          </div>
          <p ref="session" class="session__desc toggle">
            {{ session.description }}
          </p>
        </div>
        <div class="btn__wrapper">
          <router-link :to="{ name: 'edit', params: { id: session.id } }">
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
          </router-link>
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
      </li>
    </ul>

    <!-- will be removed after handling all related issues -->
    <pre>{{ sessions }}</pre>
    <nav>
      <router-link class="router-link" :to="{ name: 'create' }">
        <button class="btn--createSession">Create Session</button>
      </router-link>
    </nav>
  </section>
</template>

<script>
export default {
  inject: ["dayJS"],
  data() {
    return { sessions: [], headline: "Session Overview", lastToggle: null };
  },
  async created() {
    await this.fetchSessions();
  },

  watch: {
    sessions(newSessions, oldSessions) {
      if (newSessions.length < oldSessions.length) {
        this.fetchSessions();
      }
    },
  },
  methods: {
    ConfirmDeleteSession(currentSession) {
      const deleteMsg = `Do you really want to delete the session with all questions?
      ${currentSession.title}`;
      if (confirm(deleteMsg)) {
        this.DeleteSession(currentSession);
      }
    },
    async DeleteSession(currentSession) {
      const response = await fetch(
        process.env.VUE_APP_API_BASE_URL + "/sessions/" + currentSession.id,
        {
          method: "DELETE",
        }
      );
      this.fetchSessions();
      return response;
    },
    async fetchSessions() {
      const response = await fetch(
        process.env.VUE_APP_API_BASE_URL + "/sessions"
      );
      this.sessions = await response.json();
    },
    toggleDescription(event) {
      const id = event.target.id;
      if (this.lastToggle === null) {
        this.lastToggle = event.target.id;
        this.$refs.session[id].classList.toggle("toggle");
      } else if (this.lastToggle === event.target.id) {
        return;
      } else {
        this.$refs.session[this.lastToggle].classList.toggle("toggle");
        this.$refs.session[id].classList.toggle("toggle");
        this.lastToggle = event.target.id;
      }
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  cursor: pointer;
}

ul,
li {
  all: unset;
}
.toggle {
  display: none;
}
.sessions {
  margin: auto;
  max-width: 700px;
}
.sessions__list {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.25rem;
  max-width: 700px;
}

.sessions__element {
  display: flex;
  align-items: center;
  width: 100%;
  max-height: min-content;
}
.session__wrapper {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.25rem;
  border: 1px solid var(--clr-primary);
  flex: 3 0 auto;
  max-width: 500px;
  min-width: 350px;
}

.name__wrapper {
  display: flex;
  justify-content: space-between;
}
.session__name {
  display: block;
  font-size: 1rem;
  font-weight: normal;
  color: var(--clr-text);
  flex: 3 0 auto;
  max-width: 300px;
}
.session__date {
  font-size: 0.75rem;
  font-weight: normal;
  color: var(--clr-primary-inactive);
  flex: 0 3 auto;
}

.session__desc {
  padding: 0;
  margin: 0;
  color: var(--clr-primary-inactive);
  flex: 4 0 100%;
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
  flex: 0 3 auto;
}
.btn {
  all: unset;
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
.btn--createSession {
  all: unset;
  white-space: nowrap;
  border-radius: 2px;
  color: var(--clr-primary);
  background-color: var(--clr-surface);
  border: 1.75px solid var(--clr-primary);
  box-shadow: 3.5px 3.5px 0px var(--clr-primary-inactive);
  padding: 0.5rem 1.25rem;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  margin: 1rem 40%;
}

.router-link:active,
.router-link:hover {
  color: var(--clr-surface);
}
.btn--createSession:hover {
  background: var(--clr-primary);
  border-radius: 2px;
  color: var(--clr-surface);
}
.btn--createSession:active {
  outline: none;
  box-shadow: none;
  font-size: 16px;
  font-weight: 600;
  color: var(--clr-surface);
  background: var(--clr-primary);
  border: 1.75px solid var(--clr-primary);
  padding: 0.5rem 1.25rem;
  border-radius: 2px;
}
</style>
