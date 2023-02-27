<template>
  <div id="tabla-pacientes">
    <div class="search-bar">
      <p>Buscar por el ID del paciente</p>
      <input type="text" />
      <button @click="buscarPaciente(valorId)">Buscar</button>
    </div>
    <br>
    <button @click="formNuevoPaciente">Añadir Paciente</button>
    <br>
    <br>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th>Carnet</th>
          <th>atendido</th>
          <th>Enfermedad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="paciente in pacientes" :key="paciente.id">
          <td>{{ paciente.id }}</td>
          <td>{{ paciente.num_carnet }}</td>
          <td>{{ paciente.nombre }}</td>
          <td>{{ paciente.apellido }}</td>
          <td>{{ paciente.atendido_por }}</td>
          <td>{{ paciente.id_enfermedad }}</td>
          <td>
            <!-- Agregar botones de opciones -->
            <button @click="editPaciente(paciente)">Editar</button>
            <button @click="eliminarPaciente(paciente.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <br>
    <br>
    <!--FORMULARIO agregar-->
    <div v-if="formularioAgregar" class="formClass">
      <form>
        <h3>Añadir nuevo paciente</h3>
        <label for="nombre">Nombre:</label>
        <input type="text" name="nombre" v-model="pacientes.nombre" />

        <label for="apellido">Apellido:</label>
        <input type="text" name="apellido" v-model="pacientes.apellido" />
        <label for="apellido">Carnet:</label>
        <input type="text" name="numCarnet" v-model="pacientes.num_carnet" />
        <label for="atendido">Atendido</label>
        <select
          id="trabajador-seleccionado"
          v-model="trabajadorSeleccionado"
          class="form-control"
        >
        <option v-for="trabajador in trabajadores" :key="trabajador.id">{{ trabajador.nombre }}</option>
        </select>

        <button @click="agregarPaciente()">Guardar</button>
        <button @click="cancelEdit">Cancelar</button>
      </form>
    </div>
    <!--FORMULARIO EDITAR-->
    <div v-if="formularioEditar" class="formClass">
      <form>
        <h3>Añadir nuevo paciente</h3>
        <label for="nombre">Nombre:</label>
        <input type="text" name="nombre" v-model="pacientes.nombre" />

        <label for="apellido">Apellido:</label>
        <input type="text" name="apellido" v-model="pacientes.apellido" />
        <label for="apellido">Carnet:</label>
        <input type="text" name="numCarnet" v-model="pacientes.num_carnet" />
        <label for="atendido">Atendido</label>
        <select
          id="trabajador-seleccionado"
          v-model="trabajadorSeleccionado"
          class="form-control"
          required
        >
        <option v-for="trabajador in trabajadores" :key="trabajador.id">{{ trabajador.nombre }}</option>
        </select>

        <button @click="agregarPaciente()">Guardar</button>
        <button @click="cancelEdit">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "pacientes-tabla",
  data() {
    return {
      pacientes: [],
      formularioAgregar: false,
      formularioEditar: false,
      editarPaciente: {
        id: "",
        nombre: "",
        apellidos: "",
        numCarnet: "",
        atendido: "",
        idEnfermedad: ""
      },
      nuevoPaciente:{
        nombre: "",
        apellidos: "",
        numCarnet: "",
        atendido: "",
        idEnfermedad: ""
      }
    };
  },
  created() {
    const token = localStorage.getItem("token");
    this.token = token;
    if (!token) {
      this.$router.push("/");
    } else {
      this.mostrarPacientes();
    }
  },
  methods: {
    formNuevoPaciente(){
      this.formularioAgregar= true,
      this.formularioEditar= false
    },
    editPaciente(paciente){
      this.formularioAgregar= false,
      this.formularioEditar= true,
      this.pacienteEditado = {...paciente};
    },
    cancelEdit(){
      formularioAgregar= false,
      formularioEditar= false,
      this.editarPaciente = {
        id: "",
        nombre: "",
        apellidos: "",
        numCarnet: "",
        atendido: "",
        idEnfermedad: ""
      }
    },
    async mostrarPacientes() {
      const response = await fetch(`https://127.0.0.1:8000/api/pacientes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      });
      console.log(response);
      const data = await response.json();
      if (!response) {
        throw new Error("No se pudo mostrar pacientes");
      } else {
        this.pacientes = data;
      }
    },
    async agregarPaciente() {
      const response = await fetch(
        `https://127.0.0.1:8000/api/pacientes/add`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify(this.nuevoPaciente),
        }
      ).then((response) => {
        if (!response.ok) {
          throw new Error("No se ha podido agregar a la tabla");
        } else {
          console.log("Agregando paciente");

          this.mostrarPaciente = false;
          this.mostrarPacientes(this.token);
        }
      });
    },
    async putPaciente() {
      var res =  JSON.stringify(this.editarPaciente);
      const response = await fetch(
        `https://127.0.0.1:8000/api/pacientes/put/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
          body: res,
        }
      ).then((response) => {
        if (!response.ok) {
          throw new Error("No se ha podido agregar a la tabla");
        } else {
          console.log("Agregando paciente");

          this.mostrarPaciente = false;
          this.mostrarPacientes(this.token);
        }
      });
    },
    async eliminarPaciente() {
      const response = await fetch(
        `https://127.0.0.1:8000/api/pacientes/del/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      ).then((response) => {
        if (!response.ok) {
          throw new Error("No se ha podido agregar a la tabla");
        } else {
          console.log("Eliminando paciente");

          this.mostrarPaciente = false;
          this.mostrarPacientes(this.token);
        }
      });
    }
  },
};
</script>

<style scoped>
#tabla-pacientes {
  margin: 120px auto;
  max-width: 800px;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid #ddd;
  text-align: left;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  color: #444;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}
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
