<script lang="ts">
import { ICard } from "@/utils/types"
import { PropType, defineComponent, ref } from "vue"

export default defineComponent({
  name: "KanbanCard",
  props: {
    card: {
      type: Object as PropType<ICard>,
      required: true,
    },
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
    <div class="flex justify-between gap-1">
      <div class="kanban-card__title cursor-pointer w-full">
        <p class="whitespace-nowrap font-bold text-base text-ellipsis overflow-hidden">{{ card.cardName }}</p>
      </div>
      <div v-if="visibleMenuTask" class="cursor-default fixed inset-0 transition-opacity" @click="showMenuTask()"></div>
      <div class="relative inline-block text-left">
        <div
          class="cursor-pointer w-2 z-20"
          @click="showMenuTask()"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
        <div
          v-if="visibleMenuTask"
          class="absolute right-0 z-10 mt-2 w-35 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabindex="-1"
        >
          <div class="py-1" role="none">
            <a
              href="#"
              class="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabindex="-1"
              id="menu-item-0"
              @click="editCard(card.cardId)"
              >Edit</a
            >
            <a
              href="#"
              class="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabindex="-1"
              id="menu-item-1"
              @click="deleteCard(card.cardId)"
              >Delete</a
            >
          </div>
        </div>
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
      <div class="kanban-card__due-date text-gray-400 text-sm">Due 4 days</div>
    </div>
  </div>
</template>
