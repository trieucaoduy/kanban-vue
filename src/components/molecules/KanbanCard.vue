<script lang="ts">
import { defineComponent, computed, ref } from 'vue';

export default defineComponent({
  name: "KanbanCard",
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  setup: (props) => {
    const visibleMenuTask = ref(false);

    const showMenuTask = () => visibleMenuTask.value = !visibleMenuTask.value;

    return {
      visibleMenuTask,
      showMenuTask,
    };
  },
})
</script>

<template>
  <div class="rounded-md cursor-grab bg-white shadow px-3 py-4 my-4">
    <div class="flex justify-between gap-1">
      <div class="kanban-card__title text-ellipsis overflow-hidden font-bold cursor-pointer">{{ card.name }}</div>
      <div class="relative inline-block text-left">
        <div class="cursor-pointer w-2" @click="showMenuTask()">
          <i class="fa-solid fa-ellipsis-vertical" id="menu-button" aria-expanded="true" aria-haspopup="true"></i>
        </div>
        <div v-if="visibleMenuTask" class="absolute right-0 z-10 mt-2 w-35 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
          <div class="py-1" role="none">
            <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Edit</a>
            <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Delete</a>
          </div>
        </div>
      </div>
    </div>
    <div class="kanban-card__body">
      <p class="kanban-card__summary py-2">Summay task</p>
    </div>
    <div class="kanban-card__footer flex justify-between">
      <div class="kanban-card__checklist"><i class="fas fa-tasks"></i> 2/4</div>
      <div class="kanban-card__due-date">Due 4 days</div>
    </div>
  </div>
</template>