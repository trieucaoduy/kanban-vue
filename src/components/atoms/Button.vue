<template>
  <button type="button" :class="styleClass">
    <div v-if="isOnlyShowIcon" v-html="iconButton"></div>
    <div v-else>
      <div v-if="isOnlyShowText">{{ textButton }}</div>
      <div v-else><span v-html="iconButton"></span> {{ textButton }}</div>
    </div>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue"

export default defineComponent({
  name: "KanbanButton",
  props: {
    isOnlyIcon: {
      type: Boolean,
      default: false,
    },
    isOnlyText: {
      type: Boolean,
      default: false,
    },
    iconButton: {
      type: String as PropType<unknown>,
      default: "",
      required: false,
    },
    textButton: {
      type: String,
      default: null,
      required: false,
    },
    styleClass: {
      type: String,
      default: "",
      required: false,
    },
  },
  setup: (props) => {
    const isOnlyShowIcon = computed(() => props.isOnlyIcon)
    const isOnlyShowText = computed(() => props.isOnlyText)

    return {
      isOnlyShowIcon,
      isOnlyShowText,
    }
  },
})
</script>

<style lang="scss" scoped>
.btn-primary {
  background: #4680f7;
  color: #fff;
  box-shadow:
    rgb(129 170 255 / 40%) 0px 5px 35px 0px,
    rgb(129 170 255 / 40%) 0px 9px 13px 0px;
  &:hover {
    box-shadow: none;
  }
}
</style>
