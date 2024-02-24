<script lang="ts">
import { PropType, computed, defineComponent } from 'vue';
import KanbanCard from '../molecules/KanbanCard.vue';
import { ICard } from '../../utils/types';

export default defineComponent({
    name: "KanbanColumn",
    components: { KanbanCard },
    props: {
        column: Object,
        status: String,
        cards: Array as PropType<ICard[]>
    },
    emits: ['moveCard'],
    setup: (props, { emit }) => {
        const cards = computed(() => props.cards ?? []);
        const status = computed(() => props.status ?? "");
        const column = computed(() => props.column ?? {})

        const drop = event => {
            const cardId = event.dataTransfer.getData('text/plain');
            emit('moveCard', parseInt(cardId, 10), props.status);
        };
        return {
            cards,
            status,
            column,
            drop
        }
    },
})
</script>

<template>
  <div
    class="kanban-column bg-white shadow rounded flex-1 mx-2"
    @dragover.prevent
    @drop="drop($event)"
  >
    <h2 class="font-bold mb-2 p-2" :style="{ background: column.color, color: '#fff' }">{{ status }}</h2>
    <KanbanCard
      v-for="card in cards"
      :key="card.id"
      :card="card"
      class="p-4 mx-2"
      :column-color="column.color"
    ></KanbanCard>
  </div>

</template>