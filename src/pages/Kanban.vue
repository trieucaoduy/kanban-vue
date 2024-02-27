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
          @openAddTaskDialog="onOpenAddTaskDialog"
        />
      </transition-group>
    </draggable>
  </div>
  <NewTaskModal
   :visible="isVisableAddTask"
   @addTask="onAddTask"
   />
</template>
<script>
  import { defineComponent, ref } from 'vue';
  import { VueDraggableNext } from 'vue-draggable-next';
  import KanbanColumn from '@/components/organisms/KanbanColumn.vue';
  import NewTaskModal from '@/components/molecules/NewTaskModal.vue';
  import { COLUMN_LIST } from '@/utils/constants';

  export default defineComponent({
    components: {
      draggable: VueDraggableNext,
      KanbanColumn,
      NewTaskModal
    },
    setup: () => {
      const columnList = ref(COLUMN_LIST);
      const isVisableAddTask = ref(false);
      const currentTypeTask = ref("");

      const onAddTask = (taskName) => {
        isVisableAddTask.value = false;
        columnList.value.map((column) => {
          if (column.type === currentTypeTask.value) {
            column.items.push({
              name: taskName,
              id: Date.now(),
              status: currentTypeTask.value
            })
          }
        })
      }

      const onOpenAddTaskDialog = (column) => {
        isVisableAddTask.value = true;
        currentTypeTask.value = column?.type;
      }

      return {
        columnList,
        isVisableAddTask,
        onOpenAddTaskDialog,
        onAddTask,
      }
    }
  })
</script>