<script>
import draggable from 'vuedraggable'
import axios from 'axios'
// import Select2 from 'vue3-select2-component';

import Modal from './modal/Modal.vue'
import {ref} from 'vue'
// import Modal from "./components/modal/Modal.vue"
export default {
  name: 'Show',
  isDropdownOpen: false,
  selectedOption: null,
  options: ['Option 1', 'Option 2', 'Option 3'],

  setup() {
    const isOpen = ref(false)

    return {isOpen}
  },
  components: {
    draggable,
    Modal
  },
  data() {
    return {
      lists: [],
      boardListName: '',
      password: '',
      card: '',
      loading:false,
      selectedList:null,
      cardTitle:'',
      toListId:null,
    }
  },
  methods: {
    add() {
      // Add new task logic
    },
    holo(list) {
      axios
          .post('http://localhost:8000/api/cards', {title: this.cardTitle , board_id:list.board_id,board_list_id:list.id})
          .then((res) => {
          })
          .catch(function (error) {
          }).finally(() => {
            this.loadBoard()

      })
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    onSortEnd(evt) {
      const oldCardIndex = evt.oldIndex;
      const newCardIndex = evt.newIndex;
      const fromListIndex = evt.from.getAttribute('data-list-index');
      const toListIndex = evt.to.getAttribute('data-list-index');

      const movedCard = evt.item._underlying_vm_;
      const fromList = this.lists[fromListIndex];
      const toList = this.lists[toListIndex];
      console.log(movedCard.id,toList.id)
      axios
          .put('http://localhost:8000/api/cards/'+movedCard.id, {board_list_id:toList.id})
          .then((res) => {
          })
          .catch(function (error) {
          }).finally(() => {
      })
      // console.log('Moved Card:', movedCard)
      // console.log('From List:', fromList)
      // console.log('To List:', toList)
    },
    onSortChange(evt) {
      const addedItem = evt.added ? evt.added.element : null
      const removedItem = evt.removed ? evt.removed.element : null
      const movedCard = addedItem || removedItem
      const fromList = removedItem ? this.lists[evt.removed.oldIndex] : null
      const toList = addedItem ? this.lists[evt.added.newIndex] : null
      // console.log(evt)

      // console.log('isAdd', !!evt.added)
      // console.log('isRemove', !!evt.removed)
      // Perform actions with movedCard, fromList, and toList
      // console.log('Moved Card:', movedCard)
      // console.log('From List:', fromList)
      // console.log('To List:', toList)
    },
    handleLogin(e) {
      e.preventDefault()
      axios
          .post('http://localhost:8000/api/boards/1/lists', {boardListName: this.boardListName})
          .then((res) => {
          })
          .catch(function (error) {
          }).finally(() => {
      })
    },

    handleCard(e) {
      e.preventDefault()
      axios
          .post('http://localhost:8000/api/cards', {title: this.title})
          .then((res) => {
          })
          .catch(function (error) {
          }).finally(() => {
      })
    },
  loadBoard(){
    axios.get('http://127.0.0.1:8000/api/boards/1').then((response) => {
      this.lists = response.data.lists
      this.lists.forEach((el) => {
        el.flag = false
      })
    })
  },
  },

  mounted() {
    this.loadBoard()

  }
}
</script>

<template>


  <!-- <button @click="isOpen = true">Show modal</button>

  <Modal :open="isOpen" @click="isOpen = !isOpen">
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae consequuntur delectus in,
      nobis inventore maiores. Assumenda saepe neque quas pariatur recusandae veniam! Facilis
      accusamus quasi non quia temporibus reprehenderit hic.
    </p>
  </Modal> -->

  <div class="container mt-5">
    <div class="row">
      <form>
        <div class="form-group">
          <label>BoardList</label>
          <input
              v-model="boardListName"
              type="boardListName"
              class="form-control form-control-lg"
          />
        </div>
        <button @click="handleLogin" type="submit" class="btn btn-dark btn-lg btn-block">
          Add Boardlist
        </button>
      </form>

      <form>
        <div class="form-group">
          <label>Card</label>
          <input v-model="title" type="title" class="form-control form-control-lg"/>
        </div>

        <button @click="handleCard" type="submit" class="btn btn-dark btn-lg btn-block">
          Create Card
        </button>
      </form>

      <!-- <div>
        <select v-model="selectedOption">
          <option v-for="option in options" :value="option">{{ option }}</option>
        </select>
        <p>Selected option: {{ selectedOption }}</p>
      </div> -->

      <div class="col form-inline">
        <b-form-input
            id="input-2"
            v-model="newTask"
            required
            placeholder="Enter Task"
            @keyup.enter="add"
        ></b-form-input>
        <b-button @click="add" variant="primary" class="ml-3">Add</b-button>
      </div>
    </div>
    <div v-if="!loading" class="row mt-5 flex-nowrap">
      <div class="col-3" v-for="(list, index) in lists" :key="index">
        <div
            class="p-2 w-full alert h-50 overflow-scroll"
            :class="['alert-secondary', 'alert-primary', 'alert-warning', 'alert-success'][index]"
        >
          <div class="d-flex">
            <h4>
              {{ list.name }}
            </h4>
            <button v-on:click="list.flag = !list.flag" class="h-25" >
              <i  class="fa fa-bars"> </i>
            </button>

            <!-- </i> -->
          </div>
          <Modal :key="list.id" :open="list.flag" @close="list.flag = false;holo(list);" >
            <input type="text" v-model="cardTitle"/>
          </Modal>

          <draggable

              class="list-group kanban-column"
              :list="list.cards"
              @end="onSortEnd"
              group="tasks"
              :data-list-index="index"
              @change="onSortChange"
          >
            <template #item="{ element }">
              <div  class="list-group-item">
                {{ element.title }}
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.kanban-column {
  min-height: 300px;
}

.dropdown {
  display: none; /* Initially hide the dropdown */
}

.dropdown.open {
  display: block; /* Show the dropdown when open */
}
</style>
