<template>
  <div class="pb-10 flex flex-col items-center">
    <img
      class="shadow-[0_15px_35px_rgb(50_50_93/10)] rounded-full"
      src="/favicon.png"
      alt="avatar" />
    <div class="px-6 py-2 mt-4 text-xl bg-black/40 backdrop-blur-md rounded-lg">
      {{ username }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  username: String,
});
</script>
