<template>
  <div></div>
</template>
<script lang="ts">
import DBResponse from "@/interfaces/DBResponse";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "Product",
  props: {
    products: {
      type: Object as PropType<DBResponse[]>,
      required: true,
    },
  },
});
</script>
