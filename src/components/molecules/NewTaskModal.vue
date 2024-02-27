<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    visible: Boolean,
  },
  emits: ['addTask'],
  setup: (props, { emit }) => {
    const taskName = ref("");

    const addTask = () => {
      if (!taskName.value) return;
      emit('addTask', taskName.value);
      taskName.value = "";
    }

    return {
      taskName,
      addTask,
    }
  }
})
</script>
<template>
  <div v-if="visible" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-5 rounded-lg shadow-lg">
      <h2 class="text-lg font-bold mb-4">Add New Task</h2>
      <input
        v-model="taskName"
        type="text"
        placeholder="Task Name"
        class="border p-2 w-full mb-4"
      />
      <button
        @click="addTask"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </div>
  </div>
</template>  