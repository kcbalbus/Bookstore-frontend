<template>
  <div>
    <form class="form-container">
      <div class="form-group">
        <label for="id">ID:</label>
        <input v-model="bookData.id" type="number" id="id" readonly required />
      </div>

      <div class="form-group">
        <label for="title">Tytuł:</label>
        <input v-model="bookData.title" type="text" id="title" required />
      </div>

      <div class="form-group">
        <label for="authorId">Autor:</label>
        <select v-model="bookData.author" id="authorId" required>
          <option v-for="author in bookstoreStore.authors" :key="author.id" :value="author">{{ author.firstName + " " + author.lastName }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="pages">Strony:</label>
        <input v-model="bookData.pages" type="number" id="pages" min="0" required />
      </div>

      <div class="form-group">
        <button type="submit" class="btn btn-primary" @click="handleSubmit">{{ isEditing ? 'Edytuj ksiazke' : 'Dodaj ksiazke' }}</button>
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
const bookData = ref({
  id: null,
  title: "",
  pages: null,
  rented: null,
  author: null,
});

onBeforeMount(async () => {
  await bookstoreStore.getAuthors();
  await bookstoreStore.getBooks();
});

const route = useRoute();
const $toast = useToast();
const bookstoreStore = useBookstoreStore();

onMounted(() => {
  const bookIdFromRoute = Number(route.params.id);

  if (bookIdFromRoute) {
    const bookToEdit = bookstoreStore.books.find(book => book.id === bookIdFromRoute);

    if (bookToEdit) {
      bookData.value = { ...bookToEdit}
      isEditing = true;
    }
  }

  if(!isEditing){
    bookData.value.id=getNextId();
  }
});

const getNextId = () => {
  const maxId = bookstoreStore.books.reduce((max, item) => (item.id > max ? item.id : max), 0);
  return maxId + 1;
};

const handleSubmit = () => {
  console.log("Ksiazka - VIEW", bookData.value)
  if (isEditing) {
    bookstoreStore.updateBook(bookData.value);

    let toast = $toast.success('Pomyślnie edytowano książkę.');
    setTimeout(() => {
      toast.dismiss();
    }, 3000);

  } else {
    bookstoreStore.addBook(bookData.value);

    let toast = $toast.success('Pomyślnie dodano książkę.');
    setTimeout(() => {
      toast.dismiss();
    }, 3000);
  }

  router.push("/books");
};


const cancel = () => {
  let toast = $toast.info('Anulowano');
  setTimeout(() => {
    toast.dismiss();
  }, 3000);
  router.push('/books');
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
