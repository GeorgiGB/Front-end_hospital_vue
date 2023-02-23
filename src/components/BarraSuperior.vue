<template>
  <div class="barra-superior">
    <div class="titulo">{{ titulo }}</div>
    <br />
    <div class="version">Versión 0.1.0</div>
  </div>
  <br />
  <br />
</template>

<script>
export default {
  name: "BarraSuperior",
  props: {
    titulo: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.barra-superior {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #1748af;
  color: white;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 0;
}
.titulo {
  font-size: 25px;
  font-weight: bold;
}
.version{
    font-size: 10px;
    margin-top: 5px;
}
</style>
