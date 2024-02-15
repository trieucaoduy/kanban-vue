<script lang="ts">
import { defineComponent, ref } from 'vue';
import KanbanColumn from '../components/organisms/KanbanColumn.vue';
import NewTaskModal from '../components/molecules/NewTaskModal.vue';
import AddTaskButton from '../components/atoms/AddTaskButton.vue';

export default defineComponent({
    name: "Kanban",
    components: { KanbanColumn, NewTaskModal, AddTaskButton },
    setup: () => {
      const showModal = ref(false);
      const cards = ref([
          { id: 1, title: 'Task 1', status: 'New' },
      ]);
      const columnStatuses = ['New', 'To Do', 'In Progress', 'Done'];
      const moveCard = (cardId, newStatus) => {
          const card = cards.value.find(card => card.id === cardId);
          if (card) {
              card.status = newStatus;
          }
      };
      const openModal = (value) => showModal.value = value;
      const createItemTask = (taskValue) => {
        return { id: cards.value.length + 1, title: taskValue, status: 'New' };
      }

      const onAddTask = (isAdded, taskValue) => {
        showModal.value = false;
        const dataTask = createItemTask(taskValue);
        cards.value.push(dataTask);
      }

      return {
        showModal,
        cards,
        columnStatuses,
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
    <div class="flex justify-around p-5 bg-gray-100" style="min-height: 80vh">
      <KanbanColumn
        v-for="status in columnStatuses"
        :key="status"
        :status="status"
        :cards="cards.filter(card => card.status === status)"
        @moveCard="moveCard"
      ></KanbanColumn>
    </div>
    <NewTaskModal :show="showModal" @addTask="onAddTask" />
  </div>
</template>