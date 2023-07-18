<script>
import draggable from 'vuedraggable'
import axios from 'axios'
import { Icon } from '@iconify/vue'

export default {
  name: 'App',
  components: {
    draggable
  },
  data() {
    return {
      lists: []
    }
  },
  methods: {
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
    axios.get('http://127.0.0.1:8000/api/dashboard').then((response) => {
      this.lists = response.data
      console.log(response.data)
    })
  }
}
// const props = defineProps({
//   dashboard: Array,
// });

// console.log(props);

// const form =useForm({
//   name: '',
// });

function onSubmit(closePopover) {
  form.post(route('boards.store'), {
    onSuccess: () => closePopover()
  })
}
</script>

<template>
  <Head title="Dashboard" />

  <AuthenticatedLayout>
    <div class="h-full bg-gray-50 px-4 py-6 overflow-y-auto">
      <div class="max-w-5xl mx-auto">
        <div class="flex item-center mb-4">
          <h3 class="font-black text-gray-700">My boards</h3>
          <Popover class="relative">
            <PopoverButton
              :class="open ? 'bg-blue-50' : ''"
              class="inline-flex items-center ml-4 py-1 px-3 bg-gray-100 rounded front-medium hover:bg-gray-200"
            >
              <PlusIcon class="-ml-1w-4 h-4" />
              <span class="ml-1">Create board</span>
            </PopoverButton>
            <PopoverOverlay class="z-10 fixed inset-0 bg-black opacity-30" />

            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="translate-y-1 opacity-0"
              enter-to-class="translate-y-0 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="translate-y-0 opacity-100"
              leave-to-class="translate-y-1 opacity-0"
            >
              <div
                class="p-3 bg-white overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
              >
                <form>
                  <label for="name" class="block text-sm text-gray-600 font-medium mb-1"
                    >Your new board:</label
                  >
                </form>
              </div>
            </transition>
          </Popover>
        </div>
        
        <router-link
          :to="{
            name: 'show',
            params: {
              id: '1'
            }
          }"
        >
          show
        </router-link>
        <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <li
            v-for="board in lists"
            :key="board.id"
            class="relative bg-blue-600 hover:bg-blue-700 rounded-md min-h-[7rem]"
          >
            <h3 class="text-black w-full m-4">{{ board.id }}</h3>

            <!-- <Link
              class="absolute inset-0 p-2 text-white text-lg font-bold"
              :href="route('boards.show', { board: board.id })"
            >
            </Link>  -->
          </li>
        </ul>
      </div>
    </div>
    <!-- <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">You're logged in!</div>
                </div>
            </div>
        </div> -->
  </AuthenticatedLayout>
</template>
