<template>
  <div class="subheader">
    <div class="subheader__wrapper">
      <h2>{{ subheader }}</h2>
      <button
        class="btn btn--back"
        v-show="isAdmin"
        @click="
          $router.push({
            name: 'manage',
          })
        "
      >
        Back
      </button>
    </div>
    <div v-show="title" class="subheader__info">
      <p class="session__date">{{ date }}</p>

      <div class="wrapper">
        <div class="session__title" v-show="!editTitle">{{ title }}</div>
        <input
          type="text"
          :class="{
            session__title: !editTitle,
            'session__title--edit': editTitle,
          }"
          v-show="editTitle"
          :value="title"
          id="title"
          ref="titleInput"
          @change="$emit(`titleChanged`, this.$refs.titleInput.value)"
        />
        <svg
          v-show="isAdmin"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="edit-icon"
          viewBox="0 0 16 16"
          @click="editTitle = !editTitle"
        >
          <path
            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
          />
          <path
            fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
          />
        </svg>
      </div>
      <div class="wrapper">
        <div class="session__desc" v-show="!editDesc">{{ description }}</div>
        <input
          type="text"
          :class="{
            session__desc: !editDesc,
            'session__desc--edit': editDesc,
          }"
          v-show="editDesc"
          :value="description"
          id="description"
          ref="descInput"
          @change="$emit(`descChanged`, this.$refs.descInput.value)"
        />
        <svg
          v-show="isAdmin"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="edit-icon"
          viewBox="0 0 16 16"
          @click="editDesc = !editDesc"
        >
          <path
            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
          />
          <path
            fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
          />
        </svg>
      </div>
    </div>

    <div class="session__url" v-show="isAdmin">
      <input
        @focus="$event.target.select()"
        type="text"
        name="session-url "
        id="session-url"
        ref="url"
        readonly
        class="url__link"
        :value="currentUrl"
        @click="
          $router.push({
            name: 'currentsession',
            params: { id: $route.params.id },
          })
        "
      />
      <button class="btn btn--copy" @click="copyUrl()">Copy</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "subHeader",
  props: {
    subheader: String,
    title: String,
    description: String,
    date: String,
    isAdmin: Boolean,
  },
  data() {
    return {
      currentTitle: "",
      editTitle: false,
      currentDesc: "",
      editDesc: false,
    };
  },
  computed: {
    currentUrl() {
      let sessionUrl = window.location.href;
      sessionUrl = sessionUrl.split("manage/edit/").join("session/");
      return sessionUrl;
    },
  },
  methods: {
    copyUrl() {
      this.$refs.url.focus();
      document.execCommand("copy");
    },
  },
};
</script>

<style scoped>
h2 {
  color: var(--clr-primary);
}

.subheader {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 1rem;
}
.subheader__wrapper {
  display: inline-flex;
  justify-content: space-between;
}
.subheader__info {
  display: flex;
  flex-flow: column wrap;
  justify-content: baseline;
  color: var(--clr-text);
  gap: 0.5rem;
}

.session__date {
  font-size: 1rem;
  font-style: italic;
  align-self: flex-start;
  color: var(--clr-primary-inactive);
  margin: 0;
  padding: 0;
}
.wrapper {
  position: relative;
  width: 392px;
}
.session__title,
.session__desc {
  word-wrap: break-word;
  height: min-content;
  padding: 0.5rem 0rem;
  padding-right: 3rem;
  width: 350px;
  word-break: break-all;
}

.session__title--edit,
.session__desc--edit {
  all: unset;
  border: 1px solid var(--clr-primary-inactive);
  padding: 0.5rem 0rem;
  padding-right: 3rem;
  width: 350px;
}
.session__title,
.session__title--edit,
.edit-icon {
  font-size: 1.25rem;
  font-weight: bold;
}
.session__title--edit:focus,
.session__desc--edit:focus {
  border: 2px solid var(--clr-secondary);
}

.edit-icon {
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateX(-100%) translateY(-50%);
  cursor: pointer;
  padding: 1rem;
}
.url__link {
  all: unset;
}
.session__url {
  display: inline-flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 0.5rem 0rem;
  max-width: 100%;

  overflow: hidden;
}
.url__link {
  flex: 1;
  cursor: pointer;
  font-size: 1.25rem;
  text-decoration: none;
  color: var(--clr-primary);
}
.url__link:hover {
  text-decoration: underline;
  color: hotpink;
}

.btn {
  flex: 0 1 auto;
}

.btn--copy {
}

.btn--back {
}
</style>
