<template>
  <form>
    <div class="input-session">
      <label class="input-session_title" for="titleSession">Title</label>
      <input
        type="text"
        id="titleSession"
        v-model="title"
        placeholder="Title of your new session"
      />
    </div>
    <label class="input_session_description" for="descriptionSession"
      >Description</label
    >
    <input
      type="text"
      id="descriptionSession"
      v-model="description"
      placeholder="Description of your new session"
    />
    <button>Add Session</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      description: "",
    };
  },
};
</script>

<style scoped>
.input-session {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 2px;
  padding: 0.5rem 1.25rem;
  width: 300px;
  gap: 2.5px;
}
input[type="text"] {
  all: unset;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  height: 100%;
  border: 2px solid var(--clr-primary);
  fill: var(--clr-surface);
  color: var(--clr-text);
}
input[type="text"]::placeholder {
  color: var(--clr-primary-inactive);
}
.input-session:focus-within {
  outline: none;
  border: 2px solid var(--clr-secondary);
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
</style>
