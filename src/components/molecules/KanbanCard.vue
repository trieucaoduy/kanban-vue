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
    return {
    };
  },
})
</script>

<template>
  <div class="rounded-md bg-white shadow px-3 py-4 my-4">
    <div class="kanban-card__title font-bold">{{ card.name }}</div>
    <div class="kanban-card__body">
      <p class="kanban-card__summary py-2">Summay task</p>
    </div>
    <div class="kanban-card__footer flex justify-between">
      <div class="kanban-card__checklist"><i class="fas fa-tasks"></i> 2/4</div>
      <div class="kanban-card__due-date">Due 4 days</div>
    </div>
  </div>
</template>