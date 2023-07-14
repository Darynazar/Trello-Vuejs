<template>
  <div class="vue-tempalte">
    <form>
      <h3>Sign In</h3>

      <div class="form-group">
        <label>Email address</label>
        <input v-model="email" type="email" class="form-control form-control-lg" />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" class="form-control form-control-lg" />
      </div>

      <button @click="handleLogin" type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>

      <p class="forgot-password text-right mt-2 mb-4">
        <router-link to="/forgot-password">Forgot password ?</router-link>
      </p>

      <div class="social-icons">
        <ul>
          <li>
            <a href="#"><i class="fa fa-google"></i></a>
          </li>
          <li>
            <a href="#"><i class="fa fa-facebook"></i></a>
          </li>
          <li>
            <a href="#"><i class="fa fa-twitter"></i></a>
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios"
import router from "@/router";
export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      loading: false,
      token: localStorage.getItem('token'),
      User: JSON.parse(localStorage.getItem('User'))
    }
  },
  methods: {
    handleLogin(e) {
      this.loading = true
      e.preventDefault()
    //   axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
    //     'token'
    //   )}`
      axios
        .post('http://localhost:8000/api/auth/login', { email: this.email, password: this.password })
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            localStorage.setItem('token', res.data.access_token) //store them from response
            router.push('/')
            this.loading = false
          }
        })
        .catch(function (error) {
          console.error(error)
        })
    }
  }
}
</script>
