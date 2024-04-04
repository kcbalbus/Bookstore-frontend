<template>
  <div>
    <form class="form-container">
      <div class="form-group">
        <label for="id">ID:</label>
        <input v-model="authorData.id" type="number" id="id" readonly required />
      </div>

      <div class="form-group">
        <label for="firstName">Imię:</label>
        <input v-model="authorData.firstName" type="text" id="firstName" required />
      </div>

      <div class="form-group">
        <label for="lastName">Nazwisko:</label>
        <input v-model="authorData.lastName" type="text" id="lastName" required />
      </div>

      <div class="form-group">
        <label for="birthYear">Rok urodzenia:</label>
        <input v-model="authorData.birthYear" type="number" id="birthYear" required />
      </div>

      <div class="form-group">
        <label for="country">Kraj pochodzenia:</label>
        <input v-model="authorData.country" type="text" id="country" required />
      </div>

      <div class="form-group">
        <button type="submit" class="btn btn-primary" @click="handleSubmit">{{ isEditing ? 'Edytuj autora' : 'Dodaj autora' }}</button>
        <button class="btn btn-danger" @click="cancel">Anuluj</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount,watch } from 'vue';
import {useRoute} from "vue-router";
import router from "@/router/index.js";
import {useBookstoreStore} from "@/stores/BookstoreStore.js";
import {useToast} from "vue-toast-notification";

let isEditing = false;
const authorData = ref({
  id: null,
  firstName: "",
  lastName: "",
  country: "",
  birthYear: null
});

onBeforeMount(async () => {
  await bookstoreStore.getAuthors();
});

const route = useRoute();
const $toast = useToast();
const bookstoreStore = useBookstoreStore();

onMounted(() => {
  const authorIdFromRoute = Number(route.params.id);

  if (authorIdFromRoute) {
    const authorToEdit = bookstoreStore.authors.find(author => author.id === authorIdFromRoute);

    if (authorToEdit) {
      authorData.value = { ...authorToEdit}
      isEditing = true;
    }
  }

  if(!isEditing){
    authorData.value.id=getNextId();
  }
});

const getNextId = () => {
  const maxId = bookstoreStore.authors.reduce((max, item) => (item.id > max ? item.id : max), 0);
  return maxId + 1;
};

const handleSubmit = () => {

  if (isEditing) {
    bookstoreStore.updateAuthor(authorData.value);

    let toast = $toast.success('Pomyślnie edytowano autora.');
    setTimeout(() => {
      toast.dismiss();
    }, 3000);

  } else {
    bookstoreStore.addAuthor(authorData.value);

    let toast = $toast.success('Pomyślnie dodano autora.');
    setTimeout(() => {
      toast.dismiss();
    }, 3000);
  }

  router.push("/authors");
};


const cancel = () => {
  let toast = $toast.info('Anulowano');
  setTimeout(() => {
    toast.dismiss();
  }, 3000);
  router.push("/authors");
};
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center;
}

.form-group {
  margin-bottom: 10px;
}

.form-group label {
  display: block;
  text-align: left;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
  box-sizing: border-box;
}

</style>
