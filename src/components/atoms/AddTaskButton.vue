<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "AddTaskButton",
    emits: ['openModal'],
    setup: (_, { emit }) => {
        const openModal = () => emit('openModal', true);
        return {
            openModal
        }
    }
})
</script>

<template>
    <button
        @click="openModal()"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
        Add New Task
    </button>
</template>