<template>
  <div>
    <draggable
      class="dragArea list-group w-full"
      handle=".handle"
      ghost-class="ghost"
      :class="'flex'"
      :list="columnList">
      <transition-group type="transition" name="flip-list">
        <KanbanColumn
          v-for="element in columnList"
          :key="element.type"
          :column="element"
          :cardList="element.items"
        />
      </transition-group>
    </draggable>
  </div>
</template>
<script>
  import { defineComponent, ref } from 'vue';
  import { VueDraggableNext } from 'vue-draggable-next';
  import KanbanColumn from '@/components/organisms/KanbanColumn.vue';

  export default defineComponent({
    components: {
      draggable: VueDraggableNext,
      KanbanColumn,
    },
    setup: () => {
      const columnList = ref([
        {
          type: 'todo',
          title: 'To do',
          color: '#f59e0b',
          items: [
            { name: 'John', id: 1, status: 'todo' }
          ]
        },
        {
          type: 'inprogress',
          title: 'In Progress',
          color: '#0ea5e9',
          items: [
            { name: 'Jean', id: 3, status: 'inprogress' }
          ]
        },
        {
          type: 'review',
          title: 'Review',
          color: '#a78bfa',
          items: []
        },
        {
          type: 'done',
          title: 'Done',
          color: '#22c55e',
          items: []
        },
      ]);

      return {
        columnList,
      }
    }
  })
</script>