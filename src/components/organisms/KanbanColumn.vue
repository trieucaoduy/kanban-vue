<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue"
import KanbanCard from "@/components/molecules/KanbanCard.vue"
import { VueDraggableNext } from "vue-draggable-next"
import { ICard, IColumn } from "@/utils/types"
import { useCardHook } from "@/hooks/card"

export default defineComponent({
  name: "KanbanColumn",
  props: {
    column: {
      type: Object as PropType<IColumn>,
      required: true,
    },
    cardList: {
      type: Array as PropType<ICard[]>,
      required: true,
    },
  },
  display: "Transition",
  components: {
    draggable: VueDraggableNext,
    KanbanCard,
  },
  emits: ["handleDeleteCard", "hanldeEditCard"],
  setup: (props, { emit }) => {
    const { addCard } = useCardHook()
    const visibleDialog = ref(false)
    const currentCardId = ref("")
    const column = computed(() => props.column)

    // TODO:
    const handleDeleteCard = (cardId: string) => emit("handleDeleteCard", cardId, column?.value.type)
    const hanldeEditCard = (cardId: string) => emit("hanldeEditCard", cardId)

    const onAddCard = (type: string) => {
      addCard(type)
    }

    const handleOpenCardDialog = (cardId: string) => {
      visibleDialog.value = true
      currentCardId.value = cardId
    }

    const handleHideCardDialog = () => {
      visibleDialog.value = !visibleDialog.value
    }

    return {
      currentCardId,
      visibleDialog,
      onAddCard,
      handleHideCardDialog,
      handleDeleteCard,
      hanldeEditCard,
      handleOpenCardDialog,
    }
  },
})
</script>

<template>
  <div class="kanban-column bg-slate-50 rounded-lg min-w-80 w-80 p-4 mx-2 h-fit">
    <div class="flex justify-between mt-3">
      <h2 class="font-bold uppercase text-ellipsis overflow-hidden" :style="{ color: column.color }">
        {{ column.title }}
      </h2>
      <i class="fa-solid fa-bars handle cursor-pointer"></i>
    </div>
    <draggable
      class="kanban-column__drag-area overflow-auto dragArea list-group w-full my-2"
      :list="cardList"
      group="people"
    >
      <transition-group type="transition" name="flip-list">
        <KanbanCard
          v-for="element in cardList"
          :key="element.cardId"
          :card="element"
          @delete-card="handleDeleteCard"
          @edit-card="hanldeEditCard"
          @open-card-dialog="handleOpenCardDialog"
        />
      </transition-group>
    </draggable>
    <button
      class="btn border border-blue-500 rounded text-blue-500 w-full p-2 font-bold"
      @click="onAddCard(column.type)"
    >
      Add card
    </button>

    <CardModal
      v-if="visibleDialog"
      :card-id="currentCardId"
      :visible="visibleDialog"
      @hide-card-dialog="handleHideCardDialog"
    />
  </div>
</template>

<style scoped>
.kanban-column__drag-area {
  max-height: 75vh;
}
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}

.btn {
  @apply font-bold py-2 px-4 rounded;
}
.btn-blue {
  @apply bg-blue-500 text-white;
}
.btn-blue:hover {
  @apply bg-blue-700;
}
</style>
