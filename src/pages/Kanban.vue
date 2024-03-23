<template>
  <div class="kanban pt-2">
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
          @hanldeEditCard="onEditCard"
          @handleDeleteCard="onDeleteCard"
        />
      </transition-group>
    </draggable>
  </div>
</template>
<script>
import { computed, defineComponent } from "vue"
import { VueDraggableNext } from "vue-draggable-next"
import KanbanColumn from "@/components/organisms/KanbanColumn.vue"
import { useKanbanStore } from "@/stores/kanban"

export default defineComponent({
  name: "KanbanPage",
  components: {
    draggable: VueDraggableNext,
    KanbanColumn,
  },
  setup: () => {
    const { columns } = useKanbanStore()
    const columnList = computed(() => columns)

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
      onDeleteCard,
      onEditCard,
    }
  },
})
</script>

<style scoped>
.kanban {
  background: url("../../src/assets/bg.jpeg");
  min-height: calc(100vh - 51px);
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
</style>
