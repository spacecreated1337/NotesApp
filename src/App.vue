<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <section id="app">
        <newNote @addNewNote="addNewNote" :note="note" :title="title" />
        <div class="uk-container-small uk-container">
          <div class="flex-between uk-margin-medium-top uk-flex-wrap" uk-grid>
            <div class="uk-width-1-5@s">
              <h1 class="color-purple">Все заметки</h1>
            </div>
            <div class="uk-width-2-5@s uk-width-1-1">
              <search
                @search="search = $event"
                :value="search"
                placeholder="Найти заметку"
              />
            </div>
            <div class="uk-flex uk-flex-middle uk-flex-right@m uk-width-1-5@s">
              <a @click.prevent="sortNotes" class="mg-right" href="">
                <i
                  :class="{ active: isSorted }"
                  class="fa-solid fa-arrow-down-short-wide sort-icon"
                ></i>
              </a>
              <p class="mg-right">
                <svg
                  @click.prevent="changeToGrid"
                  style="cursor: pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  :class="{ active: isGrid }"
                >
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </p>
              <p>
                <svg
                  @click.prevent="changeToColumn"
                  style="cursor: pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  :class="{ active: !isGrid }"
                >
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3" y2="6"></line>
                  <line x1="3" y1="12" x2="3" y2="12"></line>
                  <line x1="3" y1="18" x2="3" y2="18"></line>
                </svg>
              </p>
            </div>
          </div>
          <notes
            :notes="filteredNotes"
            @removeNote="removeNote"
            :isGrid="isGrid"
            @editText="editText"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import notes from "@/components/Notes.vue";
import newNote from "@/components/NewNote.vue";
import search from "@/components/Search.vue";
export default {
  components: {
    notes,
    newNote,
    search,
  },
  data() {
    return {
      search: "",
      isGrid: true,
      isSorted: false,
      title: "Notes App",
      note: {
        title: "",
        descr: "",
        importance: "",
        isEditing: false,
      },
      notes: [],
    };
  },
  methods: {
    editText(index, event) {
      let target = event.target;
      this.notes[index].isEditing = !this.notes[index].isEditing;
      let localNoteList = JSON.parse(localStorage.getItem("noteList"));
      if (
        localNoteList[index].title != this.notes[index].title ||
        localNoteList[index].descr != this.notes[index].descr
      ) {
        if (
          target.classList.contains("active") ||
          target.tagName == "A" ||
          target.tagName == "BUTTON"
        ) {
          this.notes[index].date = new Date(Date.now()).toLocaleString();
          localStorage.setItem("noteList", JSON.stringify(this.notes));
        }
      }
    },
    addNewNote() {
      let { title, descr, importance } = this.note;
      if (this.note.title === "") {
        UIkit.notification({
          message: "Вы ввели неполные данные…",
          status: "danger",
          timeout: 1500,
        });
      } else {
        this.notes.push({
          title,
          descr,
          importance,
          date: new Date(Date.now()).toLocaleString(),
        });
        this.note.title = "";
        this.note.descr = "";
        this.note.importance = "1";
        localStorage.setItem("noteList", JSON.stringify(this.notes));
        UIkit.notification({
          message: "Добавлена новая заметка",
          status: "warning",
          timeout: 1500,
        });
      }
    },
    removeNote(index) {
      UIkit.notification({
        message: `Удалена запись ${this.notes[index].title}`,
        status: "warning",
        timeout: 1500,
      });
      this.notes.splice(index, 1);
      localStorage.setItem("noteList", JSON.stringify(this.notes));
    },
    changeToColumn() {
      this.isGrid = false;
      localStorage.setItem("isGrid", false);
    },
    changeToGrid() {
      this.isGrid = true;
      localStorage.setItem("isGrid", true);
    },
    sortNotes() {
      this.isSorted = !this.isSorted;
      if (this.isSorted) {
        this.notes = this.notes
          .map((item) => {
            return item;
          })
          .sort((a, b) => {
            return b.importance - a.importance;
          });
      }
      if (!this.isSorted) {
        this.notes = this.notes
          .map((item) => {
            return item;
          })
          .sort((a, b) => {
            a.date = a.date.split("/").reverse().join("");
            b.date = b.date.split("/").reverse().join("");
            return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
          });
      }
    },
  },
  created() {
    const notes = JSON.parse(localStorage.getItem("noteList"));
    if (notes) {
      this.notes = notes;
      this.notes.forEach((item) => {
        item.isEditing = false;
      });
    }
    const displayState = JSON.parse(localStorage.getItem("isGrid"));
    if (displayState) {
      this.isGrid = displayState;
    } else {
      this.isGrid = false;
    }
  },
  computed: {
    filteredNotes() {
      return this.notes.filter((note) => {
        return note.title.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
};
</script>
<style>
* {
  box-sizing: border-box;
  font-family: "Koulen", cursive;
}
body {
  background-color: rgb(249 249 249);
}
.text-center {
  text-align: center;
}
.headers-margin {
  margin: 30px 0 15px 0;
}
.flex {
  display: flex;
  flex-wrap: wrap;
}
.flex-between {
  justify-content: space-between;
  align-items: center;
}
.custom-input {
  width: 100%;
  border-radius: 15px;
  padding: 10px 20px;
  background-color: #fff;
  border: 1px solid teal;
  margin-bottom: 0;
}
.mg-20 {
  margin-top: 20px;
}
.custom-bt {
  color: #fff;
  background-color: blue;
  border-radius: 25px;
  padding: 15px 60px;
}
.mg-50 {
  margin-top: 50px;
}
input.nosubmit {
  width: 100%;
  padding: 9px 4px 9px 40px;
  background: transparent
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
    no-repeat 13px center;
}
.width30 {
  width: 30%;
}
.mg-right {
  margin-right: 15px;
}
.custom-card {
  margin: 15px 0;
  padding: 20px 20px 20px 20px;
  background: #fff;
  border: 2px solid rgba(0, 0, 0, 0.349);
}
.color-purple {
  color: purple;
  font-size: 26px;
}
.red {
  color: red;
}
.active {
  color: purple !important;
}
.uk-notification .uk-notification-message {
  background: #ffffff !important;
  box-shadow: 1px 1px 7px 0px;
}
.sort-icon {
  font-size: 27px;
  color: #666666c7;
}
</style>
