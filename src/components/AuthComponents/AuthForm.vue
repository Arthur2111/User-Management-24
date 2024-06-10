<template>
    <div v-if="!store.userId">
        <BaseDialog :show="!!error" @close="closeDioalog" title="An Error Occurred">
            <p>{{ error }}</p>
        </BaseDialog>
        <BaseDialog :show="isLoading" title="Authenticating ..." fixed>
            <BaseSpinner></BaseSpinner>
        </BaseDialog>
        <div class="wrapper-auth">
            <form @submit.prevent="submitForm">
                <div class="form-control">
                    <label for="email">Email</label>
                    <input type="text" name="email" id="email" v-model.trim="email">
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" v-model.trim="password">
                </div>
                <p v-if="!formIsValid" class="errors">Please Enter A Valid Email Or Password (Must be at least 6
                    characters
                    long)</p>
                <BaseButton>{{ submitButtonCaption }}</BaseButton>
                <BaseButton type="button" :mode="'flat'" @click="swithcAuthMode">{{ switchButtonCaption }}</BaseButton>
            </form>
        </div>
    </div>
    <div v-else>
        <div class="wrapper-auth">
            <h1>User : {{ store.userId }} Logged In</h1>
            <h2>You May Now Perform CRUD ACTIONS</h2>
        </div>
    </div>

</template>


<script setup>
import { computed, ref } from 'vue';
import BaseButton from '../Modal/BaseButton.vue';
import BaseDialog from '../Modal/BaseDialog.vue';
import BaseSpinner from '../Modal/BaseSpinner.vue';

import { useAuthStore } from '../../store/authStore'

const store = useAuthStore()

const email = ref('')
const password = ref('')
const formIsValid = ref(true)
const mode = ref('login')
const isLoading = ref(false)
const error = ref(null)
const createPassWordError = ref(false)


async function submitForm() {
    formIsValid.value = true

    isLoading.value = true


    try {
        if (email.value === '' || !email.value.includes('@') || password.value.length < 6) {
            formIsValid.value = false
            isLoading.value = false
            return
        }


        let payload = {
            email: email.value,
            password: password.value
        }

        // send auth details
        if (mode.value === 'login') {

            const response = await store.login(payload)
            if (response.code != 200) {
                throw new Error(JSON.stringify(response.msg))
            }

        } else {
            const response = await store.signup(payload)
            if (response.code != 200) {
                throw new Error(JSON.stringify(response.msg))
            }

        }
    } catch (e) {
        error.value = e.message || 'failed to authenticate try again later'
    }

    isLoading.value = false

}
function swithcAuthMode() {
    if (mode.value === 'login') {
        mode.value = 'signup';
    } else {
        mode.value = 'login';
    }
}

function closeDioalog() {
    error.value = null
}

const submitButtonCaption = computed(() => {
    return mode.value === 'login' ? 'Login' : 'Sign Up'
})
const switchButtonCaption = computed(() => {
    return mode.value === 'login' ? 'Sign Up Instead' : 'Login Instead'
})


</script>


<style lang="less" scoped>
@keyframes fade-in-animation {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.wrapper-auth {
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 1rem;
    margin: 2rem auto;
    max-width: 40rem;

    animation-name: fade-in-animation;
    animation-duration: 1s;
}

form {
    margin: 5em auto;
    padding: 1em;

    max-width: 400px;

    .form-control {
        margin: 0.5rem 0;
    }

    label {
        font-weight: bold;
        margin-bottom: 0.5rem;
        display: block;
    }

    input,
    textarea {
        display: block;
        width: 100%;
        font: inherit;
        border: 1px solid #ccc;
        padding: 0.15rem;
    }

    input:focus,
    textarea:focus {
        border-color: #3d008d;
        background-color: #faf6ff;
        outline: none;
    }

    .errors {
        font-weight: bold;
        color: red;
    }

    .actions {
        text-align: center;
    }
}
</style>