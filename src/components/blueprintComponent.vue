<template>
  <button class="actualBtn">Delete Question</button>
  <p>!</p>
  <p>!</p>
  <form class="searchbar">
    <label class="searchtext" for="search-field">Search</label>
    <input type="text" placeholder="Search questions" />
    <button class="magnifying" type="submit">
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
  </form>
  <p>!</p>
  <p>My Question is, how to eat fries in public?</p>
  <label class="trigger">
    <input type="checkbox" />
    <div class="like"></div>
  </label>
</template>

<style scoped>
/*button start*/
.actualBtn {
  all: unset;
  font-size: 16px;
  font-weight: 600;
  color: var(--clr-primary);
  background: var(--clr-surface);
  border: 1.75px solid var(--clr-primary);
  padding: 0.5rem 1.25rem;
  box-shadow: 3.5px 3.5px 0px var(--clr-dark-purple);
  border-radius: 2px;
}
.actualBtn:active {
  all: unset;
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
/*button end*/
/*searchbar start*/
.searchbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 2px solid var(--clr-primary);
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
  fill: var(--clr-surface);
  color: var(--clr-text);
}
input[type="text"]::placeholder {
  color: var(--clr-primary-inactive);
}
.searchbar:focus-within {
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
.magnifying {
  all: unset;
  fill: var(--clr-primary);
}
/* Searchbar end*/
select:hover {
  cursor: pointer;
}
/*Like button*/
.trigger {
  position: relative;
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
