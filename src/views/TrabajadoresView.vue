<template>
  <div>
    <BarraSuperior titulo="Vista Trabajadores"/>
    <h1>Tabla Trabajadores</h1>
    <Trabajadores />
    <Barralateral />
  </div>
</template>

<script>
import Trabajadores from "@/components/Trabajadores.vue";
import Barralateral from '@/components/BarraLateral.vue';
import BarraSuperior from '@/components/BarraSuperior.vue';

export default {
  components: {
    Trabajadores,
    Barralateral,
    BarraSuperior
  },
};
</script>
