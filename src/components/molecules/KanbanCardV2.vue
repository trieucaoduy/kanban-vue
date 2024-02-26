<script lang="ts">
import { defineComponent, computed, ref } from 'vue';

export default defineComponent({
  name: "KanbanCard",
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  setup: (props) => {
    console.log({ props})
    return {
    };
  },
})
</script>

<template>
  <div class="rounded-md bg-white shadow px-2 py-4 m-4">
    {{ card.name }}
  </div>
</template>