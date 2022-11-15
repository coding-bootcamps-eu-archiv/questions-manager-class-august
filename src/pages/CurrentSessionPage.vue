<template>
  <section class="questions" id="questions">
    <SubHeader
      :subheader="headline"
      :title="sessionTitle"
      :description="sessionDesc"
      :date="sessionDateFormat"
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
        <input
          class="questions__input"
          type="text"
          name="question"
          id="question"
          placeholder="Ask your question"
          v-model="newQuestion"
          @keypress.enter.prevent="createNewQuestion()"
          @focus="isFocused = true"
          @focusout="isFocused = false"
        />
        <button class="ask__btn" @click.prevent="createNewQuestion()">
          Send
        </button>
      </div>
      <p v-show="newQuestionError" class="errorCountCharactersMsg">
        Bitte mindestens 5 Zeichen eingeben!
      </p>
    </form>

    <ul class="questions__list" id="questions-list">
      <h3 class="header__open">Open:</h3>
      <li
        class="questions_element"
        v-for="question in filterOpen"
        :key="question.id"
      >
        <div class="question__wrapper">
          <p class="question__date">
            {{ dayJS(question.createdAt).fromNow() }}
          </p>
          <p class="question__name">{{ question.question }}</p>
        </div>
        <div class="like__btn">
          <label class="trigger">
            <input
              type="checkbox"
              @change="updateLikes(question, $event.target.checked)"
            />
            <div class="like"></div>
          </label>
        </div>
        <p class="question__counter">{{ question.likes }} Likes</p>
      </li>
    </ul>
    <ul class="questions__list" id="questions-list">
      <h3 class="header__answered">Answered:</h3>
      <li
        class="questions_element"
        v-for="question in filterClosed"
        :key="question.id"
      >
        <div class="question__wrapper">
          <p class="question__date">
            {{ dayJS(question.createdAt).fromNow() }}
          </p>
          <p class="question__name">{{ question.question }}</p>
        </div>
        <div class="like__btn">
          <label class="trigger">
            <input
              type="checkbox"
              @change="updateLikes(question, $event.target.checked)"
            />
            <div class="like"></div>
          </label>
        </div>
        <p class="question__counter">{{ question.likes }} Likes</p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  inject: ["dayJS"],
  data() {
    return {
      questions: [],
      newQuestion: "",
      searchQuery: "",
      headline: "Current Session → Student",
      sessionTitle: "",
      sessionDesc: "",
      sessionDate: "",
      isFocused: false,
      onlyOpenQuestions: "",
      onlyClosedQuestions: "",
    };
  },
  computed: {
    newQuestionError() {
      return this.newQuestion.length < 5 && this.isFocused;
    },
    sessionDateFormat() {
      return this.dayJS(this.sessionDate).format("MMM-DD-YY HH:mm");
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

    async createNewQuestion() {
      if (this.newQuestion.length > 4) {
        const body = {
          sessionId: this.$route.params.id,
          question: this.newQuestion,
        };

        await fetch(process.env.VUE_APP_API_BASE_URL + "/questions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        this.newQuestion = "";
      }
    },

    async updateLikes(question, checked) {
      if (checked) {
        question.likes++;
      } else {
        question.likes--;
      }
      await fetch(
        process.env.VUE_APP_API_BASE_URL + "/questions/" + question.id,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(question),
        }
      );

      return question;
    },

    async getSessionData() {
      const response = await fetch(
        process.env.VUE_APP_API_BASE_URL + "/sessions/" + this.$route.params.id
      );
      this.data = await response.json();
      this.sessionTitle = this.data.title;
      this.sessionDesc = this.data.description;
      this.sessionDate = this.data.date;
    },

    sortQuestions(array) {
      return array
        .sort((a, b) => {
          return a.createdAt - b.createdAt;
        })
        .reverse();
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
  display: flex;
  margin: auto;
  max-width: 700px;
  flex-direction: column;
  padding: 0.75rem;
  gap: 3rem;
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
.question__wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5rem 0.5rem 3.5rem 1.75rem;
  gap: 2.5rem;
  width: 100%;
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
  bottom: 0.2rem;
  right: 0.3rem;
  position: relative;
  font-size: 0.85rem;
  font-weight: normal;
  color: var(--clr-surface);
  font-family: "Montserrat", sans-serif;
}

.like__btn {
  display: flex;
  flex-direction: column;
}
.trigger {
  display: flex;
  align-self: baseline;
  position: relative;
  margin-top: -37px;
  margin-right: 45px;
  filter: drop-shadow(1px 1px 2px var(--clr-text));
}
.trigger input[type="checkbox"] {
  display: none;
}
.trigger input[type="checkbox"] + .like:before,
.trigger input[type="checkbox"] + .like:after {
  background: salmon;
  border-radius: 12px 12px 0 0;
  content: "";
  height: 40px;
  position: absolute;
  left: 24px;
  top: 20px;
  transform: rotate(-45deg);
  transform-origin: left bottom;
  transition: all 0.25s ease;
  width: 24px;
}
.trigger input[type="checkbox"] + .like:after {
  left: 0;
  transform: rotate(45deg);
  transform-origin: right bottom;
}
.trigger input[type="checkbox"]:checked + .like:before,
.trigger input[type="checkbox"]:checked + .like:after {
  background: #149456;
  border-radius: 6px 6px 0 0;
  width: 12px;
}
.trigger input[type="checkbox"]:checked + .like:before {
  height: 20px;
  left: 32px;
  top: 40px;
}
.trigger input[type="checkbox"]:checked + .like:after {
  left: 20px;
  top: 20px;
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
.questions__input {
  all: unset;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  color: var(--clr-primary);
  background: var(--clr-surface);
  border: 2px solid var(--clr-primary);
  box-shadow: var(--clr-primary-inactive) 0px 1px 1px 0px;
  border-radius: 2px;
  flex: 1 0 auto;
}

.search__input::placeholder,
.questions__input::placeholder {
  color: var(--clr-primary-inactive);
}

.questions__input:focus {
  appearance: none;
  border: 2px solid hotpink;
}

.errorCountCharactersMsg {
  position: absolute;
  color: hotpink;
  padding-top: 0.25rem;
}

.ask__btn {
  all: unset;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: var(--clr-surface);
  background: var(--clr-primary);
  cursor: pointer;
  border: 1.75px solid var(--clr-primary);
  padding: 0.5rem 1.25rem;
  box-shadow: 3.5px 3.5px 0px var(--clr-secondary);
  border-radius: 2px;
  flex: 0 1 auto;
}
.ask__btn:hover {
  background: var(--clr-surface);
  border-radius: 2px;
  color: var(--clr-primary);
}
.ask__btn:active {
  outline: none;
  box-shadow: none;
  background-color: var(--clr-surface);
  color: var(--clr-primary);
  border: 1.75px solid var(--clr-primary);
  padding: 0.5rem 1.25rem;
  border-radius: 2px;
}
</style>
