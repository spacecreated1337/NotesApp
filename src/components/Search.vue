<template>
  <form class="uk-search uk-search-default uk-width-1-1 input-focus">
    <span uk-search-icon></span>
    <input
      class="uk-search-input"
      type="search"
      :placeholder="placeholder"
      v-model="search"
    />
  </form>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "Поиск",
    },
  },
  data() {
    return {
      search: this.value,
    };
  },
  watch: {
    search(newValue) {
      this.$emit("search", newValue);
    },
  },
};
</script>
<style lang="scss" scoped>
.input-focus {
  & input {
    color: purple !important;
  }
  & .uk-search-input:focus {
    border-color: purple !important;
    color: purple !important;
  }
}
</style>
