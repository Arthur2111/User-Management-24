import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from 'axios'
import { useAuthStore } from "./authStore";

export const useUserStore = defineStore("user", () => {

  interface Data {
    name: string,
    email: string,
    phoneNumber: string,
    role: string
  }


  interface usersData {
    id: string,
    name: string,
    email: string,
    phoneNumber: string,
    role: string
  }

  const count = ref<number>(0);
  const usersData = ref<{
    id: string,
    name: string,
    email: string,
    phoneNumber: string,
    role: string
  }[]>([]);

  const activeRoleFilter = ref({
    admin: true,
    user: true,
    guest: true
  })



  const authStore = useAuthStore()

  const userList = computed(() => usersData)

  async function createUser(data: Data) {

    const token = authStore.returnToken.value
    try {
      const response = await axios.post(`https://user-manager-db-84315-default-rtdb.asia-southeast1.firebasedatabase.app/users.json?auth=${token}`, {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        role: data.role,
      })


      if (response.status == 200) {
        return { code: response.status, msg: 'successfully created' }
      } else {
        throw new Error('Ooops something went wrong')
      }


    } catch (e: any) {
      console.log(e);
      return { code: e.response.status, msg: 'something went wrong' }
    }

  }
  async function updateUser(id: string, data: Data) {
    const token = authStore.returnToken.value

    try {
      const response = await axios.put(`https://user-manager-db-84315-default-rtdb.asia-southeast1.firebasedatabase.app/users/${id}.json?auth=${token}`, {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        role: data.role,
      })
      console.log(response);

      if (response?.status == 200) {
        return { code: response?.status, msg: 'successfully created' }
      } else {
        throw new Error('Ooops something went wrong')
      }


    } catch (e) {
      console.log(e);
    }

  }
  async function deleteUser(id: string) {
    const token = authStore.returnToken.value

    try {
      const response = await axios.delete(`https://user-manager-db-84315-default-rtdb.asia-southeast1.firebasedatabase.app/users/${id}.json?auth=${token}`)
      console.log(response);

      if (response?.status == 200) {
        return { code: response?.status, msg: 'successfully deleted' }
      } else {
        throw new Error('Ooops something went wrong')
      }


    } catch (e) {
      console.log(e);
    }

  }
  async function getUsersList() {
    try {
      const response = await axios.get('https://user-manager-db-84315-default-rtdb.asia-southeast1.firebasedatabase.app/users.json')
      let usersArr = []

      console.log(response.data);


      if (response.status == 200) {
        const users = response.data
        for (let user in users) {

          const getUser = {
            id: user,
            name: users[user].name,
            email: users[user].email,
            phoneNumber: users[user].phoneNumber,
            role: users[user].role
          }
          usersArr.push(getUser)
        }

        usersData.value = usersArr
        return { code: response.status, msg: 'successfully retrieved' }

      } else {
        throw new Error('Ooops something went wrong')
      }
    } catch (e) {
      console.log(e);
    }
  }

  return { count, usersData, userList, createUser, getUsersList, updateUser, deleteUser, activeRoleFilter };
});
