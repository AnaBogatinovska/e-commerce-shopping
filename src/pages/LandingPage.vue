<template>
  <div>
    <div class="shadow full-width q-pt-xl"></div>
    <div class="banner">
      <div class="overlay">
        <div class="row q-mr-md  crash-border">
          <div class="col row justify-between items-center q-px-xl q-mx-xl q-mt-xl">
            <h1 class="col-12 text-primary">
              <span class="text-bold">Online Shopping Center</span> <br />
            </h1>
            <div class="text-dark q-my-xl size-md">
              <p class="col-12 q-ma-none">
                Life is hard enough already. Let us make it a little easier.
              </p>
              <p class="col-12 q-ma-none">Experience the difference.</p>
              <p class="col-12 q-ma-none">
                Log in and start shopping fast and easy.
              </p>
            </div>
            <div class="col-12 text-right">
              <q-btn
                :to="{ name: 'Register' }"
                color="primary"
                flat
                size="md"
                label="Sign up"
                class="q-mr-sm"
              />
              <q-btn
                :to="{ name: 'Login' }"
                color="primary"
                outline
                size="md"
                label="Login"
              />
            </div>
          </div>

       <div class="col row items-center">
            <img class="full-width" src="~/assets/logo.png" alt="" />
       </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
};
</script>

<style lang="scss">
// .banner {
//   position: relative;
//   min-height: 100vh;
//   margin-top: -99px;
//   height: 100vh;
//   width: 100%;
//   overflow: hidden;

//   @media (min-width: $breakpoint-sm-min) {
//     height: 100vh;
//   }
//   @media (min-width: $breakpoint-lg-min) {
//     height: 100vh;
//   }
// }
// .overlay {
//   position: absolute;
//   top: 0;
//   left: 0;
//   height: 100%;
//   width: 100%;
//   background-color: rgb(233 185 91 / 50%);
//   z-index: 1;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }

// .form-handlers {
//   position: relative;
//   padding: 131px;
// }
</style>