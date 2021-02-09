<template>
  <q-drawer
        side="right"
        v-model="drawerRight"
        show-if-above
        bordered
        :width="300"
        :breakpoint="500"
        content-class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <div class="q-pa-sm">
            <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
          </div>
        </q-scroll-area>
      </q-drawer>
</template>

<script>
export default {
    name: "Drawer",
    data() {
        return {
        }
    },
    mounted() {
        console.log(this.drawerRight)
    },
    props: ["drawerRight"]
}
</script>

<style>

</style>