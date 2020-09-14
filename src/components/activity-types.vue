<template>
  <div><center>
      <table border="1">
          <tr>
              <td colspan="2"><center>Lista de ActivityTypes</center></td>
          </tr>

      <tr
        v-for="item in listActivityTypes"
        :key="item.rowtableid"
      ><td>{{ item.activitytype}}</td><td> {{item.rowtableid}}</td></tr>
      </table>
  </center></div>
</template>

<script>
export default {
  name: "ActivityTypes",
  props: {
      listActivityTypes: {
          type: Array,
      },
  },
};
</script>

<style lang="scss" scoped>
</style>