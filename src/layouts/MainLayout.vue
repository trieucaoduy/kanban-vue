<template>
  <HeaderComponent></HeaderComponent>

  <router-view v-slot="{ Component }">
    <KeepAlive>
      <Component :is="Component" />
    </KeepAlive>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useRouter } from "vue-router"
import HeaderComponent from "@/components/molecules/HeaderComponent.vue"

export default defineComponent({
  name: "MainLayout",
  components: { HeaderComponent },
  setup: () => {
    const router = useRouter()
    router.push("/")
  },
})
</script>
