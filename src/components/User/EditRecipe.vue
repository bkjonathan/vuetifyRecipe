<template>
  <v-dialog v-model="dialog" transition="dialog-bottom-transition" persistent>
    <v-card class="pa-5">
      <v-form v-model="valid" ref="EditRecipe" @submit.prevent="updateItem">
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
          <v-row v-for="(ingredient, index) in item.ingredients" :key="index">
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
          <v-row>
            <v-col cols="12">
              <div>Meal Type</div>
              <v-chip-group v-model="item.mealType" column multiple>
                <v-chip
                  filter
                  outlined
                  v-for="(meal, index) in mealType"
                  :key="index"
                  :value="meal.name"
                >
                  <div>
                    <div class="text-capitalize">{{ meal.name }}</div>
                  </div>
                </v-chip>
              </v-chip-group>
            </v-col>
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
            <v-btn @click="dialogClose" color="error" class="mr-3" large
              >Cancel</v-btn
            >
            <v-btn type="submit" color="primary" large>Edit Recipe</v-btn>
          </div>
        </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { realTimeDb, storageRef } from "../../db";
import firebase from "firebase/app";

export default {
  name: "EditRecipe",
  props: ["open", "itemEdit", "user"],
  data: () => ({
    dialog: false,
    photo: [],
    valid: false,

    uploadProcess: 0,
    mealType: [
      {
        name: "breakfast"
      },
      {
        name: "brunch"
      },
      {
        name: "elevenses"
      },
      {
        name: "lunch"
      },
      {
        name: "tea"
      },
      {
          name: "supper"
			},
      {
        name: "dinner"
      }
    ],
    item: {
      name: "",
      ingredients: [
        {
          name: "",
          quantity: ""
        }
      ],
      mealType: [],
      photo: "",
      status: true,
      description: ""
    }
  }),
  methods: {
    dialogClose() {
      this.dialog = false;
      this.$emit("close", false);
    },
    editItem() {
      this.dialogClose();
      this.$emit("edit", this.item);
    },
    addIngredient() {
      this.item.ingredients.push({
        name: "",
        quantity: ""
      });
    },
    async updateItem() {
      this.$refs.EditRecipe.validate();
      if (this.valid) {
        let path = "recipes/" + this.user.uid + "/" + this.item.id;
        let db = realTimeDb.ref(path);
        let data = JSON.parse(JSON.stringify(this.item));
        delete data.id;
        await db.update(data);
        this.$emit("editId", this.item.id);
        this.dialogClose();
      }
    }
  },
  watch: {
    open(val) {
      this.dialog = val;
      Object.assign(this.item, JSON.parse(JSON.stringify(this.itemEdit)));
      // this.item = JSON.parse(JSON.stringify(this.itemEdit));
    },
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
  },
  destroyed() {
    this.dialogClose();
  }
};
</script>

<style scoped></style>
