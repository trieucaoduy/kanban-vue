<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue"

export default defineComponent({
  props: {
    visible: Boolean,
  },
  emits: ["addTask", "hideDialog", "openAddTaskDialog"],
  setup: (_, { emit }) => {
    const taskName = ref("New task title")
    const open = ref(false)
    const checkedTask = ref(true)
    const showChangeTitle = ref(false)
    const checkList = ref([
      { id: `cl${Date.now().toString()}`, title: "Checklist 1", checked: false },
      { id: `cl${Date.now().toString()}`, title: "Checklist 2", checked: true },
      { id: `cl${Date.now().toString()}`, title: "Checklist 2", checked: true },
    ])
    const numCheckListTotal = computed(() => checkList.value.length)
    const numCheckListDone = computed(() => checkList.value.filter((c) => c.checked).length)
    const checkListPercent = computed(() => {
      return Math.round((numCheckListDone.value / numCheckListTotal.value) * 100)
    })
    const taskDescription = ref("")

    watch(
      () => open.value,
      () => {
        open.value ? emit("openAddTaskDialog") : addTask()
      }
    )

    const addTask = () => {
      if (!taskName.value) return
      emit("addTask", taskName.value)
      taskName.value = "New task title"
    }

    const hideDialog = () => {
      emit("hideDialog")
    }

    return {
      taskName,
      checkedTask,
      numCheckListDone,
      numCheckListTotal,
      checkListPercent,
      showChangeTitle,
      open,
      checkList,
      taskDescription,
      addTask,
      hideDialog,
    }
  },
})
</script>
<template>
  <DialogRoot v-model:open="open">
    <DialogTrigger class="btn border border-blue-500 rounded text-blue-500 w-full p-2 font-bold">
      Add task
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
      <DialogContent
        class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[768px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
      >
        <div class="task-dialog__header flex justify-between items-center">
          <div class="task-dialog__title flex items-center text-left gap-2 flex-grow-[9]">
            <i class="fa-solid fa-bars-progress w-[31px]"></i>
            <DialogTitle
              v-if="!showChangeTitle"
              class="text-mauve12 m-0 text-[24px] font-bold"
              @click="showChangeTitle = !showChangeTitle"
            >
              {{ taskName }}
            </DialogTitle>
            <DialogDescription />
            <input
              v-if="showChangeTitle"
              id="task-name"
              class="text-grass11 shadow-green7 focus:shadow-green8 inline-flex p-2 w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              placeholder="Add more detail description..."
              v-model="taskName"
              style="resize: none"
              @focusout="showChangeTitle = !showChangeTitle"
            />
          </div>
          <div class="task-dialog__close flex-grow-[1] text-right">
            <DialogClose aria-label="Close">
              <i class="fa-solid fa-xmark"></i>
            </DialogClose>
          </div>
        </div>
        <div class="task-dialog__body py-4">
          <div class="task-dialog__des mb-2">
            <div class="task-dialog__desc--title flex items-center gap-2 mb-4">
              <i class="fa-solid fa-align-left w-[31px]"></i>
              <p class="font-bold">Description</p>
            </div>
            <fieldset class="mb-[15px] flex items-center gap-5 ml-[39px]">
              <textarea
                id="name"
                class="text-grass11 shadow-green7 focus:shadow-green8 inline-flex h-[65px] p-2 w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                placeholder="Add more detail description..."
                :v-model="taskDescription"
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
                <label class="flex flex-row gap-2 items-center mb-2" v-for="cl in checkList" :key="cl.id">
                  <div class="flex justify-center w-[31px]">
                    <CheckboxRoot
                      v-model:checked="cl.checked"
                      class="flex min-w-[18px] min-h-[18px] h-[18px] w-[18px] border-solid border-grass11 border appearance-none items-center justify-center rounded-[4px] bg-white"
                    >
                      <CheckboxIndicator class="bg-white h-full rounded flex items-center justify-center">
                        <i class="fa-solid fa-check h-3.5 w-3.5 text-grass11"></i>
                      </CheckboxIndicator>
                    </CheckboxRoot>
                  </div>
                  <p class="truncate select-none">
                    {{ cl.title }}
                  </p>
                </label>
                <button class="btn bt-primary h-[32px] px-[15px] ml-[39px] rounded bg-mauve3 mt-2">Add an item</button>
              </div>
            </div>
          </div>
          <div class="task-dialog__comment">
            <div class="task-dialog__comment--title flex items-center gap-2 mb-4">
              <i class="fa-solid fa-comments p-2"></i>
              <p class="font-bold">Comments</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
