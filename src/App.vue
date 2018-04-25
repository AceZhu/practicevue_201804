<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
.nomargin{
  margin: 0 0;
}
.nopad{
  padding: 0 0;
}
.textBaseColor{
  color: #333;
}
html,body{
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
body{
  .nomargin;
}
ul,ol,div,h1,h2,h3,input{
  .nopad;
  .nomargin;
}
ul{
  list-style: none;
}
h1,h2,h3,em,strong{
  font-weight: normal;
  font-style: normal;
  font-size: 1em;
}
input,button,textarea{
  .nopad;
  .nomargin;
  outline: none;
  border: none;
  vertical-align: top;
}
a:link,a:visited,a:hover,a:active{
  text-decoration: none;
  .textBaseColor
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
