<template>
  <div class="select-field">
    <ion-label>{{ name }}</ion-label>
    <ion-select :value="modelValue" @ion-change="onChange">
      <ion-select-option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </ion-select-option>
    </ion-select>
  </div>
</template>

<script setup lang="ts">
import { IonSelect, IonSelectOption, IonLabel } from '@ionic/vue';
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
.select-field ion-label {
  font-size: 2rem;
}

.select-field ion-select {
  border: 1px solid gray;
  height: 3rem;
}
</style>
