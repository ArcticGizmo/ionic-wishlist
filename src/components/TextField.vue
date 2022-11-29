<template>
  <div class="text-field">
    <ion-label>{{ name }}</ion-label>
    <ion-input :value="modelValue" @input="onChange" />
  </div>
</template>

<script setup lang="ts">
import { IonInput, IonLabel } from '@ionic/vue';

defineProps({
  name: { type: String, required: true },
  modelValue: { type: String }
});

const emits = defineEmits<{
  (e: 'update:modelValue', event: string): void;
}>();

const onChange = (e: any) => {
  emits('update:modelValue', e.target.value as string);
};
</script>

<style scoped>
.text-field ion-label {
  font-size: 2rem;
}

.text-field ion-input {
  border: 1px solid gray;
  height: 3rem;
}
</style>
