<script lang="ts">
import { ref, computed, defineComponent, PropType } from 'vue';
import KanbanCard from '../molecules/KanbanCardV2.vue';
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
  order: 6,
  components: {
    draggable: VueDraggableNext,
    KanbanCard,
  },
  setup: (props, { emit }) => {

    console.log({ props })

    return {
    }
  },
})
</script>

<template>
  <div class="bg-slate-50 rounded-lg w-80 mx-2">
    <div class="flex justify-between my-2 px-4">
      <h2 class="font-bold uppercase" :style="{ 'color': column.color }">{{ column.title }}</h2>
      <i class="fa-solid fa-bars handle"></i>
    </div>
    <draggable class="dragArea list-group w-full" :list="cardList">
      <transition-group type="transition" name="flip-list">
        <KanbanCard
          v-for="element in cardList"
          :key="element.id"
          :card="element"
        />
      </transition-group>
    </draggable>
  </div>
</template>

<style scoped>
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