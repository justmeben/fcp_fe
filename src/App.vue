<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
html{
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
h1{
  font-weight: 400;
  font-size: 40px;
  margin-bottom: -30px;
  margin-top: 0;
}
h2{
  color: #e6edf3;
  font-weight: 200;
  margin-bottom: 0;
}

</style>
