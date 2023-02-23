<template>
  <div>
    <BarraSuperior titulo="Vista Pacientes"/>
    <h1>Tabla Pacientes</h1>
    <Pacientes />
    <Barralateral />
  </div>
</template>

<script>
import Pacientes from "@/components/Pacientes.vue";
import Barralateral from '@/components/BarraLateral.vue';
import BarraSuperior from '@/components/BarraSuperior.vue';

export default {
  components: {
    Pacientes,
    Barralateral,
    BarraSuperior
  },
};
</script>
