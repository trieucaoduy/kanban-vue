<script lang="ts">
import { ref, computed, defineComponent, PropType } from 'vue';
import KanbanCard from '../molecules/KanbanCard.vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { ICard } from '../../utils/types';


export default defineComponent({
  name: "kanbanColumn",
  props: {
    column: {
      type: Object,
      required: true,
    },
    cardList: Array as PropType<ICard[]>
  },
  display: 'Transition',
  components: {
    draggable: VueDraggableNext,
    KanbanCard,
  },
  emits: ['openAddTaskDialog'],
  setup: (props, { emit }) => {
    const openAddTaskDialog = (column: any) => {
      emit('openAddTaskDialog', column);
    }
    return {
      openAddTaskDialog,
    }
  },
})
</script>

<template>
  <div class="kanban-column bg-slate-50 rounded-lg w-80 p-4 mx-2 h-fit">
    <div class="flex justify-between mt-3">
      <h2 class="font-bold uppercase text-ellipsis overflow-hidden" :style="{ 'color': column.color }">{{ column.title }}</h2>
      <i class="fa-solid fa-bars handle cursor-pointer"></i>
    </div>
    <draggable class="kanban-column__drag-area overflow-auto dragArea list-group w-full my-2" :list="cardList" group="people">
      <transition-group type="transition" name="flip-list">
        <KanbanCard
          v-for="element in cardList"
          :key="element.id"
          :card="element"
        />
      </transition-group>
    </draggable>
    <button
      class="btn border border-blue-500 rounded text-blue-500 w-full"
      :style="'font-weight: normal'"
      @click="openAddTaskDialog(column)"
    >
      Add task
    </button>
  </div>
</template>

<style scoped>
.kanban-column__drag-area {
  max-height: 75vh;
}
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}

.btn {
  @apply font-bold py-2 px-4 rounded;
}
.btn-blue {
  @apply bg-blue-500 text-white;
}
.btn-blue:hover {
  @apply bg-blue-700;
}
</style>