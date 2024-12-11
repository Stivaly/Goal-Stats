<template>
  <div class="card h-100">
    <div class="p-3 pb-0 card-header">
      <div class="row">
        <div class="col-md-8 d-flex align-items-center">
          <h6 class="mb-0">{{ title }}</h6>
        </div>
        <div class="col-md-4 text-end">
          <a href="javascript:;" @click="toggleEdit">
            <i
              class="text-sm fas fa-user-edit text-secondary"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              :title="action.tooltip"
            ></i>
          </a>
        </div>
      </div>
    </div>
    <div class="p-3 card-body">
      <p class="text-sm">{{ description }}</p>
      <hr class="my-4 horizontal gray-light" />
      <ul class="list-group">
        <!-- Nombre -->
        <li class="pt-0 text-sm border-0 list-group-item ps-0">
          <strong class="text-dark">Nombre:</strong> &nbsp;
          <span v-if="!isEditing">{{ editableInfo.nombre }}</span>
          <input
            v-else
            v-model="editableInfo.nombre"
            type="text"
            placeholder="Nombre"
          />
        </li>
        <!-- Apellido -->
        <li class="text-sm border-0 list-group-item ps-0">
          <strong class="text-dark">Apellido:</strong> &nbsp;
          <span v-if="!isEditing">{{ editableInfo.apellido }}</span>
          <input
            v-else
            v-model="editableInfo.apellido"
            type="text"
            placeholder="Apellido"
          />
        </li>
        <!-- Fecha de Nacimiento -->
        <li class="text-sm border-0 list-group-item ps-0">
          <strong class="text-dark">Fecha de Nacimiento:</strong> &nbsp;
          <span v-if="!isEditing">{{ editableInfo.fecha_nacimiento }}</span>
          <input
            v-else
            v-model="editableInfo.fecha_nacimiento"
            type="date"
          />
        </li>
        <!-- Peso -->
        <li class="text-sm border-0 list-group-item ps-0">
          <strong class="text-dark">Peso:</strong> &nbsp;
          <span v-if="!isEditing">{{ editableInfo.peso }}</span>
          <input
            v-else
            v-model="editableInfo.peso"
            type="text"
            placeholder="Peso (kg)"
          />
        </li>
        <!-- Estatura -->
        <li class="text-sm border-0 list-group-item ps-0">
          <strong class="text-dark">Estatura:</strong> &nbsp;
          <span v-if="!isEditing">{{ editableInfo.estatura }}</span>
          <input
            v-else
            v-model="editableInfo.estatura"
            type="text"
            placeholder="Estatura (cm)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileInfoCard",
  props: {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    info: { type: Object, required: true },
    social: { type: Array, default: () => [] },
    action: { type: Object, default: () => ({ route: "javascript:;", tooltip: "Editar Perfil" }) },
    user: {
        type: Object,
        required: true,
    },
  },
  watch: {
    user: {
        handler(newValue) {
            console.log('User prop updated:', newValue);
        },
        deep: true,
    },  
  },

  data() {
    return {
      isEditing: false,
      editableInfo: { ...this.info }, 
    };
  },
  methods: {
    toggleEdit() {
      if (this.isEditing) {
        this.$emit("update-info", this.editableInfo);
      }
      this.isEditing = !this.isEditing;
      if (!this.isEditing) {
        this.editableInfo = { ...this.info }; 
      }
    },
  },
  computed: {
    formattedBirthDate() {
      if (!this.editableInfo.birthDate) return "Sin fecha";
      const date = new Date(this.editableInfo.birthDate);
      if (isNaN(date.getTime())) return this.editableInfo.birthDate; 
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
</script>
