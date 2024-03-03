<template>
  <div>
    <draggable
      class="dragArea list-group w-full"
      handle=".handle"
      ghost-class="ghost"
      :class="'flex'"
      :list="columnList"
    >
      <transition-group type="transition" name="flip-list">
        <KanbanColumn
          v-for="element in columnList"
          :key="element.type"
          :column="element"
          :card-list="element.items"
          @openAddTaskDialog="onOpenAddTaskDialog"
          @hanldeEditCard="onEditCard"
          @handleDeleteCard="onDeleteCard"
          @addTask="onAddTask"
        />
      </transition-group>
    </draggable>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue"
import { VueDraggableNext } from "vue-draggable-next"
import KanbanColumn from "@/components/organisms/KanbanColumn.vue"
import { COLUMN_LIST } from "@/utils/constants"

export default defineComponent({
  name: "KanbanPage",
  components: {
    draggable: VueDraggableNext,
    KanbanColumn,
  },
  setup: () => {
    const columnList = ref(COLUMN_LIST)
    const isVisableAddTask = ref(false)
    const currentTypeTask = ref("")

    const onAddTask = (taskName) => {
      isVisableAddTask.value = false
      columnList.value.map((column) => {
        if (column.type === currentTypeTask.value) {
          column.items.push({
            name: taskName,
            id: Date.now().toString(),
            status: currentTypeTask.value,
            desc: "Short description",
            checklist: [
              { id: `cl${Date.now().toString()}`, title: "Checklist 1", checked: false },
              { id: `cl${Date.now().toString()}`, title: "Checklist 2", checked: true },
            ],
          })
        }
      })
    }

    const onHideDialog = () => (isVisableAddTask.value = false)

    const onOpenAddTaskDialog = (column) => {
      isVisableAddTask.value = true
      currentTypeTask.value = column?.type
    }

    const onDeleteCard = (cardId, columnType) => {
      columnList.value.map((c) => {
        if (c.type === columnType) {
          const findCardIndex = c.items.findIndex((item) => item.id === cardId)

          if (findCardIndex != -1) c.items.splice(findCardIndex, 1)
        }
      })
    }

    const onEditCard = () => {}

    return {
      columnList,
      isVisableAddTask,
      onOpenAddTaskDialog,
      onAddTask,
      onDeleteCard,
      onEditCard,
      onHideDialog,
    }
  },
})
</script>
