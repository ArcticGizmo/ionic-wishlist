<template>
  <BasePage hide-header>
    <SelectField v-model="config.sortBy" :options="options" name="Filter By" />
    <SegmentField v-model="order" :options="['asc', 'desc']" name="Order" />
    <div class="actions">
      <ion-button @click="onClose()">Cancel</ion-button>
      <ion-button @click="onAccept()">Ok</ion-button>
    </div>
  </BasePage>
</template>

<script setup lang="ts">
import { PropType, ref, computed } from 'vue';
import BasePage from '@/views/BasePage.vue';
import { modalController, IonButton } from '@ionic/vue';
import { SortFilterConfig, SortFilterOption } from '@/types';
import SelectField from '@/components/SelectField.vue';
import SegmentField from '@/components/SegmentField.vue';

const props = defineProps({
  options: { type: Array as PropType<SortFilterOption[]>, default: () => [] },
  config: { type: Object as PropType<SortFilterConfig>, required: true }
});

const options = props.options.map(o => o.name);

const config = ref({ ...props.config });

const order = computed({
  get() {
    return config.value.sortAsc ? 'asc' : 'desc';
  },
  set(value: string) {
    config.value.sortAsc = value === 'asc';
  }
});

const onClose = () => modalController.dismiss();

const onAccept = () => {
  const option = props.options.find(o => o.name === config.value.sortBy) as SortFilterOption;

  const resp: SortFilterConfig = {
    sortBy: option.name,
    sortAsc: config.value.sortAsc,
    sortType: option.type
  };
  modalController.dismiss(resp);
};
</script>

<style scoped>
.actions {
  display: flex;
  padding-bottom: 5rem;
}

.actions > * {
  width: 100%;
  height: 3rem;
}
</style>
