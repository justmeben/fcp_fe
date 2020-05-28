<template>
  <div>
    <div class='titlediv'>
    <h1>Hi {{logged_user}} <img style='border-radius: 50%' :src=profile_url></h1>
     <h2>Fill time you can play</h2>
    </div>
     <table>
       <tr><th>Day</th><th>People</th><th>Action</th></tr>
      <tr v-for="item, day in days" v-bind:key=day>
        <td><vs-button flat color='#000' @click='selectDay(day)' :active="selected_day==day"> {{day}}</vs-button></td>
        <td>{{item.length}}</td>
        <td style='padding: 0;' class='verycenter'>
           <vs-button v-if="!isInDate(item)" :disabled='loading' @click="voteDay(day)" primary icon> <span class="material-icons">check_box</span></vs-button>
           <vs-button v-if="isInDate(item)" :disabled='loading' @click="removeDay(getId(item))" danger icon> <span class="material-icons">indeterminate_check_box</span></vs-button>
            </td>
      </tr>
     </table>

        <h3 style='background: rgb(25, 91, 255); color: white; padding: 5px; margin-top: 0'> 
         Player List <br> {{ selected_day }}</h3>
     <div class='verycenter'>
        <div v-for="item, key in days[selected_day]" v-bind:key=key
        style='color: rgba(25, 91, 255); background: white; padding: 5px 15px;
         border-radius: 5px; margin: 5px; font-weight: 500; border: 1px solid rgba(25, 91, 255)'>
          <img style='border-radius: 50%; 
          width: 30px; margin-left: -8px; margin-bottom: -4px' :src=fb_id_to_url(item.fb_id)>
          <span style='padding-left: 8px; position: relative; bottom: 5px'>{{ item.voter }}</span>
        </div>
     </div>
      
  </div>
</template>


<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import axios from "axios";


export default{
  name: 'Home',
  computed: {
    ...mapState(['msg', 'logged_user', 'fb_user_id']),
    ...mapGetters(['msgl']),
    profile_url: function() {
      return 'https://graph.facebook.com/' + this.fb_user_id + '/picture'
    }
  },
  data: () => ({
    value1: 'hi',
    week_days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    days: {},
    loading: false,
    saxloading: null,
    selected_day: '',
    api: 'https://lb2-c3a7569f3ecce3e1.elb.eu-west-1.amazonaws.com'
  }),
  mounted() {
    this.loadData()
    let type = 'circles'
    this.saxloading = this.$vs.loading({type})
  },
  methods: {
    ...mapMutations(['CHANGE_MSG']),
    fb_id_to_url(fb_id){
      return 'https://graph.facebook.com/' + fb_id + '/picture'
    },
    voteDay(day){
      let date = day.split(' - ')[1]
      this.loading = true
      axios.post(this.api + '/vote/' + this.logged_user + '/' + date + '/', {'fb_id': this.fb_user_id})
          .then(r => {this.loadData();})
      
    },
    loadData(){
      axios.get(this.api + '/vote/' + this.logged_user + '/')
          .then(r => {this.days=r.data; this.loading=false;
            if(this.saxloading){
              this.saxloading.close()
              this.saxloading = null
            }
            if(!this.selected_day){
              let max = 0
              Object.entries(this.days).forEach((x)=>{
                if(x[1].length > max){
                  max = x[1].length
                  this.selected_day = x[0]
                }
              })
            }
          })
    },
    removeDay(id){
      this.loading = true
      axios.delete(this.api + '/vote/delete/' + this.logged_user + '/' + id + '/')
          .then(r => {this.loadData();})
    },
    isInDate(item){
      let voter = this.logged_user
      let ro = false
      item.forEach((x)=>{
        if(x.voter == voter){ro = true}
      })
      return ro
    },
    getId(item){
      let voter = this.logged_user
      let item_id = -1
      item.forEach((x)=>{
        if(x.voter == voter){item_id = x.id}
      })
      return item_id
    },
    selectDay(day){
      this.selected_day = day
    }
  }
}
</script>

<style>
body{
  margin: 0;
}
table{
  width: 100% ;text-align: left; padding: 5px; font-weight: 300;
  background: white; padding: 50px 10px;
  box-shadow: 0 0 4px rgba(0,0,0,0.03), 0 0 4px rgba(0,0,0,0.08);
}
  th{
    padding-bottom: 20px;
  }
  td, th{
    padding: 5px;
    text-align: center;
    background: rgb(246, 246, 246);
    border-radius: 5px;
  }
  .titlediv{
    
    padding-bottom:  40px;
    background: #195bff;
    color: white;
    margin: 0;
    padding-bottom: 40px;
    /* padding: 20px; */
    padding-top: 20px;

  }
  .verycenter{
    display: flex; flex-direction: row; justify-content: center;
      align-items: center; text-align: center
  }
</style>