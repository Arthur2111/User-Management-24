<template>
  <div class="wrapper">
    <TheDashboard @showAddUserForm="showCreateUserForm" @showEditUserForm="showEditUserForm"
      @showRemoveUserAlert="showRemoveUserAlert"></TheDashboard>
    <UserForm v-if="createUserFormState" @closeFormComponent="closeFormComponent"></UserForm>
    <UpdateUserForm v-if="editUserFormState" :mode="'edit'" :id="selectedIdForEdit"
      @closeUpdateUserFormComponent="closeFormComponent">
    </UpdateUserForm>
    <DeleteUser v-if="deleteUserAlertState" :id="selectedIdForDelete" @closeDeleteUserComponent="closeFormComponent">
    </DeleteUser>
  </div>
</template>

<script setup lang="ts">

import UserForm from '@/components/DashboardComponents/UserForm.vue';
import DeleteUser from '@/components/DashboardComponents/DeleteUser.vue'
import UpdateUserForm from '@/components/DashboardComponents/UpdateUserForm.vue';
import TheDashboard from '../components/TheDashboard.vue'
import { ref } from 'vue';

const createUserFormState = ref<boolean>(false)
const editUserFormState = ref<boolean>(false)
const deleteUserAlertState = ref<boolean>(false)
const selectedIdForEdit = ref<null | string>(null)
const selectedIdForDelete = ref<null | string>(null)

function showCreateUserForm() {
  createUserFormState.value = true
}

function closeFormComponent() {
  createUserFormState.value = false
  editUserFormState.value = false
  deleteUserAlertState.value = false
}

function showEditUserForm(id: string) {
  selectedIdForEdit.value = id

  if (!selectedIdForEdit.value) return

  editUserFormState.value = true
}

function showRemoveUserAlert(id: string) {
  console.log(id);

  selectedIdForDelete.value = id
  if (!selectedIdForDelete.value) return
  deleteUserAlertState.value = true

}

</script>

<style scoped lang="less">
.wrapper {
  position: relative;
}
</style>
