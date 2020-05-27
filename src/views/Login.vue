<template>
  <div class="home">
    <h1 style='text-shadow: 0px 0px 8px #ccc;'>KFC</h1>
    <h2 style='color: #777; text-shadow: 0px 0px 8px #ccc;'>Kadima Football Club</h2><br><br>

    <div class='verycenter'>
    <vs-button flat>
    <facebook-login class="button"
      appId="555362832071492"
      @login="onLogin"
      @logout="onLogout"
      @sdk-loaded="sdkLoaded">
    </facebook-login>
    </vs-button>
    </div>
   
  </div>
</template>

<script>
// @ is an alias to /src

import { mapMutations } from 'vuex'
import router from '../router'
import facebookLogin from 'facebook-login-vuejs';

export default {
  name: 'Login',
  data: () => ({
      user_name: '',
      err_required: false,
      name: '',
      email: '',
      personalID: '',
      isConnected: ''
  }),
  components: { facebookLogin },
  methods: {
    ...mapMutations(['LOG_USER', 'LOG_FB']),
    login(){
      if (this.user_name)
      {
        this.LOG_USER(this.user_name) 
        this.LOG_FB(this.personalID)
        router.push('Home')
      }
      else
      {
        this.err_required = true
      }
      
    },
    getUserData() {
      this.FB.api('/me', 'GET', { fields: 'id,name,email' },
        userInformation => {
          this.personalID = userInformation.id;
          this.email = userInformation.email;
          this.user_name = userInformation.name;
          this.login()
        }
      )
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected
      this.FB = payload.FB
      if (this.isConnected) this.getUserData()
    },
    onLogin() {
      this.isConnected = true
      this.getUserData()
    },
    onLogout() {
      this.isConnected = false;
    }
  }
}
</script>

<style>
  .verycenter{
    display: flex; flex-direction: row; justify-content: center;
      align-items: center; text-align: center
  }
</style>

