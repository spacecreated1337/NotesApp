<template>
  <div class="uk-container-small uk-container">
    <h2 class="text-center color-purple">{{ title }}</h2>
    <form class="text-center">
      <div class="uk-child-width-1-2@m" uk-grid>
        <div>
          <label>
            <h3 class="headers-margin">Название</h3>
            <input v-model="note.title" class="custom-input" />
          </label>
        </div>
        <div>
          <h3 class="headers-margin">Важность</h3>
          <div
            class="radio-color uk-margin uk-flex-center uk-grid-small uk-child-width-auto uk-grid custom-radio-bt"
          >
            <label
              ><input
                class="uk-radio"
                type="radio"
                name="1"
                checked
                v-model="note.importance"
                value="1"
              />
              1</label
            >
            <label
              ><input
                class="uk-radio"
                type="radio"
                name="2"
                v-model="note.importance"
                value="2"
              />
              2</label
            >
            <label
              ><input
                class="uk-radio"
                type="radio"
                name="3"
                v-model="note.importance"
                value="3"
              />
              3</label
            >
          </div>
        </div>
      </div>
      <label>
        <h3 class="headers-margin">Описание</h3>
        <textarea
          v-model="note.descr"
          class="custom-input"
          name=""
          id=""
          cols="92"
          rows="8"
        ></textarea>
      </label>
      <div class="mg-20">
        <button @click.prevent="addNewNote" class="btn btnPrimary">
          NEW NOTE
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    addNewNote() {
      this.$emit("addNewNote", this.note);
    },
  },
};
</script>
<style lang="scss" scoped>
.custom-radio-bt input {
  padding: 10px 10px !important;
}
.radio-color .uk-checkbox:checked,
.uk-checkbox:indeterminate,
.uk-radio:checked {
  background-color: purple;
}
</style>
