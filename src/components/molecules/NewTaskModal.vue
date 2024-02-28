<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    visible: Boolean,
  },
  emits: ['addTask', 'hideDialog'],
  setup: (_, { emit }) => {
    const taskName = ref("");

    const addTask = () => {
      if (!taskName.value) return;
      emit('addTask', taskName.value);
      taskName.value = "";
    }

    const hideDialog = () => {
      emit('hideDialog')
    }

    return {
      taskName,
      addTask,
      hideDialog,
    }
  }
})
</script>
<template>
  <div class="fixed inset-0 flex justify-center items-center" tabindex="-1" v-if="visible">
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 z-10" @click="hideDialog"></div>
    <div class="fixed z-20 mx-auto">
      <div class="bg-white p-5 rounded-lg shadow-lg">
        <h2 class="text-lg font-bold mb-4">Add New Task</h2>
        <input
          v-model="taskName"
          type="text"
          placeholder="Task Name"
          class="border p-2 w-full mb-4"
        />
        <button
          @keyup="'enter'"
          @click="addTask"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>  