<template>
    <section class="filter-section">
        <h2>Select Role</h2>
        <span class="filter-option">
            <label for="admin">Admin</label>
            <input type="checkbox" id="admin" checked @change="setFilter">
        </span>
        <span class="filter-option">
            <label for="user">User</label>
            <input type="checkbox" id="user" checked @change="setFilter">
        </span>
        <span class="filter-option">
            <label for="guest">guest</label>
            <input type="checkbox" id="guest" checked @change="setFilter">
        </span>
    </section>
</template>

<script setup>

import { ref, defineEmits } from 'vue'

const emit = defineEmits(['change-filter-role'])

const roleFilters = ref({
    admin: true,
    user: true,
    guest: true
})

function setFilter(event) {
    const inputId = event.target.id
    const isActive = event.target.checked
    const updatedFilters = {
        ...roleFilters.value,
        [inputId]: isActive
    }
    roleFilters.value = updatedFilters

    emit('change-filter-role', roleFilters.value)
}

</script>

<style lang="less" scoped>
h2 {
    margin: 0.5rem 0;
}

.filter-option {
    margin-right: 1rem;
}

.filter-option label,
.filter-option input {
    vertical-align: middle;
}

.filter-option label {
    margin-left: 0.25rem;
}

.filter-option.active label {
    font-weight: bold;
}
</style>