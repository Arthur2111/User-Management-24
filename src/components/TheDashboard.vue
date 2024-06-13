<template>
  <div class="dashboard-container">
    <h2>Dashboard View</h2>
    <div class="main-btn-container">
      <UserFilter @change-filter-role="setFilters"></UserFilter>
      <BaseButton @click="store.getUsersList()">Refresh List</BaseButton>
      <BaseButton @click="openFormComponent">Add New User</BaseButton>
    </div>
    <ThePagination :currPage="currPage" :pageSize="pageSize" :users="allUserData" @handleUpdatePage="updatePage">
    </ThePagination>

    <ul class="responsive-table">
      <li class="table-header">
        <div class="col col-1">Id</div>
        <div class="col col-2">Name</div>
        <div class="col col-3">Hp</div>
        <div class="col col-4">Email</div>
        <div class="col col-5">Role</div>
        <div class="col col-6">Actions</div>
      </li>

      <div class="list-wrapper" v-for="user in filteredData" :key="user.id">
        <li class="table-row">
          <div class="col col-1" data-label="ID">{{ user.id }}</div>
          <div class="col col-2" data-label="Name">{{ user.name }}</div>
          <div class="col col-3" data-label="Phone Number">{{ user.phoneNumber }}</div>
          <div class="col col-4" data-label="Email">{{ user.email }}</div>
          <div class="col col-5" data-label="Role">{{ user.role }}</div>
          <!-- give these icons to edit and delete -->
          <div class="col col-6 actions-container " data-label="Actions">
            <BaseButton @click="showEditForm(user.id)">Edit</BaseButton>
            <BaseButton :mode="'close'" @click="showRemoveUserAlert(user.id)">delete</BaseButton>
          </div>

        </li>
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">
import BaseButton from './Modal/BaseButton.vue'
import ThePagination from './DashboardComponents/ThePagination.vue'
import UserFilter from './DashboardComponents/UserFilter.vue'
import { useUserStore } from '@/store/userStore';
import { computed, defineEmits, ref } from 'vue'

const store = useUserStore()


interface Filter {
  admin: boolean,
  user: boolean,
  guest: boolean
}

const emit = defineEmits(['showAddUserForm', 'showEditUserForm','showRemoveUserAlert'])
const activeRoleFilter = ref<Filter>({
  admin: true,
  user: true,
  guest: true
})

const currPage = ref(0)
const pageSize = ref(5)
const allUserData = store.userList
const formattedFilteredUsers = ref<{
  id: string,
  name: string,
  email: string,
  phoneNumber: string,
  role: string
}[]>([])

// handle filtered values
function setFilters(filter: Filter) {
  activeRoleFilter.value = filter
}
const filteredData = computed(() => {
  const filteredUsers = allUserData.value.filter((user) => {
    if (activeRoleFilter.value.admin && user.role.includes('admin')) {
      return true
    }
    if (activeRoleFilter.value.user && user.role.includes('user')) {
      return true
    }
    if (activeRoleFilter.value.guest && user.role.includes('guest')) {
      return true
    }
    return false
  })

  formattedFilteredUsers.value = filteredUsers

  const response = updateVisibleUser(formattedFilteredUsers.value)

  return response

})


// pagination functions
function updatePage(pageNumber:number) {
  currPage.value = pageNumber;
  updateVisibleUser(formattedFilteredUsers.value);
}
function updateVisibleUser(filteredUsers: any ) {
  let visibleUser = filteredUsers.slice(currPage.value * pageSize.value, (currPage.value * pageSize.value) + pageSize.value)

  if (visibleUser.length == 0 && currPage.value > 0) {
    updatePage(currPage.value - 1)
  }

  return visibleUser
}


function openFormComponent() {
  console.log('hello world');
  emit('showAddUserForm')
}
function showEditForm(id:string) {
  emit('showEditUserForm', id)
}
function showRemoveUserAlert(id:string) {
  
  emit('showRemoveUserAlert', id)
}

store.getUsersList()

</script>

<style scoped lang="less">
ul {
  padding: 0;
}

h2 {
  font-size: 2.6rem;
  margin: 2em 0;
  text-align: center;

}

.dashboard-container {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1em;
  padding-right: 1em;
}

.main-btn-container {
  display: flex;
  justify-content: flex-end;
  gap: 2em;

  .filter-section {
    display: flex;
    gap: 0.5em;
    align-items: center;

    label {
      font-size: 1.6rem;
      text-align: center;
    }

  }
}

.responsive-table {
  li {
    border-radius: 3px;
    padding: 2.5em 3em;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.5em;
  }

  .table-header {
    background-color: #95a5a6;
    font-size: 1.4rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .list-wrapper {
    @media all and (max-width: 767px) {
      .table-header {
        display: none;
      }

      .table-row {
        box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
      }

      li {
        display: block;
      }

      .col {
        flex-basis: 100%;
      }

      .col {
        display: flex;
        padding: 10px 0;

        &:before {
          color: #6c7a89;
          padding-right: 10px;
          content: attr(data-label);
          flex-basis: 50%;
          text-align: right;
        }
      }
    }
  }

  .table-row {
    background-color: #ffffff;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
  }

  .col-1 {
    flex-basis: 20%;
  }

  .col-2 {
    flex-basis: 20%;
  }

  .col-3 {
    flex-basis: 20%;
  }

  .col-4 {
    flex-basis: 20%;
  }

  .col-5 {
    flex-basis: 20%;
  }

  .actions-container {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  @media all and (max-width: 767px) {
    .table-header {
      display: none;
    }

    .table-row {
      box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
    }

    li {
      display: block;
    }

    .col {
      flex-basis: 100%;
      display: flex;
      padding: 10px 0;

      &:before {
        color: #6c7a89;
        padding-right: 10px;
        content: attr(data-label);
        flex-basis: 50%;
        text-align: right;
      }
    }

    .actions-container {
      display: flex;
      flex-direction: row;
      gap: 1em;
      align-items: center;
    }
  }

}
</style>
