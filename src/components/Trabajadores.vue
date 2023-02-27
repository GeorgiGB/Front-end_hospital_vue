<template>
  <div id="tabla-trabajadores">
    <div class="search-bar">
      <p>Buscar por el ID del personal</p>
      <input type="text" v-model="idBusqueda" />
      <button @click="buscarTrabajadorPorId">Buscar</button>
      <br /><br />
      <div v-if="trabajadorEncontrado" class="formClass">
        <h3>Trabajador encontrado:</h3>
        <p>Nombre: {{ trabajadorEncontrado.nombre }}</p>
        <p>Apellido: {{ trabajadorEncontrado.apellido }}</p>
        <p>Puesto de trabajo: {{ trabajadorEncontrado.puesto_trabajo }}</p>
        <p>Horario: {{ trabajadorEncontrado.horario }}</p>
        <p>Grupo: {{ trabajadorEncontrado.grupo }}</p>
      </div>
    </div>
    <button @click="mostrarFormulario">Añadir Trabajador</button>
    <br />
    <br />
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th>Puesto de trabajo</th>
          <th>Horario</th>
          <th>Grupo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="trabajador in trabajadores" :key="trabajador.id">
          <td>{{ trabajador.id }}</td>
          <td>{{ trabajador.nombre }}</td>
          <td>{{ trabajador.apellido }}</td>
          <td>{{ trabajador.puesto_trabajo }}</td>
          <td>{{ trabajador.horario }}</td>
          <td>{{ trabajador.grupo }}</td>
          <td>
            <button @click="editTrabajador(trabajador)">Editar</button>
            <button @click="eliminarTrabajador(trabajador.id)">Eliminar</button>
            <router-link :to="{name:'informacion-trabajador', params:{id:trabajador.id}}">
              <button>Ver información trabajador</button>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <br />
    <!--Formulario agregar-->
    <div v-if="formularioVisible" class="formClass">
      <form @submit.prevent = "agregarTrabajador">
        <h3>Añadir nuevo trabajador</h3>
        <label for="nombre">Nombre:</label>
        <input type="text" name="nombre" v-model="nuevoTrabajador.nombre" />

        <label for="apellido">Apellido:</label>
        <input type="text" name="apellido" v-model="nuevoTrabajador.apellido" />

        <label for="puesto_trabajo">Puesto de trabajo:</label>
        <input
          type="text"
          name="apellido"
          v-model="nuevoTrabajador.puesto_trabajo"
        />

        <label for="horario">Horario:</label>
        <input type="text" name="horario" v-model="nuevoTrabajador.horario" />

        <label for="grupo">Grupo:</label>
        <input type="text" name="grupo" v-model="nuevoTrabajador.grupo" />

        <button type="submit">Guardar</button>
        <button type="button" @click="cancelEdit">Cancelar</button>
      </form>
    </div>
    <!--FORMULARIO PARA EDITAR UN TRABAJADOR-->
    <div v-if="showForm" class="formClass">
      <h3>Formulario de edicion de usuario</h3>
      <form @submit.prevent = "actualizarTrabajador(this.trabajadorEditado.id)">
        <label for="nombre">Nombre:</label>
        <input type="text" name="nombre" v-model="trabajadorEditado.nombre" />

        <label for="apellido">Apellido:</label>
        <input
          type="text"
          name="apellido"
          v-model="trabajadorEditado.apellido"
        />

        <label for="horario">Puesto de trabajo:</label>
        <input
          type="text"
          name="puesto_trabajo"
          v-model="trabajadorEditado.puesto_trabajo"
        />

        <label for="horario">Horario:</label>
        <input type="text" name="horario" v-model="trabajadorEditado.horario" />
        <label for="horario">Grupo:</label>
        <input type="text" name="grupo" v-model="trabajadorEditado.grupo" />
        <button type="submit">Actualizar</button>
        <br><br>
        <button @click="cancelEdit">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "Trabajadores-tabla",
  data() {
    return {
      trabajadores: [],
      trabajadorEncontrado: null,
      idBusqueda: "",
      valorId: "",
      errorBusqueda: false,
      showForm: false,
      trabajadorEditado: {
        id: "",
        nombre: "",
        apellido: "",
        puesto_trabajo: "",
        horario: "",
        grupo: "",
      },
      nuevoTrabajador: {
        nombre: "",
        apellido: "",
        puesto_trabajo: "",
        horario: "",
        grupo: "",
      },
      formularioVisible: false,
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    this.token = token;
    if (!token) {
      this.$router.push("/");
    } else {
      this.mostrarTrabajadores(token);
    }
  },
  methods: {
    //Funcion de añadir un nuevo trabajador el cual mostrara el formulario
    mostrarFormulario() {
      this.formularioVisible = true;
      this.showForm = false;
    },
    // Función para activar el formulario de edición al pulsar el botón de editar
    editTrabajador(trabajador) {
      this.showForm = true;
      this.formularioVisible = false;
      this.trabajadorEditado = { ...trabajador };
    },
    // Función para cancelar la edición y ocultar el formulario
    cancelEdit() {
      this.showForm = false;
      this.formularioVisible = false;
      this.trabajadorEditado = {
        id: null,
        nombre: "",
        apellido: "",
        puesto_trabajo: "",
        horario: "",
        grupo: "",
      };
    },
    //Funcion asincrona para mostrar todos los trabajadores
    async mostrarTrabajadores() {
      const response = await fetch("https://127.0.0.1:8000/api/trabajadores", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      });
      const data = await response.json();
      if (!response) {
        throw new Error("No se pudo mostrar trabajadores");
      } else {
        this.trabajadores = data;
      }
    },
    async eliminarTrabajador(id) {
      await fetch(`https://127.0.0.1:8000/api/trabajadores/del/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((response) => {
          this.mostrarTrabajadores();
        })
        .catch((err) => console.log(err));
    },
    async actualizarTrabajador(id) {
      var res = JSON.stringify({
            "nombre": this.trabajadorEditado.nombre,
            "apellido": this.trabajadorEditado.apellido,
            "puesto_trabajo": this.trabajadorEditado.puesto_trabajo,
            "horario": this.trabajadorEditado.horario,
            "grupo": this.trabajadorEditado.grupo,
          });
      const response = await fetch(
        `https://127.0.0.1:8000/api/trabajadores/put/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
          body: res,
        }
      );

      if (!response.ok) {
        throw new Error("No se ha podido actualizar");
      }
      console.log("Actualizando trabajador");
      this.mostrarTrabajadores(this.token);
    },
    async agregarTrabajador() {
      const response = await fetch(
        `https://127.0.0.1:8000/api/trabajadores/add`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify(this.nuevoTrabajador),
        }
      ).then((response) => {
        if (!response.ok) {
          throw new Error("No se ha podido agregar a la tabla");
        } else {
          console.log("Agregando trabajador");
          this.formularioVisible = false;
          this.mostrarNuevoTrabajador = false;
          this.mostrarTrabajadores(this.token);
        }
      });
    },
    async buscarTrabajadorPorId() {
      const idBusqueda = parseInt(this.idBusqueda);
      const trabajadorEncontrado = this.trabajadores.find(
        (trabajador) => trabajador.id === idBusqueda
      );
      if (trabajadorEncontrado) {
        this.trabajadorEncontrado = trabajadorEncontrado;
      } else {
        alert("No se ha encontrado ID ");
        this.trabajadorEncontrado = null;
      }
    },
  },
};
</script>

<style scoped>
#tabla-trabajadores {
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

.search-bar {
  padding-bottom: 20px;
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
