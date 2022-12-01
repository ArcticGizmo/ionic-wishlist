<template>
  <div class="segment-field">
    <ion-label>{{ name }}</ion-label>
    <ion-segment :value="modelValue" @ion-change="onChange">
      <ion-segment-button v-for="option in options" :key="option" :value="option">
        <ion-label>{{ option }}</ion-label>
      </ion-segment-button>
    </ion-segment>
  </div>
</template>

<script setup lang="ts">
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/vue';
import { PropType } from 'vue';

defineProps({
  name: { type: String, required: true },
  modelValue: { type: String },
  options: { type: Array as PropType<string[]>, default: () => [] }
});

const emits = defineEmits<{
  (e: 'update:modelValue', event: string): void;
}>();

const onChange = (e: any) => {
  emits('update:modelValue', e.target.value as string);
};
</script>

<style scoped>
.segment-field ion-label {
  font-size: 2rem;
}

.segment-field ion-segment {
  height: 3rem;
}
</style>
