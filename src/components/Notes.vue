<template>
  <div
    class="mg-50"
    :class="{
      'uk-child-width-1-2@s': isGrid,
      'uk-grid': isGrid,
      'uk-child-width-1-1': !isGrid,
      'uk-text-center': !isGrid,
    }"
    uk-grid
  >
    <div v-for="(note, index) in notes" :key="index">
      <div
        class="custom-card note"
        :class="{
          'note-importance-2': note.importance == 2,
          'note-importance-3': note.importance == 3,
        }"
      >
        <div class="uk-position-relative">
          <h2 v-show="!note.isEditing" class="note-title">
            {{ note.title }}
          </h2>
          <form
            @submit.prevent
            v-show="note.isEditing"
            class="width-90 uk-search uk-search-default uk-width-1-1 input-focus uk-position-relative input-focus"
            :class="{ 'width-60': !isGrid }"
          >
            <input type="text" v-model="note.title" class="uk-input" />
            <button
              @click.prevent="editText(index, $event)"
              class="edit-icon uk-position-center-right"
              uk-icon="check"
            ></button>
          </form>
          <a
            @click.prevent="removeNote(index)"
            class="uk-position-center-right"
            href=""
          >
            <i class="fa-solid fa-xmark"></i>
          </a>
        </div>
        <div class="mg-20">
          <p v-show="!note.isEditing">
            {{ note.descr }}
          </p>
          <form
            @submit.prevent
            v-show="note.isEditing"
            class="width-90 uk-search uk-search-default uk-width-1-1 input-focus uk-position-relative input-focus"
            :class="{ 'width-60': !isGrid }"
          >
            <input type="text" v-model="note.descr" class="uk-input" />
            <button
              @click.prevent="editText(index, $event)"
              class="edit-icon uk-position-center-right"
              uk-icon="check"
            ></button>
          </form>
        </div>
        <div class="mg-20 uk-position-relative">
          <p>{{ note.date }}</p>
          <a
            class="uk-position-center-right"
            @click.prevent="editText(index, $event)"
            href=""
          >
            <i
              :class="{ active: note.isEditing }"
              class="fa-solid fa-file-pen"
            ></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notes: {
      type: Array,
      required: true,
    },
    isGrid: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    removeNote(index) {
      this.$emit("removeNote", index);
    },
    editText(index, event) {
      this.$emit("editText", index, event);
    },
  },
};
</script>

<style lang="scss">
.input-focus {
  & input {
    color: purple !important;
  }
}
.note {
  padding: 18px 20px;
  margin-bottom: 20px;
  background-color: #ffffff;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  box-shadow: 0 30px 30px rgba(0, 0, 0, 0.02);
  &:hover {
    transform: translate(0, -6px);
    transition-delay: 0s !important;
  }
}
.note-importance-2 {
  box-shadow: 0px 1px 20px 0px orange;
}
.note-importance-3 {
  box-shadow: 0px 1px 20px 0px rgb(255, 0, 0);
}
.note-title {
  color: rgb(132, 0, 255) !important;
  font-weight: 500;
  font-size: 25px;
}
.width-90 {
  width: 90%;
}
.width-60 {
  width: 60%;
}
.edit-icon.uk-position-center-right {
  right: 10px;
}
</style>
