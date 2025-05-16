<!-- ***AIRBAR - START -->
<script setup lang="ts">

import { onMounted, ref } from 'vue'
import typedIpcRenderer from '../../utils/typedIpcRenderer'
import Switch from '../../components/Switch.vue'
import { Settings } from '../../../electron/main/entities/Settings'

const isEnabled = ref(true)
const isEnabledTaskbar = ref(true)
const isEnabledAirbarTimeTracking = ref(true)

onMounted(async () => {
  try {
    const settings = await typedIpcRenderer.invoke('getSettings') as Settings
    isEnabled.value = settings.enabledAirbar
    isEnabledTaskbar.value = settings.enabledAirbarTaskbar
    isEnabledAirbarTimeTracking.value = settings.enableAirbarTimeTracking
  } catch (error) {
    console.error('Error getting settings:', error)
  }
})

const onChangeAirbarEnabled = async (e: Event) => {
  const isChecked = (e.target as HTMLInputElement).checked
  isEnabled.value = isChecked

  try {
    await typedIpcRenderer.invoke('setSettingsProp', 'enabledAirbar', isChecked)
  } catch (error) {
    console.error('Error setting AIRbar enabled:', error)
  }
}

const onChangeAirbarTaskbarEnabled = async (e: Event) => {
  const isChecked = (e.target as HTMLInputElement).checked
  isEnabledTaskbar.value = isChecked

  try {
    await typedIpcRenderer.invoke('setSettingsProp', 'enabledAirbarTaskbar', isChecked)
  } catch (error) {
    console.error('Error setting AIRbar taskbar enabled:', error)
  }
}

const onChangeAirbarTimeTrackingEnabled = async (e: Event) => {
  const isChecked = (e.target as HTMLInputElement).checked
  isEnabledAirbarTimeTracking.value = isChecked

  try {
    await typedIpcRenderer.invoke('setSettingsProp', 'enableAirbarTimeTracking', isChecked)
  } catch (error) {
    console.error('Error setting AIRbar time tracking enabled:', error)
  }
}

</script>

<template>
  <div>
    <article class="prose prose-lg mt-4 mb-5">
      <h1>
        <span class="primary-blue">AIRbar Settings</span>
      </h1>
      <span>
        Customize your AIRbar experience.
      </span>
    </article>

    <Switch :modelValue="isEnabled" :label="'Enable/disable AIRbar'" :on-change="onChangeAirbarEnabled" />

    <template v-if="isEnabled">
      <div class="container">
        <Switch :modelValue="isEnabledTaskbar" :label="'Enable/disable taskbar'"
          :on-change="onChangeAirbarTaskbarEnabled" />
        <span class="italic">Enable or disable the always-on-top taskbar window.</span>
        <Switch :modelValue="isEnabledAirbarTimeTracking" :label="'Enable/disable time tracking'"
          :on-change="onChangeAirbarTimeTrackingEnabled" />
        <span class="italic">Enable or disable time tracking for tasks.</span>
      </div>
    </template>

  </div>
</template>

<style lang="less">
@import '../../styles/index';

.primary-blue {
  color: @primary-color;
}

.container {
  width: 70%;
  border-top: 1px solid rgb(59 130 246 / 0.5);
  margin-top: 40px;
}

.switch-container {
  padding-top: 40px;
}

.italic {
  font-style: italic;
}
</style>
<!-- ***AIRBAR - END -->