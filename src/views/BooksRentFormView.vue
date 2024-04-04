<template>
  <div>
    <form class="form-container">

      <div class="form-group">
        <label for="rented">Numer telefonu wypożyczającego:</label>
        <input v-model="bookData.rented" type="tel" id="rented" :readonly="isReturning" required />
      </div>

      <div class="form-group">
        <button type="submit" class="btn btn-primary" @click="handleSubmit">{{ isReturning ? 'Zwróć ksiązkę' : 'Wypożycz książkę' }}</button>
        <button class="btn btn-danger" @click="cancel">Anuluj</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import {ref, onMounted, onBeforeMount, watch, render} from 'vue';
import {useRoute} from "vue-router";
import router from "@/router/index.js";
import {useBookstoreStore} from "@/stores/BookstoreStore.js";
import {useToast} from "vue-toast-notification";

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
let isReturning = false;

onMounted(() => {
  const bookIdFromRoute = Number(route.params.id);

  const bookToEdit = bookstoreStore.books.find(book => book.id === bookIdFromRoute);

  if (bookToEdit) {

    bookData.value = {...bookToEdit}

    if(bookToEdit.rented!==null){
      isReturning = true;
    } else {
      bookData.value.rented = "+48 "
    }
  } else {
    router.push("/books")
  }

  console.log("Return", isReturning);
  console.log("Return", bookData.value);

});

const handleSubmit = () => {

  if (isReturning) {
    bookData.value.rented=null;
  }

  console.log("sub", bookData.value)

  bookstoreStore.updateBook(bookData.value);

  let toast = $toast.success('Pomyślnie edytowano książkę.');
  setTimeout(() => {
    toast.dismiss();
  }, 3000);

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
