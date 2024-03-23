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
          <input
            class="!bg-transparent outline-none text-grass11 h-full selection:bg-grass5 placeholder-mauve8"
            placeholder="Search..."
            v-model="searchInput"
          />
        </ComboboxAnchor>
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
    const searchInput = ref("")

    return {
      v,
      searchInput,
    }
  },
})
</script>
