<template>
  <Header></Header>
  <Separator class="h-[1px] bg-grass6 mb-2" />

  <router-view v-slot="{ Component }">
    <KeepAlive>
      <Component :is="Component" />
    </KeepAlive>
  </router-view>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import Header from '@/components/molecules/Header.vue'

export default defineComponent({
  name: "MainLayout",
  components: { Header },
  setup: () => {
    const router = useRouter();
    router.push("/");
  }
})

</script>