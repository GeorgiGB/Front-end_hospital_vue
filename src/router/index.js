import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import Trabajadores from "../views/TrabajadoresView.vue";
import Pacientes from "../views/PacientesView.vue";
import Enfermedades from "../views/EnfermedadesView.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/trabajadores-tabla",
    name: "trabajadores",
    component: Trabajadores,
  },
  {
    path: "/pacientes-tabla",
    name: "pacientes",
    component: Pacientes,
  },
  {
    path: "/enfermedades-tabla",
    name: "enfermedades",
    component: Enfermedades,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
