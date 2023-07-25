<template>
<div
          class="p-2 w-full alert h-50 overflow-scroll"
          ref="list.name"
          :class="['alert-secondary', 'alert-primary', 'alert-warning', 'alert-success'][index]"
        >
          <div class="d-flex">
            <h4>
              {{ list.name }}
            </h4>
            <button class="h-50" @click="isOpen = true">
              <i class="fa fa-bars"> </i>
            </button>
          </div>
          <Modal :open="isOpen" @click="isOpen = !isOpen">
            <input type="text" />
          </Modal>

          <button @click="openModal(' modal-1 ')">Open Modal 1</button>
          <Modal :id="'modal-1'" v-if="isModalOpen('modal-1')" @close="closeModal('modal-1')" />

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

</template>