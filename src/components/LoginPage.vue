<template>
  <div>
    <form class="formLog">
      <div class="form-group">
        <label for="username">Usuario</label>
        <input
          type="text"
          id="username"
          name="username"
          v-model="username"
          :class="{ invalid: !isValid.username }"
          placeholder="rellene este campo"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="password"
          :class="{ invalid: !isValid.password }"
          placeholder="rellene este campo"
          required
        />
      </div>
      <button type="submit" @click.prevent="registerPage">Registrarse</button>
      <button type="submit" @click.prevent="login">Iniciar sesión</button>
    </form>
  </div>
  
</template>

<script>
/* eslint-disable */
export default {
  name: "login",
  data() {
    return {
      hora: null,
      username: "",
      password: "",
      isValid: {
        username: true,
        password: true,
      },  
    };
  },
  methods: {
    async login() {
      const response = await fetch("https://127.0.0.1:8000/api/login_check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
      const data = await response.json();
      if (!response.ok) {
          throw new Error('Las credenciales de inicio de sesión son incorrectas');
        }else{
          localStorage.setItem('token', data.token);//guardamos el token
        this.$router.push("/trabajadores-tabla");// lo digirimos a la siguiente web
        }
    },

    registerPage(){
      this.$router.push('/register')
    }
  },
};
</script>

<style>
.formLog {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #d7d7d7;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 2px 10px rgb(0, 0, 0);
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

button[type="submit"] {
  display: block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #1748af;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

button[type="submit"]:hover {
  background-color: #0c2b7f;
}
</style>
