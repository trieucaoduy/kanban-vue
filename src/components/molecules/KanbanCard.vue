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
    class="kanban-card bg-white rounded-lg shadow p-3 mb-2 cursor-pointer relative"
    draggable="true"
    @dragstart="dragStart($event, card)"
  >
    <div class="kanban-card__title">{{ card.title }}</div>
    <div class="kanban-card__body">
      <p class="kanban-card__summary py-2">Summay task</p>
    </div>
    <div class="kanban-card__footer flex justify-between">
      <div class="kanban-card__checklist"><i class="fas fa-tasks"></i> 2/4</div>
      <div class="kanban-card__due-date">Due 4 days</div>
    </div>
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

  .kanban-card {
    box-shadow: 0 0.1875rem 0.375rem rgba(33, 37, 41, 0.05);
  }
</style>