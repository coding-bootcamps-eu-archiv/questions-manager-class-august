<template>
  <section class="questions" id="questions">
    <SubHeader
      :subheader="headline"
      :title="sessionTitle"
      :description="sessionDesc"
      :date="sessionDateFormat"
    />
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
            <label :for="question.id" class="open__label"
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
              @click="deleteQuestion($event)"
              class="btn btn--delete"
              :id="question.id"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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
        v-for="question in filterAnswered"
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
            <label :for="question.id" class="open__label"
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
              @click="deleteQuestion($event)"
              class="btn btn--delete"
              :id="question.id"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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
    return {
      data: [],
      questions: [],
      search: "",
      headline: "Current Session → Coaches",
      sessionTitle: "",
      sessionDesc: "",
      sessionDate: "",
    };
  },
  computed: {
    currentUrl() {
      let sessionUrl = window.location.href;
      sessionUrl = sessionUrl.split("edit/").join("");
      return sessionUrl;
    },
    filterAnswered() {
      return this.questions.filter((question) => question.open === false);
    },
    filterOpen() {
      return this.questions.filter((question) => question.open === true);
    },
    sessionDateFormat() {
      return this.dayJS(this.sessionDate).format("MMM-DD-YY HH:mm");
    },
  },
  methods: {
    async updateStatusQuestion(question) {
      const response = await fetch(
        process.env.VUE_APP_API_BASE_URL + "/questions/" + question.id,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(question),
        }
      );
      return response.JSON();
    },
    onCheckChangeState(event) {
      this.questions.forEach((question) => {
        if (question.id === event.target.id) {
          question.open = !question.open;
          this.updateStatusQuestion(question);
        }
      });
    },
    deleteQuestion(event) {
      this.questions.forEach((question, index) => {
        if (question.id === event.target.id) {
          this.questions.splice(index, 1);
        }
      });
    },
  },
  async created() {
    //will be replaced with streaming function of api in a later issue (see api docs)
    const response = await fetch(
      process.env.VUE_APP_API_BASE_URL +
        "/sessions/" +
        this.$route.params.id +
        "?_embed=questions"
    );

    this.data = await response.json();
    this.questions = this.data.questions;
    this.sessionTitle = this.data.title;
    this.sessionDesc = this.data.description;
    this.sessionDate = this.data.date;
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
.session__url {
  all: unset;
  font-size: 16px;
  font-weight: 500;
  color: hotpink;
  text-align: center;
  background: var(--clr-surface);
  padding: 0.5rem 1.25rem;
  box-shadow: var(--clr-primary-inactive) 0px 2px 5px 0px,
    var(--clr-primary-inactive) 0px 1px 1px 0px;
  border-radius: 2px;
}
.header__open {
  color: rgb(94, 189, 94);
  padding-bottom: 0.5rem;
}
.header__answered {
  color: salmon;
  padding-bottom: 0.5rem;
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
  background-color: var(--clr-surface);
  box-shadow: var(--clr-primary) 0px 2px 5px 0px,
    var(--clr-primary-inactive) 0px 1px 1px 0px;
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
  gap: 0.5rem;
}
.btn {
  all: unset;
}

.btn--delete {
  color: var(--clr-primary);
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
