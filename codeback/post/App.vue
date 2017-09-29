<template>
  <div>



    <router-view ></router-view>
  </div>
</template>

<script>
  console.log( "app start" )
//  console.log( window.location )


</script>

<style lang="less">


  body {
    background-color: #fbf9fe;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
