<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import KanbanColumn from '../components/organisms/KanbanColumn.vue';
import NewTaskModal from '../components/molecules/NewTaskModal.vue';
import AddTaskButton from '../components/atoms/AddTaskButton.vue';

export default defineComponent({
    name: "Kanban",
    components: { KanbanColumn, NewTaskModal, AddTaskButton },
    setup: () => {
      const showModal = ref(false);
      const cards = ref([
          { id: 1, title: 'Task 1', status: 'To Do' },
      ]);
      const columnStatuses = ['To Do', 'In Progress', 'Review', 'Done'];
      const columnList = [
        { id: 'todo', title: 'To do', color: '#f59e0b' },
        { id: 'inprocess', title: 'In Progress', color: '#0ea5e9' },
        { id: 'review', title: 'Review', color: '#a78bfa' },
        { id: 'done', title: 'Done', color: '#22c55e' },
      ]
      const moveCard = (cardId: number, newStatus: string) => {
          const card = cards.value.find(card => card.id === cardId);
          if (card) card.status = newStatus;
      };
      const openModal = (value: boolean) => showModal.value = value;
      const createItemTask = (taskValue: any) => {
        return { id: cards.value.length + 1, title: taskValue, status: 'To do' };
      }

      const onAddTask = (isAdded: any, taskValue: any) => {
        showModal.value = false;
        const dataTask = createItemTask(taskValue);
        cards.value.push(dataTask);
      }

      return {
        showModal,
        cards,
        columnStatuses,
        columnList,
        moveCard,
        openModal,
        onAddTask
      };
    },
})
</script>

<template>
  <div class="kanban-main">
    <div class="flex justify-center align-center p-5 ">
      <AddTaskButton @openModal="openModal" />
    </div>
    <div class="flex p-5 overflow-x-auto" style="min-height: 80vh">
      <KanbanColumn
        v-for="column in columnList"
        :key="column.title"
        :status="column.title"
        :column="column"
        :cards="cards.filter(card => card.status === column.title)"
        @moveCard="moveCard"
      ></KanbanColumn>
    </div>
    <NewTaskModal :show="showModal" @addTask="onAddTask" />
  </div>
</template>