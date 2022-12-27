<template>
  <ion-page>
    <ion-header v-if="!hideHeader">
      <ion-toolbar>
        <slot name="header">
          <ion-title>{{ title }}</ion-title>
        </slot>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="page-content">
        <slot></slot>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonTitle, IonToolbar, IonContent } from '@ionic/vue';

defineProps({
  title: String,
  hideHeader: { type: Boolean, default: false }
});
</script>

<style scoped>
ion-title {
  text-align: center;
}

.page-content {
  height: 100%;
  width: 100%;
  padding: 2rem;
}
</style>
