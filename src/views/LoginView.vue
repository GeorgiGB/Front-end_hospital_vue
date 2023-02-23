<template>
  <div>
    <BarraSuperior titulo="Iniciar Sesion"/>
    <h1>¡Bienvenido!</h1>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "../components/LoginPage.vue";
import BarraSuperior from '@/components/BarraSuperior.vue';
export default {
  components: {
    LoginForm,
    BarraSuperior
  },
};
</script>
