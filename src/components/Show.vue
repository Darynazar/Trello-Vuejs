<script>
import draggable from 'vuedraggable'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    draggable
  },
  data() {
    return {
      lists: [],
      newTask: ''
    }
  },
  methods: {
    add() {
      // Add new task logic
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
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/boards/2').then((response) => {
        console.log(response.data)
      this.lists = response.data.lists
    })
  }
}
</script>

<template>
  <head>
    <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css" />
  </head>
  <div class="container mt-5">
    <div class="row">
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
    <div class="row mt-5">
      <div class="col-3" v-for="(list, index) in lists" :key="list.id">
        <div
          class="p-2 w-full alert"
          :class="['alert-secondary', 'alert-primary', 'alert-warning', 'alert-success'][index]"
        >
          <h4>{{ list.name }}
        <button
            class="hidden w-8 h-8 bg-gray-50 group-hover:grid rounded-md text-gray-600 hover:text-black hover:bg-gray-200"
          >
            <i class="fa fa-bars w-5" />
          </button>
        </h4>
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
</style>
