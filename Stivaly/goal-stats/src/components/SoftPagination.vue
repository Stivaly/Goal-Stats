<template>
  <ul class="pagination" :class="getClasses(color, size)">
    <slot>
      <!-- Botón de anterior -->
      <SoftPaginationItem
        :prev="true"
        :disabled="currentPage === 1"
        @page-changed="goToPage(currentPage - 1)"
      />
      <!-- Botones de números de página -->
      <SoftPaginationItem
        v-for="page in totalPages"
        :key="page"
        :label="page"
        :active="page === currentPage"
        @page-changed="goToPage(page)"
      />
      <!-- Botón de siguiente -->
      <SoftPaginationItem
        :next="true"
        :disabled="currentPage === totalPages"
        @page-changed="goToPage(currentPage + 1)"
      />
    </slot>
  </ul>
</template>

<script>
import SoftPaginationItem from './SoftPaginationItem.vue';

export default {
  name: "SoftPagination",
  components: { SoftPaginationItem },
  props: {
    color: { type: String, default: "success",},
    size: { type: String, default: "md", },
    totalItems: { type: Number, required: true },
    itemsPerPage: { type: Number, default: 10 },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
  },
  methods: {
    goToPage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
      this.$emit("page-changed", page);
    },
    getClasses: (color, size) => {
      let colorValue, sizeValue;

      colorValue = color ? `pagination-${color}` : null;
      sizeValue = size ? `pagination-${size}` : null;

      return `${colorValue} ${sizeValue}`;
    },
  },
};
</script>
