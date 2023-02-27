<template>
  <div id="tabla-enfermedades">
    <div class="search-bar">
      <p>Buscar por ID</p>
      <input type="text" v-model="idBusqueda" />
      <button @click="buscarEnfermedadPorId">Buscar</button>
      <br /><br />
      <div v-if="enfermedadEncontrada" class="formClass">
        <h3>Enfermedad:</h3>
        <p>ID: {{ enfermedadEncontrada.id }}</p>
        <p>Nombre: {{ enfermedadEncontrada.nombre }}</p>
        <p>Descripcion: {{ enfermedadEncontrada.descripcion }}</p>
      </div>
    </div>
    <button @click="mostrarFormulario">Añadir Enfermedad</button>
    <br />
    <br />
    <br>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripcion</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="enf in enfermedades" :key="enf.id">
          <td>{{ enf.id }}</td>
          <td>{{ enf.nombre }}</td>
          <td>{{ enf.descripcion }}</td>
          <td>
            <!-- Agregar botones de opciones -->
            <button @click="mostrarFormEditar(enf)">Editar</button>
            <button @click="eliminarEnfermedad(enf.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <br>
    <br>
    <!--FORMULARIO AGREGAR ENFERMEDAD-->
    <div v-if="formularioNuevaEnfermedad" class="formClass">
      <h3>Agregar Enfermedad</h3>
      <form>
        <label for="nombre">Nombre:</label>
        <input type="text" name="nombre" v-model="nuevaEnfermedad.nombre" />
        <label for="descripcion">Descripcion:</label>
        <input
          type="text"
          name="descripcion"
          v-model="nuevaEnfermedad.descripcion"
        />
        <button @click="agregarEnfermedad">Guardar</button>
        <button @click="cancelEdit">Cancelar</button>
      </form>
    </div>

    <!--FORMULARIO EDITAR ENFERMEDAD-->
    <div v-if="formularioEditarEnfermedad" class="formClass">
      <h3>Editar Enfermedad</h3>
      <form @submit.prevent = "actualizarEnfermedad(editarEnfermedad)">
        <label for="nombre">Nombre:</label>
        <input type="text" name="nombre" v-model="editarEnfermedad.nombre" />
        <label for="descripcion">Descripcion:</label>
        <input
          type="text"
          name="descripcion"
          v-model="editarEnfermedad.descripcion"
        />
        <button  type="submit">Guardar</button>
        <button @click="cancelEdit">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "Enfermedades-tabla",
  data() {
    return {
      enfermedades: [],
      editarEnfermedad: {
        id: "",
        nombre: "",
        descripcion: "",
      },
      nuevaEnfermedad: {
        nombre: "",
        descripcion: "",
      },
      formularioEditarEnfermedad: false,
      formularioNuevaEnfermedad: false,
      valorId: "",
      enfermedadEncontrada: null,
      idBusqueda: ""
    };
  },
  created() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/");
    } else {
      this.mostrarEnfermedades(token);
    }
  },
  methods: {
    mostrarFormulario() {
      this.formularioEditarEnfermedad = false;
      this.formularioNuevaEnfermedad = true;
    },
    mostrarFormEditar(enfermedad) {
      this.formularioEditarEnfermedad = true;
      this.formularioNuevaEnfermedad = false;
      this.enfermedadEditada = {...enfermedad}
    },
    cancelEdit() {
      this.formularioEditarEnfermedad = false;
      this.formularioNuevaEnfermedad = false;
      this.enfermedadEdit = {
        nombre: "",
        descripcion: "",
      };
    },
    async mostrarEnfermedades(token) {
      const response = await fetch("https://127.0.0.1:8000/api/enfermedades", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("No se pudo mostrar trabajadores");
      } else {
        this.enfermedades = data;
      }
    },
    async actualizarEnfermedad(id) {
      var res = JSON.stringify({
      "nombre": this.editarEnfermedad.nombre,
      "descripcion": this.editarEnfermedad.descripcion
})
      await fetch(`https://127.0.0.1:8000/api/enfermedades/put/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        body: res,
      })
        .then((response) => {
          this.mostrarEnfermedades();
        })
        .catch((err) => console.log(err));
    },
    async agregarEnfermedad() {
      const response = await fetch("https://127.0.0.1:8000/api/enfermedades/add", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.token}`,
        },
        body: JSON.stringify(this.nuevaEnfermedad),
      })
        .then((response) => {
          if (!response.ok) {
          throw new Error("No se ha podido agregar a la tabla");
        } else {
          this.formularioNuevaEnfermedad = false;
          this.mostrarEnfermedades(this.token);
        }
        })
        .catch((err) => console.log(err));
    },
    async editarEnfermedad() {
      await fetch(`https://127.0.0.1:8000/api/enfermedades/put/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(this.editarEnfermedad),
      })
        .then((response) => {
          this.mostrarEnfermedades();
        })
        .catch((err) => console.log(err));
    },
    async eliminarEnfermedad(id) {
      await fetch(`https://127.0.0.1:8000/api/enfermedades/del/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((response) => {
          this.mostrarEnfermedades();
        })
        .catch((err) => console.log(err));
    },
    async buscarEnfermedadPorId() {
      const idBusqueda = parseInt(this.idBusqueda);
      const enfermedadEncontrada = this.enfermedades.find(
        (enfermedad) => enfermedad.id === idBusqueda
      );
      if (enfermedadEncontrada) {
        this.enfermedadEncontrada = enfermedadEncontrada;
      } else {
        alert('No se ha encontrado ID ')
        this.enfermedadEncontrada = null;
      }
    },
  },
};
</script>

<style scoped>
#tabla-enfermedades {
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
