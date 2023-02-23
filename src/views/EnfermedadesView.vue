<template>
  <div>
    <BarraSuperior titulo="Vista Enfermedades"/>
    <h1>Tabla Enfermedades</h1>
    <Enfermedades />
    <Barralateral />
  </div>
</template>

<script>
import Enfermedades from "@/components/Enfermedades.vue";
import Barralateral from '@/components/BarraLateral.vue';
import BarraSuperior from '@/components/BarraSuperior.vue';

export default {
  components: {
    Enfermedades,
    Barralateral,
    BarraSuperior
  },
};
</script>
