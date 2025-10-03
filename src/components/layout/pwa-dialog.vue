<script setup lang="ts">
import { useDialogPluginComponent } from "quasar";
import { useI18n } from "@/i18n";
const { t } = useI18n();
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>

<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <div class="pwa-dialog">
      <div class="pwa-dialog-content">
        <div class="pwa-dialog-content-title">
          {{ t("global.pwa.install") }}
        </div>
        <div class="pwa-dialog-content-description">
          <div>{{ t("global.pwa.install.content") }}</div>
        </div>
        <div class="pwa-dialog-content-action">
          <div class="pwa-dialog-content-button-install" @click="onDialogOK">
            {{ t("global.confirm") }}
          </div>
          <div class="pwa-dialog-content-button-cancel" @click="onDialogCancel">
            {{ t("global.cancel") }}
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<style scoped lang="scss">
.pwa-dialog {
  width: 5rem;
  height: 3rem;
  border-radius: 20px;
  background: linear-gradient(
    180deg,
    rgba(51, 1, 127, 1) 0%,
    rgba(107, 0, 179, 1) 100%
  );

  &-content {
    display: grid;
    grid-template-rows: 20% 55% 25%;
    width: 5rem;
    height: 3rem;
    color: #ffffff;
    font-size: 0.25rem;
    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &-title {
      background: linear-gradient(
        180deg,
        rgba(142, 112, 255, 1) 0%,
        rgba(116, 57, 246, 1) 30%,
        rgba(115, 34, 215, 1) 70%,
        rgba(115, 34, 215, 1) 100%
      );
    }
    &-action {
      height: auto;
      gap: 1rem;
      font-size: 0.28rem;
      font-weight: bold;
    }
  }
}
</style>
