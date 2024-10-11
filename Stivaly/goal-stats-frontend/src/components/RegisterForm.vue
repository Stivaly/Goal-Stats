<template>
    <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6 px-0 d-none d-sm-block">
          <img :src="registerImage" alt="login image" class="login-img">
        </div>
        <div class="col-sm-6 login-section-wrapper">
          <div class="login-wrapper my-auto">
            <div class="brand-wrapper">
              <img :src="logo" alt="logo" class="logo">
            </div>
            <h1 class="login-title">Inicia Sesión</h1>
            <form action="#!">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" class="form-control" placeholder="email@example.com">
              </div>
              <div class="form-group mb-4">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" class="form-control" placeholder="enter your passsword">
              </div>
              <input name="login" id="login" class="btn btn-block login-btn" type="button" value="Login">
            </form>
            <a href="#!" class="forgot-password-link">Forgot password?</a>
            <p class="login-wrapper-footer-text">Don't have an account? <a href="#!" class="text-reset">Register here</a></p>
          </div>
        </div>
      </div>
    </div>
  </main>
  </template>
  
  <script>
  import logo from '@/assets/images/logo_goal.svg'
  import registerImage from '@/assets/images/login.jpg'

  export default {
    name: 'RegisterForm',
    data() {
      return {
          logo,
          registerImage
        }
      }
    }
  </script>