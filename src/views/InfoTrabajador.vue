<template>
    <h2>Informacion detallada del trabajador</h2>
    <div class="formClass">
      <h3>Trabajador encontrado</h3>
      <p>ID: {{ trabajadorEncontrado.id }}</p>
      <p>Nombre: {{ trabajadorEncontrado.nombre }}</p>
      <p>Apellido: {{ trabajadorEncontrado.apellido }}</p>
      <p>Puesto de trabajo: {{ trabajadorEncontrado.puesto_trabajo }}</p>
      <p>Horario: {{ trabajadorEncontrado.horario }}</p>
      <p>Grupo: {{ trabajadorEncontrado.grupo }}</p>
    <button
      class="btn btn-primary"
      @click="this.$router.back('/trabajadores-tabla')"
    >
      Volver
    </button>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      trabajadorEncontrado: {},
    };
  },
  created() {
    const token = localStorage.getItem('token');
    this.token = token;
    if (!token) {
      this.$router.push("/");
    } else {
      this.getDatosTrabajador();
    }
  },
  mounted() {
    this.trabajadorEncontrado = this.$route.params.id;
  },
  methods: {
    async getDatosTrabajador() {
      const response = await fetch(
        `https://127.0.0.1:8000/api/trabajadores/${this.$route.params.id}`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${this.token}`,
          },
        },
      );
      const data = await response.json();
      console.log(data);
      if (!response) {
        throw new Error("No se pudo mostrar trabajadores");
      } else {
        this.trabajadorEncontrado = data;
      }
    },
  },
};
</script>
<style>

.formClass {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #d7d7d7;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 2px 10px rgb(0, 0, 0);
}

</style>
