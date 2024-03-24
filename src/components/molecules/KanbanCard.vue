<script lang="ts">
import { ICard } from "@/utils/types"
import { PropType, defineComponent, ref } from "vue"
import KanbanButton from "@/components/atoms/Button.vue"

export default defineComponent({
  name: "KanbanCard",
  props: {
    card: {
      type: Object as PropType<ICard>,
      required: true,
    },
  },
  components: {
    KanbanButton,
  },
  emits: ["editCard", "deleteCard", "openCardDialog"],
  setup: (_, { emit }) => {
    const visibleMenuTask = ref(false)

    const showMenuTask = () => {
      visibleMenuTask.value = !visibleMenuTask.value
    }

    const editCard = (cardId: string) => {
      emit("editCard", cardId)
    }

    const deleteCard = (cardId: string) => {
      emit("deleteCard", cardId)
    }

    const openCardDialog = (cardId: string) => {
      emit("openCardDialog", cardId)
    }

    return {
      visibleMenuTask,
      showMenuTask,
      editCard,
      deleteCard,
      openCardDialog,
    }
  },
})
</script>

<template>
  <div
    class="rounded-md cursor-grab bg-white shadow px-3 py-4 my-4 z-10 max-w-72 w-full"
    @click="openCardDialog(card.cardId)"
  >
    <div class="flex justify-between gap-1 relative">
      <div class="kanban-card__title cursor-pointer w-full">
        <p class="whitespace-nowrap font-bold text-base text-ellipsis overflow-hidden">{{ card.cardName }}</p>
      </div>
      <div class="absolute top-0 right-0">
        <KanbanButton
          :is-only-icon="true"
          :style-class="'rounded-full transition-all hover:bg-gray-200 flex items-center justify-center w-[28px] h-[28px] p-2 cursor-pointer'"
          :icon-button="`<i class='fa-solid fa-pen w-[13px] h-[13px]'/>`"
        />
      </div>
    </div>
    <div class="kanban-card__body" v-if="card.cardDescription?.length">
      <p class="kanban-card__summary text-gray-400 text-sm py-2 text-ellipsis overflow-hidden whitespace-nowrap w-5/6">
        {{ card.cardDescription }}
      </p>
    </div>
    <div class="kanban-card__footer flex justify-between mt-2" v-if="card.cardChecklist && card.cardChecklist?.length">
      <div
        class="kanban-card__checklist text-sm text-gray-400"
        :class="{ 'text-lime-600': card.checklistDone == card.checklistTotal }"
      >
        <i class="fas fa-tasks"></i> {{ `${card.checklistDone}/${card.checklistTotal}` }}
      </div>
      <!-- <div class="kanban-card__due-date text-gray-400 text-sm">Due 4 days</div> -->
    </div>
  </div>
</template>
