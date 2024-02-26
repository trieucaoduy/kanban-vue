<template>
  <div>
    <draggable
      class="dragArea list-group w-full"
      handle=".handle"
      ghost-class="ghost"
      :class="'flex m-10'"
      :list="columnList">
      <KanbanColumn
        v-for="element in columnList"
        :key="element.id"
        :column="element"
        :cardList="cardList.filter(card => card.status === element.type)"
      />
    </draggable>
  </div>
</template>
<script>
  import { defineComponent, ref } from 'vue';
  import { VueDraggableNext } from 'vue-draggable-next';
  import KanbanColumn from '@/components/organisms/KanbanColumnV2.vue';

  export default defineComponent({
    components: {
      draggable: VueDraggableNext,
      KanbanColumn,
    },
    setup: () => {
      const columnList = ref([
        { type: 'todo', title: 'To do', color: '#f59e0b' },
        { type: 'inprogress', title: 'In Progress', color: '#0ea5e9' },
        { type: 'review', title: 'Review', color: '#a78bfa' },
        { type: 'done', title: 'Done', color: '#22c55e' },
      ]);
      const cardList = ref([
        { name: 'John', id: 1, status: 'todo' },
        { name: 'Joao', id: 2, status: 'todo' },
        { name: 'Jean', id: 3, status: 'inprogress' },
        { name: 'Gerard', id: 4, status: 'todo' },
      ])

      return {
        columnList,
        cardList,
      }
    }
  })
</script>