<!-- ***AIRBAR - START -->
<script setup lang="ts">

import { onMounted, ref } from 'vue'
import typedIpcRenderer from '../../utils/typedIpcRenderer'
import Switch from '../../components/Switch.vue'
import StudyInfoDto from '../../../shared/dto/StudyInfoDto'
import studyConfig from '../../../shared/study.config'

const isEnabled = ref(true)
const isEnabledTaskbar = ref(true)
const isEnabledAirbarTimeTracking = ref(true)
const isEnabledAirbarTaskPlanning = ref(true)
const isEnabledAirbarRetrospection = ref(true)
const enabledTaskBarByResearcher = ref(studyConfig.trackers.taskTracker?.enabledTaskbar)
const enabledRetrospectionByResearcher = ref(studyConfig.trackers.taskTracker?.enabledRetrospection)

onMounted(async () => {
  try {
    const settings = await typedIpcRenderer.invoke('getSettings') as StudyInfoDto
    isEnabled.value = settings.enabledAirbar
    isEnabledTaskbar.value = settings.enabledAirbarTaskbar
    isEnabledAirbarTimeTracking.value = settings.enabledAirbarTimeTracking
    isEnabledAirbarTaskPlanning.value = settings.enabledAirbarTaskPlanning
    isEnabledAirbarRetrospection.value = settings.enabledAirbarRetrospection
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
    await typedIpcRenderer.invoke('setSettingsProp', 'enabledAirbarTimeTracking', isChecked)
  } catch (error) {
    console.error('Error setting AIRbar time tracking enabled:', error)
  }
}

const onChangeAirbarRetrospectionEnabled = async (e: Event) => {
  const isChecked = (e.target as HTMLInputElement).checked
  isEnabledAirbarRetrospection.value = isChecked

  try {
    await typedIpcRenderer.invoke('setSettingsProp', 'enabledAirbarRetrospection', isChecked)
  } catch (error) {
    console.error('Error setting AIRbar retrospection enabled:', error)
  }
}

const onChangeAirbarTaskPlanningEnabled = async (e: Event) => {
  const isChecked = (e.target as HTMLInputElement).checked
  isEnabledAirbarTaskPlanning.value = isChecked

  try {
    await typedIpcRenderer.invoke('setSettingsProp', 'enabledAirbarTaskPlanning', isChecked)
  } catch (error) {
    console.error('Error setting AIRbar task planning enabled:', error)
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
        AIRbar is a task management tool designed to enhance Awareness, Intention and Retrospection (AIR). It lets you
        define up to three key tasks or goals to commit to each workday. Using AIRbar was shown to boost task
        completion, sharpen focus and reduce multi-tasking. Learn more about the <a href="https://hasel.dev/airbar"
          target="_blank">tool and science</a> behind it.
      </span>
    </article>

    <Switch :modelValue="isEnabled" :label="'Enable/disable AIRbar'" :on-change="onChangeAirbarEnabled" />

    <template v-if="isEnabled && enabledTaskBarByResearcher">
      <div class="container">
        <div class="mt-8">
          <Switch :modelValue="isEnabledAirbarTaskPlanning" :label="'Enable/disable task planning'"
            :on-change="onChangeAirbarTaskPlanningEnabled" />
          <span class="italic">Enable or disable morning task planning popup for AIRbar.</span>
        </div>
        <div class="mt-8">
          <Switch :modelValue="isEnabledTaskbar" :label="'Enable/disable taskbar'"
            :on-change="onChangeAirbarTaskbarEnabled" />
          <span class="italic">Enable or disable the always-on-top taskbar window.</span>
        </div>
        <div class="mt-8">
          <Switch :modelValue="isEnabledAirbarTimeTracking" :label="'Enable/disable time tracking'"
            :on-change="onChangeAirbarTimeTrackingEnabled" />
          <span class="italic">Enable or disable time tracking for tasks.</span>
        </div>
        <template v-if="enabledRetrospectionByResearcher">
          <div class="mt-8">
            <Switch :modelValue="isEnabledAirbarRetrospection" :label="'Enable/disable retrospection'"
              :on-change="onChangeAirbarRetrospectionEnabled" />
            <span class="italic">Enable or disable evening retrospection popup for AIRbar.</span>
          </div>
        </template>
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
</style>
<!-- ***AIRBAR - END -->
