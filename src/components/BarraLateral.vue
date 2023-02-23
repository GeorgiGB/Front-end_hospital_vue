<template>
  <div class="barralateral">
    <ul>
      <li><router-link to="/enfermedades-tabla">Enfermedades</router-link></li>
      <li><router-link to="/pacientes-tabla">Pacientes</router-link></li>
      <li><router-link to="/trabajadores-tabla">Trabajadores</router-link></li>
      <li><router-link to="/">Volver al inicio</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BarraLateral",
};
</script>

<style>
.barralateral {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  background-color: #1748AF;
}
.barralateral li::after {
  content: "";
  display: block;
  margin-top: 10px; 
  border-top: 1px solid #fff;
}
.barralateral ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.barralateral li {
  margin: 10px 0;
}
.barralateral a {
  display: block;
  padding: 10px;
  text-decoration: none;
  color: #FFFF;
}
.barralateral a:hover {
  background-color: #0e207c;
  
}
</style>
