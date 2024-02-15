<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { ICard } from '../../utils/types';

export default defineComponent({
  name: "KanbanCard",
  props: {
    card: Object as PropType<ICard>
  },
  setup: (props) => {
    const dragStart = (event, card) => {
      event.dataTransfer.setData('text/plain', card.id);
    };
    const card = computed(() => props.card as ICard);

    return {
      card,
      dragStart
    }
  }
})
</script>

<template>
  <div
    class="kanban-card bg-gray-100 rounded shadow p-3 mb-2 cursor-pointer"
    draggable="true"
    @dragstart="dragStart($event, card)"
  >
    {{ card.title }}
  </div>

</template>