<template>
  <div class="row">
    <div class="col-md-12">
      <h3>Cat Facts</h3>
    </div>
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
              <PopoverPanel
              :focus="true"
              
                class="absolute z-10 w-72 px-4 mt-3 -translate-x-1/2 transform px-4 sm:px-0"
              >
                <div
                  class="p-3 bg-white overflow-hidden rounded-lg shadow-lg 
                  ring-1 ring-black ring-opacity-5"
                >
                  <form @submit.prevent="onSubmit(close)">
                    <label for="name" class="block text-sm text-gray-600 
                    font-medium mb-1">Your new board:</label>
                    <input class="block w-full text-sm rounded-md border-gray-300 
                    shadow-sm focus:border-blue-400 focus:ring-blue-400"
                    v-model = "form.name"
                    type="text" name="name" id="name" placeholder="Board Name">
                    <p 
                    v-if="form.errors.name"
                    class="text-sm text-red-600">{{ form.errors.name }}</p>
                    <div class="flex justify-end mt-2">
                      <button class="px-4 py-2 text-sm font-medium text-white 
                      bg-rose-600 hover:bg-rose-500 rounded-md shadow-sm focus:ring-2 
                      focus:ring-offset focus:ring-rose-500 focus:autline-none"
                      >Create board</button>
                    </div>
                  </form>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
        </div>

        <ul
          class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <li
            v-for="board in posts"
            :key="board.id"
            class="relative bg-blue-600 hover:bg-blue-700 rounded-md min-h-[7rem]"
          >
          <h3 class="text-red-500 w-full m-4">{{ board.name }}</h3>
            <!-- <Link
              class="absolute inset-0 p-2 text-white text-lg font-bold"
              :href="route('boards.show', { board: board.id })"
            >
            </Link>  -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'


// function onSubmit(closePopover) {
//   form.post(route('boards.store'), {
//     onSuccess: () => closePopover(),
//   });
// }

export default {
  data() {
    return {
      posts: [],
      form:{name:"", errors:{name:false}  }
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/dashboard').then((response) => {
      console.log(response.data)
      this.posts = response.data
    })
  }
}

// import { defineComponent } from 'vue'
// import axios from 'axios'
// interface AnimalFacts {
//   name: string
// }
// export default defineComponent({
//   name: 'AnimalFacts',
//   data() {
//     return {
//       catFacts: [] as AnimalFacts[],
//       fetchingFacts: false
//     }
//   },
//   methods: {
//     async fetchCatFacts() {
//       const catFactsResponse = await axios.get<AnimalFacts[]>(
//         'http://127.0.0.1:8000/api/dashboard'
//       )
//       console.log(catFactsResponse.dashboard)
//       this.catFacts = catFactsResponse.data
//     },
//     async loadMoreFacts() {
//       this.fetchingFacts = true
//       const catFactsResponse = await axios.get<AnimalFacts[]>(
//         'http://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=5'
//       )
//       this.catFacts.push(...(catFactsResponse.data || []))

//       this.fetchingFacts = false
//     }
//   },
//   async mounted() {
//     await this.fetchCatFacts()
//   }
// })
</script>
