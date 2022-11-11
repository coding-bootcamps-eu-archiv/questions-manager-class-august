<template>
  <section class="questions" id="questions">
    <ul class="questions__list" id="questions-list">
      <li
        class="questions_element"
        v-for="question in questions"
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
            <input type="checkbox" />
            <div class="like"></div>
          </label>
        </div>
        <p class="question__counter">{{ question.likes }} Likes</p>
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
  box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
    rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
  border-radius: 2px;
}
.questions {
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
  border: 2px solid var(--clr-primary);
  border-radius: 2px;
}
.question__wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5rem 2.5rem 4rem 0.75rem;
  gap: 2.5rem;
  width: 100%;
}
.question__name {
  font-size: 1.25rem;
  font-family: "Montserrat", sans-serif;
  color: var(--clr-secondary);
}
.question__date {
  font-size: 0.75rem;
  font-weight: normal;
  color: var(--clr-primary-inactive);
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
  color: var(--clr-primary-inactive);
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
  margin-top: -30px;
  margin-right: 25px;
}
.trigger input[type="checkbox"] {
  display: none;
}
.trigger input[type="checkbox"] + .like:before,
.trigger input[type="checkbox"] + .like:after {
  background: red;
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
  background: #06723e;
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
</style>
