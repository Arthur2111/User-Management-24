<template>
    <section class="pagination-section" v-if="totalPages() > 0">
        <button v-if="showPrevLink()" class="pagination-btn" @click="updatePage(props.currPage - 1)">prev</button>
        {{ props.currPage + 1 }} of {{ totalPages() }}
        <button v-if="showNextLink()" class="pagination-btn" @click="updatePage(props.currPage + 1)">next</button>
    </section>
</template>


<script setup>

import { defineProps, defineEmits } from 'vue';

const props = defineProps(['currPage', 'pageSize', 'users'])
const emit = defineEmits(['handleUpdatePage'])

function updatePage(pageNumber) {
    emit('handleUpdatePage', pageNumber)
}
function totalPages() {
    return Math.ceil(props.users.length / props.pageSize)
}
function showPrevLink() {
    return props.currPage == 0 ? false : true
}
function showNextLink() {
    return props.currPage == (totalPages() - 1) ? false : true;
}

</script>

<style lang="less">
.pagination-section {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1em;
    margin: 1em;

    .pagination-btn {
        cursor: pointer;
    }

    button {
        border-radius: 10px;
        border: 1px solid rgb(64, 127, 91);
        padding: 0.5em 1em;
        background-color: rgb(64, 127, 91);
    }
}
</style>