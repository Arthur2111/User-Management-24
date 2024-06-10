<template>
    <div class="base-card">
        <div class="form-wrapper">
            <h1>Create A New User</h1>
            <form @submit.prevent="sendNewData()">
                <div class="name-container" :class="name.isValid ? '' : 'invalid'">
                    <label for="Name">Your Name</label>
                    <input type="text" id="Name" v-model="name.val">
                    <p v-if="!name.isValid">Please enter a valid name</p>
                </div>
                <div class="hp-container" :class="phoneNumber.isValid ? '' : 'invalid'">
                    <label for="handphone">Your Phone Number</label>
                    <input input type="tel" id="handphone" pattern="^[0-9-+\s()]{6,16}" v-model="phoneNumber.val">
                    <p v-if="!phoneNumber.isValid">Please enter a valid number</p>
                </div>
                <div class="email-container" :class="email.isValid ? '' : 'invalid'">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="email.val">
                    <p v-if="!email.isValid">Please enter a valid email</p>
                </div>
                <div class="role-container" :class="role.isValid ? '' : 'invalid'">
                    <label for="role">Role</label>
                    <select class="dropdown-menu" type="dropdown" id="role" v-model="role.val">
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        <option value="guest">Guest</option>
                    </select>
                    <p v-if="!role.isValid">Please select one of the items on the dropdown menu</p>
                </div>
            </form>
            <div class="btn-container">
                <BaseButton @click="sendNewData()">Submit Form</BaseButton>
                <BaseButton @click="closeFormComponent()" :mode="'close'">Close Form</BaseButton>
            </div>
        </div>
    </div>

</template>


<script setup>
import { ref, defineEmits, defineProps } from 'vue';
import BaseButton from '../Modal/BaseButton.vue';
import { useUserStore } from '@/store/userStore';


const store = useUserStore()

const emit = defineEmits(['closeFormComponent'])


const name = ref({
    val: '',
    isValid: true
})
const phoneNumber = ref({
    val: '',
    isValid: true
})
const email = ref({
    val: '',
    isValid: true
})
const role = ref({
    val: '',
    isValid: true
})

const formIsValid = ref(true)

function validateForm() {
    formIsValid.value = true
    if (name.value.val === '') {
        name.value.isValid = false
        formIsValid.value = false
    } else {
        name.value.isValid = true
    }
    if (phoneNumber.value.val === '') {
        phoneNumber.value.isValid = false
        formIsValid.value = false
    } else {
        phoneNumber.value.isValid = true
    }
    if (email.value.val === '') {
        email.value.isValid = false
        formIsValid.value = false
    } else {
        email.value.isValid = true

    }
    if (role.value.val === '') {
        role.value.isValid = false
        formIsValid.value = false
    } else {
        role.value.isValid = true
    }
}

function closeFormComponent() {
    emit('closeFormComponent')
}

async function sendNewData() {
    validateForm()
    if (!formIsValid.value) return

    try {
        let payload = {
            name: name.value.val,
            phoneNumber: phoneNumber.value.val,
            email: email.value.val,
            role: role.value.val
        }

        const response = await store.createUser(payload)

        console.log(response);

        if (response.code === 200) {
            name.value.val = ''
            email.value.val = ''
            phoneNumber.value.val = ''
            role.value.val = ''

            alert('Successfully Created')
        } else {
            alert("Please Sign In To Create A User else contact our support")
            throw new Error("something went wrong please check if you are signed in")
        }
    } catch (e) {
        console.log(e);
    }
}



</script>


<style lang="less" scoped>
p {
    margin: 0
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

.form-wrapper {
    max-width: 400px;
    width: 100%;
    margin: 0.5rem auto;
    padding: 3em;

    background-color: #fff;
    border-radius: 25px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);

    min-width: 250px;
    height: 350px;

    label {
        font-weight: bold;
        display: block;
        margin-bottom: 0.5rem;
        font-size: 1.6rem;
        text-align: left;
    }


    input {
        display: block;
        width: 100%;
        border: 1px solid #ccc;
        font: inherit;
    }

    input:focus {
        background-color: #f0e6fd;
        outline: none;
        border-color: #3d008d;
    }

    .role-container {
        display: flex;
        flex-direction: column;
    }

    .btn-container {
        margin: 1em
    }
}

.invalid label,
.invalid {
    color: red;
    text-align: left;
}


.invalid input {
    border: 1px solid red;
}
</style>