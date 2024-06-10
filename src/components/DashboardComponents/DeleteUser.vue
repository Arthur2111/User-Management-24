<template>
    <div class="base-card">
        <div class="delete-wrapper">
            <h1>Are you sure you want to <span>DELETE</span> this user ?</h1>
            <div class="btn-wrapper">
                <BaseButton :mode="'close'" @click="handleDeleteUser()">Delete</BaseButton>
                <BaseButton @click="closeDeleteUserComponent()">Cancel</BaseButton>
            </div>
        </div>
    </div>


</template>

<script setup>

import BaseButton from '../Modal/BaseButton.vue'
import { useUserStore } from '@/store/userStore';
import { defineProps, defineEmits } from 'vue';

const store = useUserStore()
const props = defineProps(['id'])
const emit = defineEmits(['closeDeleteUserComponent'])

async function handleDeleteUser() {

    console.log(props.id);

    const response = await store.deleteUser(props.id)

    if (response?.code === 200) {
        alert('Successfully Deleted')
        closeDeleteUserComponent()
    } else {
        alert('Something went wrong during the delete please try again later or contact our help center')
    }
}

function closeDeleteUserComponent() {
    emit('closeDeleteUserComponent')
}


</script>

<style lang="less" scoped>
h1 {
    margin: 0;
}

.base-card {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1001;
}

.delete-wrapper {
    max-width: 400px;
    width: 100%;
    margin: 0.5rem auto;
    padding: 3em;

    background-color: #fff;
    border-radius: 25px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);

    min-width: 250px;
    height: 100px;

    .btn-wrapper {
        margin: 0.5em;
    }
}
</style>