<script lang="ts">
import { useCardHook } from "@/hooks/card"
import { useCommonHook } from "@/hooks/common"
import { computed, defineComponent, nextTick, ref, watch } from "vue"

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    cardId: {
      type: String,
      required: true,
    },
  },
  emits: ["hideCardDialog", "addChecklistItem"],
  setup: (props, { emit }) => {
    const { getCard, editCard } = useCardHook()
    const { useId } = useCommonHook()

    const checklistRef = ref(null)
    const open = computed(() => props.visible ?? false)
    const cardId = computed(() => props.cardId)
    const cardInfo = computed(() => getCard(cardId.value))
    const originalCardInfo = { ...getCard(cardId.value) }
    const showChangeTitle = ref(false)
    const isEditChecklistTitle = ref(false)
    const checkList = computed({
      get: () => cardInfo.value.cardChecklist ?? [],
      set: (newChecklist) => {
        cardInfo.value.cardChecklist = newChecklist
        return newChecklist
      },
    })
    const numCheckListTotal = computed(() => checkList.value.length ?? 0)
    const numCheckListDone = computed(() => checkList.value.filter((c) => c?.checked)?.length ?? 0)
    const checkListPercent = computed(() => {
      return Math.round((numCheckListDone.value / numCheckListTotal.value) * 100) || 0
    })

    const formCardDesc = ref(cardInfo.value.cardDescription ?? "")
    const formCardName = computed({
      get: () => cardInfo.value.cardName,
      set: (newVal) => {
        cardInfo.value.cardName = newVal
        return newVal
      },
    })

    watch(
      () => open.value,
      () => {
        checkList.value.map((cl) => (cl.isEdit = false))
      },
      { immediate: true }
    )

    watch(
      () => numCheckListTotal.value,
      (newVal) => {
        cardInfo.value.checklistTotal = newVal ?? 0
      }
    )

    watch(
      () => numCheckListDone.value,
      (newVal) => {
        cardInfo.value.checklistDone = newVal ?? 0
      }
    )

    watch(
      () => showChangeTitle.value,
      () => {
        if (!formCardName.value && showChangeTitle.value === false) {
          formCardName.value = originalCardInfo.cardName
        } else {
          originalCardInfo.cardName = formCardName.value
        }
      }
    )

    watch(
      () => checkList.value,
      () => {
        const findIndex = checkList.value.findIndex((cl) => !cl.title && cl.isEdit === false)
        if (findIndex !== -1) checkList.value.splice(findIndex, 1)

        nextTick(() => {
          if (checklistRef.value?.[0]) {
            ;(checklistRef.value?.[0] as unknown as HTMLElement)?.focus()
          }
        })
      },
      { deep: true }
    )

    const addChecklistItem = () => {
      emit("addChecklistItem")
    }

    const hideCardDialog = () => {
      editCard(cardInfo.value)
      emit("hideCardDialog")
    }

    const addChecklist = () => {
      if (checkList.value.length) {
        const lastItemIndex = checkList.value.length - 1
        if (checkList.value[lastItemIndex].isEdit === true && !checkList.value[lastItemIndex].title) return
      }

      const newChecklistItem = {
        id: useId(),
        title: "",
        checked: false,
        isEdit: true,
      }

      checkList.value = [...checkList.value, ...[newChecklistItem]]

      nextTick(() => {
        ;(checklistRef.value?.[0] as unknown as HTMLElement)?.focus()
      })
    }

    const deleteCheckListItem = (id: string) => {
      const findIndex = checkList.value.map((item) => item.id).indexOf(id)
      if (findIndex !== -1) checkList.value.splice(findIndex, 1)
    }

    return {
      cardInfo,
      formCardDesc,
      formCardName,
      isEditChecklistTitle,
      numCheckListDone,
      numCheckListTotal,
      checkListPercent,
      showChangeTitle,
      open,
      checkList,
      checklistRef,
      addChecklist,
      hideCardDialog,
      addChecklistItem,
      deleteCheckListItem,
    }
  },
})
</script>
<template>
  <DialogRoot :open="open">
    <DialogPortal>
      <DialogOverlay
        class="DialogOverlay bg-blackA9 data-[state=open]:animate-overlayShow inset-0 z-30"
        @click="hideCardDialog"
      />
      <DialogContent
        class="DialogContent data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[768px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
      >
        <div class="task-dialog__header flex justify-between items-center gap-2">
          <label class="task-dialog__title flex items-center text-left gap-2 flex-grow-[9] w-full">
            <i class="fa-solid fa-bars-progress w-[31px]"></i>
            <DialogTitle
              v-if="!showChangeTitle"
              class="text-mauve12 m-0 text-[24px] font-bold text-ellipsis overflow-hidden whitespace-nowrap min-h-5 min-w-70 w-full"
              @click="showChangeTitle = !showChangeTitle"
            >
              {{ formCardName }}
            </DialogTitle>
            <input
              v-if="showChangeTitle"
              id="task-name"
              class="text-grass11 shadow-green7 focus:shadow-green8 inline-flex p-2 w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              placeholder="Add title card"
              v-model="formCardName"
              style="resize: none"
              @blur="showChangeTitle = !showChangeTitle"
            />
          </label>
          <div class="task-dialog__close flex-grow-[1] text-right w-[30px] h-[30px] flex items-center justify-center">
            <DialogClose aria-label="Close" @click="hideCardDialog()">
              <i class="fa-solid fa-xmark"></i>
            </DialogClose>
          </div>
        </div>
        <div class="task-dialog__body overflow-auto h-[500px] p-4">
          <div class="task-dialog__des mb-2">
            <div class="task-dialog__desc--title flex items-center gap-2 mb-4">
              <i class="fa-solid fa-align-left w-[31px]"></i>
              <p class="font-bold">Description</p>
            </div>
            <fieldset class="mb-[15px] flex items-center gap-5 ml-[39px] mr-4">
              <textarea
                id="name"
                class="text-grass11 shadow-green7 focus:shadow-green8 inline-flex h-[65px] p-2 w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                placeholder="Add more detail description..."
                v-model="cardInfo.cardDescription"
                style="resize: none"
              ></textarea>
            </fieldset>
          </div>
          <div class="task-dialog__checklist mb-2">
            <div class="task-dialog__checklist--title flex items-center gap-2 mb-4">
              <i class="fa-solid fa-list-check w-[31px]"></i>
              <p class="font-bold">Checklist</p>
            </div>
            <div class="task-dialog__checklist--body">
              <div class="task-dialog__checklist--process flex items-center gap-2 mb-4">
                <p class="text-sm">{{ checkListPercent }}%</p>
                <ProgressRoot
                  v-model="numCheckListDone"
                  class="relative overflow-hidden bg-gray-200 rounded-full w-full h-2 sm:h-2"
                  style="transform: translateZ(0)"
                >
                  <ProgressIndicator
                    class="bg-grass11 rounded-full w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
                    :style="`transform: translateX(-${100 - checkListPercent}%)`"
                  />
                </ProgressRoot>
              </div>
              <div class="task-dialog__checklist--list">
                <div
                  class="flex flex-row gap-2 items-center p-1 mb-2 transition-all"
                  v-for="cl in checkList"
                  :key="cl.id"
                >
                  <div class="flex justify-center w-[31px]">
                    <CheckboxRoot
                      v-model:checked="cl.checked"
                      :disabled="!cl.title"
                      class="flex min-w-[18px] min-h-[18px] h-[18px] w-[18px] border-solid border-grass11 border appearance-none items-center justify-center rounded-[4px] bg-white"
                      :class="{ 'border-gray-400': !cl.title || cl.checked }"
                    >
                      <CheckboxIndicator class="bg-white h-full rounded flex items-center justify-center">
                        <i
                          class="fa-solid fa-check h-3.5 w-3.5 text-grass11"
                          :class="{ 'text-gray-400': cl.checked }"
                        ></i>
                      </CheckboxIndicator>
                    </CheckboxRoot>
                  </div>
                  <label :for="`checklist-${cl.id}`" class="w-full" v-if="cl.isEdit">
                    <input
                      :id="`checklist-${cl.id}`"
                      ref="checklistRef"
                      class="text-grass11 shadow-green7 focus:shadow-green8 items-center inline-flex p-2 w-full flex-1 justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                      v-model="cl.title"
                      @blur="cl.isEdit = !cl.isEdit"
                    />
                  </label>
                  <p
                    class="truncate select-none w-full min-h-5 min-w-70 text-sm cursor-pointer"
                    :class="{ 'line-through text-gray-400': cl.checked }"
                    @click="cl.isEdit = !cl.isEdit"
                    v-if="!cl.isEdit"
                  >
                    {{ cl.title }}
                  </p>
                  <div
                    class="w-[37px] h-[35px] flex items-center justify-center rounded-full hover:shadow-lg transition-all hover:shadow-gray-500 cursor-pointer"
                    @click="deleteCheckListItem(cl.id)"
                  >
                    <i class="max-w-[13px] max-h-[13px] fa-solid fa-trash-can"></i>
                  </div>
                </div>
                <button
                  class="btn bt-primary h-[32px] px-[15px] ml-[39px] rounded bg-mauve3 mt-2 transition-all hover:shadow-xl hover:shadow-grey-500"
                  @click="addChecklist"
                >
                  Add an item
                </button>
              </div>
            </div>
          </div>
          <!-- <div class="task-dialog__comment">
            <div class="task-dialog__comment--title flex items-center gap-2 mb-4">
              <i class="fa-solid fa-comments p-2"></i>
              <p class="font-bold">Comments</p>
            </div>
          </div> -->
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>
.DialogOverlay {
  background: rgba(0 0 0 / 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  overflow-y: auto;
}

.DialogContent {
  min-width: 300px;
  background: white;
  padding: 30px;
  border-radius: 4px;
}
</style>
