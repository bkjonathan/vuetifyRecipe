<template>
  <v-card shaped>
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="@/assets/avatar.png" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
						<v-icon>mdi-account</v-icon>
						{{review.user.name}}
					</v-list-item-title>
          <v-rating dense :value="review.rating" size="15" />
          <v-list-item-subtitle>{{review.comment}}</v-list-item-subtitle>
        </v-list-item-content>
				<v-list-item-action>
					<timeago :datetime="review.createdAt" :auto-update="60"/>
				</v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "UserReview",
		props:['review']
};
</script>

<style scoped></style>
