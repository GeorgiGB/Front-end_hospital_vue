<template>
  <div>
    <BarraSuperior titulo="Registrar usuario" />
    <h1>¡Bienvenido!</h1>
    <RegisterForm />
  </div>
</template>

<script>
import RegisterForm from "../components/RegisterPage.vue";
import BarraSuperior from "@/components/BarraSuperior.vue";
export default {
  components: {
    RegisterForm: RegisterForm,
    BarraSuperior,
  },
};
</script>
