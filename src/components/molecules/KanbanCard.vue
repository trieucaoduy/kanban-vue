<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { ICard } from '../../utils/types';

export default defineComponent({
  name: "KanbanCard",
  props: {
    card: Object as PropType<ICard>,
    columnColor: String,
  },
  setup: (props) => {
    const dragStart = (event: DragEvent, card: ICard) => {
      (event.dataTransfer as DataTransfer).setData('text/plain', card.id.toString());
    };
    const card = computed(() => props.card as ICard);

    const getClassCard = (status: string) => {
      return status.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
          return index == 0 ? word.toLowerCase() : word.toUpperCase();
      }).replace(/\s+/g, '');
    }

    return {
      card,
      dragStart,
      getClassCard,
    }
  }
})
</script>

<template>
  <div
    :class="`kanban-card bg-gray-100 rounded shadow p-3 mb-2 cursor-pointer relative ${getClassCard(card.status)}`"
    draggable="true"
    @dragstart="dragStart($event, card)"
  >
    {{ card.title }}
  </div>
</template>

<style scoped>
  .kanban-card::before {
    content: ' ';
    width: 5px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .kanban-card.new::before {
    background-color: #a78bfa;
  }
  .kanban-card.toDo::before {
    background-color: #f59e0b;
  }
  .kanban-card.inProgress::before {
    background-color: #0ea5e9;
  }
  .kanban-card.done::before {
    background-color: #22c55e;
  }
</style>