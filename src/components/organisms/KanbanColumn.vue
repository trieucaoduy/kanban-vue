<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue"
import KanbanCard from "@/components/molecules/KanbanCard.vue"
import { VueDraggableNext } from "vue-draggable-next"
import { ICard, IColumn } from "@/utils/types"
import { useCardHook } from "@/hooks/card"
import KanbanButton from "@/components/atoms/Button.vue"
import { useKanbanStore } from "@/stores/kanban"

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
    KanbanButton,
  },
  emits: ["handleDeleteCard", "hanldeEditCard"],
  setup: (props, { emit }) => {
    const { addCard } = useCardHook()
    const { editColumn } = useKanbanStore()

    const visibleDialog = ref(false)
    const currentCardId = ref("")
    const column = computed(() => props.column)
    const showChangeColumnName = ref(false)

    // TODO:
    const handleDeleteCard = (cardId: string) => emit("handleDeleteCard", cardId, column?.value.type)
    const hanldeEditCard = (cardId: string) => emit("hanldeEditCard", cardId)

    const formColumnName = computed({
      get: () => column.value.title,
      set: (value) => {
        handleEditColumn(value)
        return value
      },
    })

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

    const handleEditColumn = (columnName: string) => {
      const columnData = {
        ...column.value,
        ...{
          title: columnName,
        },
      }

      editColumn(columnData)
    }

    return {
      currentCardId,
      visibleDialog,
      showChangeColumnName,
      formColumnName,
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
    <div class="flex justify-between mt-3 handle cursor-grab gap-5">
      <div class="w-full">
        <h2
          v-if="!showChangeColumnName"
          class="font-bold text-ellipsis overflow-hidden cursor-pointer capitalize"
          :style="{ color: column.color }"
          @click="showChangeColumnName = !showChangeColumnName"
        >
          {{ formColumnName }}
        </h2>
        <label for="column-name">
          <input
            v-if="showChangeColumnName"
            id="column-name"
            class="text-grass11 shadow-green7 focus:shadow-green8 inline-flex p-2 w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            placeholder="Add title card"
            v-model="formColumnName"
            style="resize: none"
            @blur="showChangeColumnName = !showChangeColumnName"
            autofocus
          />
        </label>
      </div>
      <KanbanButton
        :is-only-icon="true"
        :is-only-text="true"
        :text-button="'Add Card'"
        :icon-button="`<i class='fa-solid fa-plus'></i>`"
        :style-class="`rounded-lg transition-all min-w-[30px] w-[30px] h-[30px] flex items-center justify-center`"
        @click="onAddCard(column.type)"
      />
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
