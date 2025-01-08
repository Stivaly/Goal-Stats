<template>
  <li class="page-item" :class="getClasses(active, disabled)">
    <a class="page-link" href="javascript:;" @click="emitPageChange">
      {{ prev ? '' : next ? '' : label }}
      <i v-if="prev" class="fa fa-angle-left"></i>
      <i v-if="next" class="fa fa-angle-right"></i>
    </a>
  </li>
</template>

<script>
export default {
  name: "SoftPaginationItem",
  props: {
    label: { type: [String, Number], default: "", },
    active: { type: Boolean,default: false, },
    disabled: { type: Boolean, default: false, },
    prev: { type: Boolean, default: false, },
    next: { type: Boolean, default: false, },
  },
  methods: {
    emitPageChange() {
      if (!this.disabled) {
        this.$emit("page-changed", this.label);
      }
    },
    getClasses: (active, disabled) => {
      return {
        active,
        disabled,
      } ;
    },
  },
};
</script>
