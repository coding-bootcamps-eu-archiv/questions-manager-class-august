<template>
  <section class="questions" id="questions">
    <SubHeader
      :subheader="headline"
      :title="newSessionData.title"
      :description="newSessionData.description"
      :date="sessionDateFormat"
      :isAdmin="true"
      @title-changed="titleChange"
      @desc-changed="descChange"
    />
    <form>
      <div class="form__container">
        <div class="searchbar">
          <input
            class="search__input"
            type="text"
            placeholder="Search for a question"
            v-model="searchQuery"
          />
          <button @click.prevent class="magnifying" type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
    <ul class="questions__list" id="questions-list">
      <h3 class="header__open">Open:</h3>
      <li
        class="questions_element"
        v-for="question in filterOpen"
        :key="question.id"
      >
        <div class="wrapper">
          <p class="question__date">
            {{ dayJS(question.createdAt).fromNow() }}
          </p>

          <p class="question__name">
            {{ question.question }}
          </p>
        </div>

        <div class="wrapper wrapper--modifier">
          <p class="question__counter">{{ question.likes }} Likes</p>
          <div class="btn__wrapper">
            <input
              type="checkbox"
              @change="onCheckChangeState"
              class="open"
              :id="question.id"
              :checked="!question.open"
            />
            <label :for="question.id" class="open__label">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="46"
                height="46"
                fill="currentColor"
                class="bi bi-check"
                viewBox="0 0 16 16"
              >
                <path
                  d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
                />
              </svg>
            </label>
            <button @click="confirmDelete(question)" class="btn btn--delete">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                viewBox="0 0 16 16"
                :id="question.id"
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
    <ul class="questions__list" id="questions-list">
      <h3 class="header__answered">Answered:</h3>
      <li
        class="questions_element"
        v-for="question in filterClosed"
        :key="question.id"
      >
        <div class="wrapper">
          <p class="question__date">
            {{ dayJS(question.createdAt).fromNow() }}
          </p>

          <p class="question__name">
            {{ question.question }}
          </p>
        </div>

        <div class="wrapper wrapper--modifier">
          <p class="question__counter">{{ question.likes }} Likes</p>
          <div class="btn__wrapper">
            <input
              type="checkbox"
              @change="onCheckChangeState"
              class="open"
              :id="question.id"
              :checked="!question.open"
            />
            <label :for="question.id" class="open__label">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="46"
                height="46"
                fill="currentColor"
                class="bi bi-check"
                viewBox="0 0 16 16"
              >
                <path
                  d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
                />
              </svg>
            </label>
            <button @click="confirmDelete(question)" class="btn btn--delete">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                viewBox="0 0 16 16"
                :id="question.id"
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
  </section>
</template>

