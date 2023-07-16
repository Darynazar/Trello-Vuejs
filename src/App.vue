<script>
// import draggable from 'vuedraggable';
import { ref } from 'vue'
import axios from 'axios'
import draggable from 'vuedraggable'

export default {
  setup() {
    const items = ref([
      { id: 0, title: 'Item A', list: 1 },
      { id: 1, title: 'Item B', list: 1 },
      { id: 2, title: 'Item C', list: 2 }
    ])

    const getList = (list) => {
      return items.value.filter((item) => item.list == list)
    }

    const startDrag = (event, item) => {
      console.log(item)
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('itemID', item.id)
    }

    const onDrop = (event, list) => {
      const itemID = event.dataTransfer.getData('itemID')
      const item = item.value.find((item) => item.id == itemID)
      item.list = list
    }
    return {
      getList,
      onDrop,
      startDrag
    }
  },
  data() {
    return {
      posts: [],
      form: { name: '', errors: { name: false } },
      drag: false
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/dashboard').then((response) => {
      console.log(response.data)
      this.posts = response.data
    })
  }
}
</script>

<template>
  <div class="drop-zone" @drop="onDrop($event, 1)" @dragenter.prevent @dragover.prevent>
    <div
      v-for="item in getList(1)"
      :key="item.id"
      class="drag-el"
      draggable="true"
      @dragstart="startDrag($event, item)"
    >
      {{ item.title }}
    </div>
  </div>
  <div class="drop-zone" @drop="onDrop($event, 2)" @dragenter.prevent @dragover.prevent>
    <div
      v-for="item in getList(2)"
      :key="item.id"
      class="drag-el"
      draggable="true"
      @dragstart="startDrag($event, item)"
    >
      {{ item.title }}
    </div>
  </div>
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
      <div class="col-3">
        <div class="p-2 alert alert-secondary">
          <h3>Back Log</h3>
          <!-- Backlog draggable component. Pass arrBackLog to list prop -->
          <draggable 
          class="list-group kanban-column" 
          :list="posts" 
          group="tasks">
            <div class="list-group-item" 
            v-for="element in posts" 
            :key="element.name"
            draggable="true">
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </div>

      <!-- <draggable v-model="posts" group="posts" item-key="posts.id">
        <template #item="{ element }">
          <div>{{ element.name }}</div>
        </template>
      </draggable> -->

      <div class="col-3">
        <div class="p-2 alert alert-primary">
          <h3>In Progress</h3>
          <!-- In Progress draggable component. Pass arrInProgress to list prop -->
          <draggable class="list-group kanban-column" :list="arrInProgress" group="tasks">
            <div class="list-group-item" v-for="element in arrInProgress" :key="element.name">
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-3">
        <div class="p-2 alert alert-warning">
          <h3>Testing</h3>
          <!-- Testing draggable component. Pass arrTested to list prop -->
          <draggable class="list-group kanban-column" :list="arrTested" group="tasks">
            <div class="list-group-item" v-for="element in arrTested" :key="element.name">
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-3">
        <div class="p-2 alert alert-success">
          <h3>Done</h3>
          <!-- Done draggable component. Pass arrDone to list prop -->
          <draggable class="list-group kanban-column" :list="arrDone" group="tasks">
            <div class="list-group-item" v-for="element in arrDone" :key="element.name">
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.drop-zone {
  width: 50%;
  margin: 50px auto;
  background-color: aliceblue;
  padding: 10px;
  min-height: 10px;
}

.drag-el {
  background-color: blue;
  color: white;
  padding: 5px;
  margin-bottom: 10px;
}

.drag-el:nth-last-of-type(1) {
  margin-bottom: 0;
}
.kanban-column {
  min-height: 300px;
}
</style>
