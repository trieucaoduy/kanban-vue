<template>
  <div class="flex justify-between gap-2 py-2 items-center">
    <div class="header-block__left p-2 ml-2">
      <div class="header-logo flex items-center gap-2">
        <i class="fa-solid fa-table-list"></i>
        <p>Kanban</p>
      </div>
    </div>
    <div class="header-block__right flex gap-2 p-2 mr-2 items-center">
      <KanbanButton
        :text-button="'Add Board'"
        :icon-button="`<i class='fa-solid fa-plus'></i>`"
        :style-class="`btn-primary rounded-lg transition-all px-4 py-2 text-sm flex items-center justify-center`"
        @click="addBoard"
      />
      <div class="flex gap-5">
        <AvatarRoot
          class="bg-blackA3 inline-flex h-[35px] w-[35px] select-none items-center justify-center overflow-hidden rounded-full align-middle"
        >
          <AvatarImage
            class="h-[35px] w-[35px] rounded-[inherit] object-cover"
            src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
            alt="Colm Tuite"
          />
          <AvatarFallback
            class="text-grass11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
            :delay-ms="600"
          >
            CT
          </AvatarFallback>
        </AvatarRoot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import KanbanButton from "../atoms/Button.vue"
import { useKanbanStore } from "@/stores/kanban"
import { useCommonHook } from "@/hooks/common"

export default defineComponent({
  name: "HeaderComponent",
  components: {
    KanbanButton,
  },
  setup: () => {
    const { addColumn } = useKanbanStore()
    const { getRandomColor, useId } = useCommonHook()

    const addBoard = () => {
      const board = {
        title: "New Board",
        color: getRandomColor(),
        type: useId(),
        items: [],
      }

      addColumn(board)
    }

    return {
      addBoard,
    }
  },
})
</script>