<script>
export default {
  inject: ["dayJS"],
  data() {
    return {
      data: [],
      questions: [],
      search: "",
      searchQuery: "",
      headline: "Current Session → Coaches",
      newSessionData: {
        title: "",
        description: "",
        createdAt: null,
        active: false,
        id: this.$route.params.id,
      },
    };
  },
  computed: {
    sessionDateFormat() {
      return this.dayJS(this.newSessionData.createdAt).format(
        "MMM-DD-YY HH:mm"
      );
    },

    filterOpen() {
      return this.searchQuestions(this.findOpen);
    },

    filterClosed() {
      return this.searchQuestions(this.findClosed);
    },

    findClosed() {
      return this.questions.filter((question) => question.open === false);
    },

    findOpen() {
      return this.questions.filter((question) => question.open === true);
    },
  },
  methods: {
    async changeSessionData() {
      const response = await fetch(
        process.env.VUE_APP_API_BASE_URL + "/sessions/" + this.$route.params.id,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(this.newSessionData),
        }
      );
      return response;
    },

    titleChange(event) {
      this.newSessionData.title = event;
    },

    descChange(event) {
      this.newSessionData.description = event;
    },

    searchQuestions(array) {
      this.sortQuestions(array);
      if (this.searchQuery.length > 0) {
        return array.filter((q) =>
          q.question.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        return array;
      }
    },

    async updateStatusQuestion(question) {
      const response = await fetch(
        process.env.VUE_APP_API_BASE_URL + "/questions/" + question.id,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(question),
        }
      );
      return response;
    },

    onCheckChangeState(event) {
      this.questions.forEach((question) => {
        if (question.id === event.target.id) {
          question.open = !question.open;
          this.updateStatusQuestion(question);
        }
      });
    },

    confirmDelete(question) {
      const deleteMsg = `Do you really want to delete question: ${question.question}?`;
      if (confirm(deleteMsg)) {
        this.deleteQuestion(question);
      }
    },

    async deleteQuestion(question) {
      const response = await fetch(
        process.env.VUE_APP_API_BASE_URL + "/questions/" + question.id,
        {
          method: "DELETE",
        }
      );
      return response;
    },

    async getSessionData() {
      const response = await fetch(
        process.env.VUE_APP_API_BASE_URL + "/sessions/" + this.$route.params.id
      );

      this.data = await response.json();
      this.newSessionData.title = this.data.title;
      this.newSessionData.description = this.data.description;
      this.newSessionData.createdAt = this.data.createdAt;
    },

    sortQuestions(array) {
      return array
        .sort((a, b) => {
          return a.likes - b.likes;
        })
        .reverse();
    },
  },
  watch: {
    "newSessionData.title"(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.changeSessionData();
      }
    },
    "newSessionData.description"(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.changeSessionData();
      }
    },
  },
  async created() {
    this.getSessionData();

    const evtSource = new EventSource(
      process.env.VUE_APP_API_BASE_URL + "/stream/" + this.$route.params.id
    );

    evtSource.addEventListener(
      "message",
      (event) => {
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
  margin: 0;
  padding: 0;
}

.form__container {
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  width: 100%;
  gap: 0.5rem;
}
.searchbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1.25rem;
  border: 2px solid var(--clr-primary);
  box-shadow: var(--clr-primary-inactive) 0px 1px 1px 0px;
  background: var(--clr-surface);
  gap: 1.25rem;
  border-radius: 2px;
  flex: 1 1 100%;
  margin-bottom: 1rem;
}
.search__input {
  all: unset;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: var(--clr-primary);
  width: 100%;
}
.searchbar:focus-within {
  appearance: none;
  border: 2px solid hotpink;
  border-radius: 2px;
}
.searchtext:not(:focus):not(:active) {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
.magnifying {
  all: unset;
  fill: var(--clr-primary);
}
.search__input::placeholder {
  color: var(--clr-primary-inactive);
}
.header__open {
  color: rgb(94, 189, 94);
  font-size: 1.5rem;
  margin-bottom: -10px;
}
.header__answered {
  color: salmon;
  font-size: 1.5rem;
  margin-bottom: -10px;
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
  gap: 1.25rem;
}
.questions_element {
  display: flex;
  align-items: center;
  width: calc(100% - 3.5px);
  background-color: var(--clr-dark-purple);
  border: 2px solid var(--clr-primary);
  box-shadow: 3.5px 3.5px 0px var(--clr-primary);
  border-radius: 2px;
}
.wrapper {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem 2.5rem 4rem 0.75rem;
  gap: 2.5rem;
  width: 100%;
}

.wrapper--modifier {
  align-items: flex-end;
  padding-right: 0.75rem;
  padding-bottom: 4rem;
  width: 15%;
}
.question__name {
  font-size: 2rem;
  font-family: "Montserrat", sans-serif;
  color: var(--clr-surface);
}
.question__date {
  font-size: 0.75rem;
  font-weight: normal;
  color: var(--clr-surface);
}
.question__counter {
  display: flex;
  align-self: flex-end;
  white-space: nowrap;
  bottom: -0.5rem;
  right: 0.3rem;
  position: relative;
  font-size: 0.75rem;
  font-weight: normal;
  color: var(--clr-surface);
  font-family: "Montserrat", sans-serif;
}
.btn__wrapper {
  display: flex;
  gap: 0.5rem;
}
.btn {
  all: unset;
}

.btn--delete {
  color: var(--clr-surface);
}

.btn--delete:hover {
  color: hotpink;
}
input[type="checkbox"] {
  visibility: hidden;
}

input[type="checkbox"] + .open__label {
  display: inline-block;
  vertical-align: middle;
  color: rgb(94, 189, 94);
}
input[type="checkbox"]:checked + .open__label {
  color: salmon;
}
</style>
