<template>
  <section class="sessions" id="sessions">
    <SubHeader :subheader="headline" />
    <table class="sessions__list">
      <thead>
        <tr>
          <th class="sessions__title">Sessions</th>
          <th class="sessions__actions">{{ sessions.length }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="session in sessions" :key="session.id" class="sessions__row">
          <td class="sessions__title-element">
            <h3
              @click="
                $router.push({ name: 'edit', params: { id: session.id } })
              "
            >
              {{ session.title }}
            </h3>
            {{ dayJS(session.createdAt).fromNow() }}
          </td>
          <td class="sessions__actions-element">
            <button
              @click="confirmDeleteSession(session)"
              class="btn btn--delete"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <nav class="create-session">
      <button
        class="btn btn--create-session"
        @click="$router.push({ name: 'create' })"
        id="create-session"
      >
        Create Session
      </button>
    </nav>
  </section>
</template>

<script>
export default {
  inject: ["dayJS"],
  data() {
    return { sessions: [], headline: "Session Overview" };
  },
  async created() {
    await this.getSessions();
  },

  watch: {
    sessions(newSessions, oldSessions) {
      if (newSessions.length < oldSessions.length) {
        this.getSessions();
      }
    },
  },
  methods: {
    confirmDeleteSession(currentSession) {
      this.$swal
        .fire({
          title: `Do you really want to delete Session: ${currentSession.title}?`,
          icon: "warning",
          showDenyButton: true,
          confirmButtonText: "Yes",
          denyButtonText: "No",
          position: "top",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.deleteSession(currentSession);
            this.$swal.fire({
              title: `Session: ${currentSession.title} is deleted!`,
              position: "top",
              icon: "info",
            });
          } else if (result.isDenied) {
            this.$swal.fire({
              title: "Session not deleted!",
              position: "top",
              icon: "info",
            });
          }
        });
    },
    async deleteSession(currentSession) {
      const response = await fetch(
        process.env.VUE_APP_API_BASE_URL + "/sessions/" + currentSession.id,
        {
          method: "DELETE",
        }
      );
      this.getSessions();
      return response;
    },
    async getSessions() {
      const response = await fetch(
        process.env.VUE_APP_API_BASE_URL + "/sessions"
      );
      this.sessions = await response.json();
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  cursor: pointer;
}

table,
td,
th {
  width: 100%;
  table-layout: fixed;
  text-align: left;
  padding: 0;
}

tbody tr {
  border-bottom: 1px solid black;
  font-size: 1rem;
}

.sessions {
  margin: 0 auto;
  max-width: 75ch;
  padding: 0 1rem;
  margin-bottom: 2rem;
}
.sessions__list {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 1.25rem;
  width: 100%;
}

.sessions__title {
  width: 75%;
}
.sessions__actions {
  width: 25%;
}

.sessions__list thead tr {
  color: var(--clr-text);
  text-align: left;
}

.sessions__list th {
  padding: 1rem 0;
}
.sessions__list td {
  padding: 1rem 1.5rem;
}

.sessions__title {
  width: 80%;
}

.sessions__actions {
  width: 20%;
  text-align: right;
}

.sessions__title-element {
  word-wrap: break-word;
  cursor: pointer;
}
.sessions__title-element:hover h3 {
  color: var(--clr-primary);
  text-decoration: underline;
}

.sessions__title-element h3 {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}
.sessions__actions-element {
  text-align: right;
}

.sessions__list tbody tr:last-of-type {
  border-bottom: 2px solid var(--clr-primary);
}
.btn {
  all: unset;
  cursor: pointer;
}

.btn--delete,
.btn--edit {
  padding: 0.5rem;
  padding-right: 0;
  align-self: center;
  color: var(--clr-text);
  stroke-width: 2px;
}

.btn--edit:hover {
  color: dodgerblue;
}

.btn--delete:hover {
  color: hotpink;
}

.create-session {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem 0;
}
.btn--create-session {
  background-color: var(--clr-surface);
  font-weight: 600;
  font-size: 16px;
  color: var(--clr-primary);
  padding: 0.5rem 1.25rem;
  border-radius: 2px;
  border: 1.75px solid var(--clr-primary);
  box-shadow: 3.5px 3.5px 0px var(--clr-dark-purple);
}

.btn--create-session:hover {
  background: var(--clr-primary);
  color: var(--clr-surface);
}
.btn--create-session:active {
  outline: none;
  box-shadow: none;
  color: var(--clr-surface);
  background: var(--clr-primary);
}
</style>
