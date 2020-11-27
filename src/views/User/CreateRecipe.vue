<template>
  <UserDashboard>
    <v-row justify="center">
      <v-col cols="12" class="mt-6">
        <v-card class="pa-5">
          <v-form v-model="valid" @submit.prevent="addItem" ref="RecipeForm">
            <v-card-text>
              <div class="d-flex justify-end">
                <v-switch
                  v-model="item.status"
                  label="Share to public"
                  outlined
                  class="d-block"
                />
              </div>
              <v-text-field
                v-model="item.name"
                label="Recipe Name"
                outlined
                :rules="[v => !!v || 'Recipe Name Field is required']"
              />
              <h3 class="mb-3">Ingredients</h3>
              <v-row
                v-for="(ingredient, index) in item.ingredients"
                :key="index"
              >
                <v-text-field
                  label="Ingredient name"
                  v-model="ingredient.name"
                  outlined
                  class="px-3"
                  :rules="[v => !!v || 'Ingredient Name Field is required']"
                />
                <v-text-field
                  label="Quantity"
                  v-model="ingredient.quantity"
                  outlined
                  class="px-3"
                  @keyup.enter.prevent="addIngredient"
                  :rules="[
                    v => !!v || 'Ingredient Quantity Name Field is required'
                  ]"
                />
                <v-btn
                  @click="addIngredient"
                  color="primary"
                  class="fill-height"
                  fab
                  v-if="index === 0"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn
                  @click="item.ingredients.splice(index, 1)"
                  color="error"
                  class="fill-height"
                  fab
                  v-else
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-row>
              <v-progress-linear
                buffer-value="60"
                :value="uploadProcess"
                stream
                color="orange"
                v-if="uploadProcess > 0"
              ></v-progress-linear>
              <v-file-input
                accept="image/*"
                label="File input"
                v-model="photo"
                prepend-icon=""
                outlined
                prepend-inner-icon="mdi-camera"
              ></v-file-input>

              <v-textarea
                v-model="item.description"
                label="Cooking Description"
                :rules="[v => !!v || 'Cooking Description Field is required']"
                outlined
              ></v-textarea>
              <div class="text-center">
                <v-btn :to="{ name: 'recipe' }" color="error" class="mr-3" large
                  >Back</v-btn
                >
                <v-btn type="submit" color="primary" large>Add Recipe</v-btn>
              </div>
            </v-card-text>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </UserDashboard>
</template>

<script>
import UserDashboard from "../../components/Layout/UserDashboard";
import { storageRef, realTimeDb } from "../../db";
import firebase from "firebase/app";

export default {
  name: "CreateRecipe",
  props: ["user"],
  components: { UserDashboard },
  data: () => ({
    photo: [],
    valid: false,
    uploadProcess: 0,
    item: {
      name: "",
      ingredients: [
        {
          name: "",
          quantity: ""
        }
      ],
      photo: "",
      status: true,
      description: "",
    }
  }),
  mounted() {
    if (!this.user) {
      this.$router.push({name:'login'})
    }
  },
  methods: {
    addIngredient() {
      this.item.ingredients.push({
        name: "",
        quantity: ""
      });
    },
    addItem() {
      this.$refs.RecipeForm.validate();
      if (this.valid) {
        if (this.item.photo === "") {
          return alert("Please add Photo for recipe");
        }
        let db = realTimeDb.ref("recipes/" + this.user.uid);
        let data = {...this.item};
        data.user = {
          email:this.user.email,
          displayName:this.user.displayName
        };
        data.createdAt = Date.now();
        db.push(data);

        this.item = this.resetItem();
        this.photo = [];
          this.$refs.RecipeForm.resetValidation()
      }
    },
    resetItem() {
      return {
        name: "",
        ingredients: [
          {
            name: "",
            quantity: ""
          }
        ],
        photo: "",
        status: true,
        description: ""
      };
    }
  },
  watch: {
    photo(file) {
      if (file && file.name) {
        let ext = file.name.toString().split(".");
        ext = ext[ext.length - 1];
        let fullPath = "images/" + Date.now() + "." + ext;
        let uploadTask = storageRef.child(fullPath).put(file);
        let vm = this;
        uploadTask.on(
          "state_changed",
          function(snapshot) {
            let progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            vm.uploadProcess = progress;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log("Upload is paused");
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log("Upload is running");
                break;
            }
          },
          function(error) {
            console.log(error);
          },
          function() {
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function(downloadURL) {
                // console.log("File available at", downloadURL);
                vm.item.photo = downloadURL;
                vm.uploadProcess = 0;
              });
          }
        );
      }
    }
  }
};
</script>

<style scoped></style>
