<template>
  <v-app>
    <v-main>
      <router-view :user="user" :rooms="rooms" @logout="logout" />
    </v-main>
  </v-app>
</template>

<script>
/* eslint-disable no-unused-vars */

import { db, firebaseAuth } from "./db";
export default {
  name: "App",

  components: {},

  data: () => ({
    user: null,
    rooms: []
  }),
  methods: {
    logout: function() {
      firebaseAuth.signOut().then(() => {
        this.user = null;
        this.$router.push("login");
      });
    }
    // addRoom: function(roomName) {
    //   db.collection("users")
    //     .doc(this.user.uid)
    //     .collection("rooms")
    //     .add({
    //       name: roomName,
    //       createdAt: Firebase.firestore.FieldValue.serverTimestamp()
    //     });
    // },
    // deleteRoom: function(roomID) {
    //   db.collection("users")
    //     .doc(this.user.uid)
    //     .collection("rooms")
    //     .doc(roomID)
    //     .delete();
    // }
  },
  mounted() {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        console.log(user.displayName);
        // db.collection("users")
        //   .doc(this.user.uid)
        //   .collection("rooms")
        //   .onSnapshot(snapShot => {
        //     const snapData = [];
        //     snapShot.forEach(doc => {
        //       snapData.push({
        //         id: doc.id,
        //         name: doc.data().name
        //       });
        //     });
        //     this.rooms = snapData.sort((a, b) => {
        //       if (a.name.toLowerCase() < b.name.toLowerCase()) {
        //         return -1;
        //       } else return 1;
        //     });
        //   });
      }
    });
  }
};
</script>
