<template>
  <div class="flex justify-between gap-2 items-center">
    <div class="header-block__left p-2 ml-2">
      <div class="header-logo flex items-center gap-2">
        <i class="fa-solid fa-table-list"></i>
        <p>Kanban</p>
      </div>
    </div>
    <div class="header-block__right flex gap-2 p-2 mr-2 items-center">
      <ComboboxRoot v-model="v" class="relative">
        <ComboboxAnchor
          :style="{ 'background-color': 'rgba(217, 217, 217, 0.2)' }"
          class="min-w-[160px] inline-flex items-center justify-between rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-grass11 hover:shadow-[0_2px_10px] hover:shadow-black/10 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-grass9 outline-none"
        >
          <i class="fa-solid fa-magnifying-glass"></i>
          <ComboboxInput
            class="!bg-transparent outline-none text-grass11 h-full selection:bg-grass5 placeholder-mauve8"
            placeholder="Search..."
          />
        </ComboboxAnchor>

        <ComboboxContent
          :style="{ width: '195px' }"
          class="absolute z-10 w-30 mt-2 min-w-[160px] bg-white overflow-hidden rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
        >
          <ComboboxViewport class="p-[5px]">
            <ComboboxEmpty class="text-mauve8 text-xs font-medium text-center py-2" />

            <ComboboxGroup>
              <ComboboxLabel class="px-[25px] text-xs leading-[25px] text-mauve11"> Fruits </ComboboxLabel>

              <ComboboxItem
                v-for="(option, index) in options"
                :key="index"
                class="text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-grass9 data-[highlighted]:text-grass1"
                :value="option"
              >
                <!-- <ComboboxItemIndicator
                  class="absolute left-0 w-[25px] inline-flex items-center justify-center"
                >
                  <Icon icon="radix-icons:check" />
                </ComboboxItemIndicator> -->
                <span>
                  {{ option }}
                </span>
              </ComboboxItem>
            </ComboboxGroup>
          </ComboboxViewport>
        </ComboboxContent>
      </ComboboxRoot>
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
import { defineComponent, ref } from "vue"

export default defineComponent({
  name: "HeaderComponent",
  setup: () => {
    const v = ref("")
    const options = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"]

    return {
      v,
      options,
    }
  },
})
</script>
