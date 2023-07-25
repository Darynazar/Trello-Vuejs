<script>
import draggable from 'vuedraggable'
import axios from 'axios'
// import Select2 from 'vue3-select2-component';

import Modal from './modal/Modal.vue'
import { ref } from 'vue'
// import Modal from "./components/modal/Modal.vue"
export default {
  name: 'App',
  isDropdownOpen: false,
  selectedOption: null,
  options: ['Option 1', 'Option 2', 'Option 3'],

  setup() {
    const isOpen = ref(false)

    return { isOpen }
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
      card: ''
    }
  },
  methods: {
    add() {
      // Add new task logic
    },
    holo(index) {
      console.log(this.lists[index].flag)
      console.log(index)
      this.lists[index].flag = !this.lists[index].flag
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    onSortChange(evt) {
      const addedItem = evt.added ? evt.added.element : null
      const removedItem = evt.removed ? evt.removed.element : null
      const movedCard = addedItem || removedItem
      const fromList = removedItem ? this.lists[evt.removed.oldIndex] : null
      const toList = addedItem ? this.lists[evt.added.newIndex] : null

      console.log('isAdd', !!evt.added)
      console.log('isRemove', !!evt.removed)
      // Perform actions with movedCard, fromList, and toList
      console.log('Moved Card:', movedCard)
      console.log('From List:', fromList)
      console.log('To List:', toList)
    },
    handleLogin(e) {
      this.loading = true
      e.preventDefault()
      axios
        .post('http://localhost:8000/api/boards/1/lists', { boardListName: this.boardListName })
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            console.log(res.data)
            router.push('show')
            this.loading = false
          }
        })
        .catch(function (error) {
          console.error(error)
        })
    },

     handleCard(e) {
      this.loading = true
      e.preventDefault()
      axios
        .post('http://localhost:8000/api/cards', { title: this.title })
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            console.log(res.data)
            router.push('show')
            this.loading = false
          }
        })
        .catch(function (error) {
          console.error(error)
        })
    }
  },
  
  mounted() {
    axios.get('http://127.0.0.1:8000/api/boards/1').then((response) => {
      console.log(response.data)
      this.lists = response.data.lists
      this.lists.forEach((el) => {
        el.flag = false
      })
      console.log(this.lists)
    })
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
          <input v-model="title" type="title" class="form-control form-control-lg" />
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
    <div class="row mt-5 flex-nowrap">
      <div class="col-3" v-for="(list, index) in lists" :key="list.id">
        <div
          class="p-2 w-full alert h-50 overflow-scroll"
          :class="['alert-secondary', 'alert-primary', 'alert-warning', 'alert-success'][index]"
        >
          <div class="d-flex">
            <h4>
              {{ list.name }}
            </h4>
            <button class="h-25" @click="holo(index)">
              <i :open="this.lists[index].flag" @click="holo(index)" class="fa fa-bars"> </i>
            </button>

            <!-- </i> -->
          </div>
          <Modal :key="list.id" :open="this.lists[index].flag" @click="holo(index)">
            <input type="text" />
          </Modal>

          <draggable
            class="list-group kanban-column"
            :list="list.cards"
            group="tasks"
            @change="onSortChange"
          >
            <template #item="{ element }">
              <div class="list-group-item">
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
