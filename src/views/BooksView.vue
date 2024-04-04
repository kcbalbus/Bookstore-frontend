<<template>
  <div>
    <form>
      <div class="header">
        <h1>
          Książki
        </h1>

        <div class="spacer"></div>

        <div class="buttons">
          <router-link to="/books/add" class="btn btn-primary">Dodaj ksiązkę</router-link>
        </div>
      </div>

      <div class="table-container">
        <table class="table">
          <thead>
          <tr>
            <th class="blue-bg">ID</th>
            <th class="blue-bg">Tytuł</th>
            <th class="blue-bg">Autor</th>
            <th class="blue-bg">Ilość stron</th>
            <th class="blue-bg">Stan</th>
            <th class="blue-bg">Akcje</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="book in bookstoreStore.books" :key="book.id">
            <td>{{ book.id }}</td>
            <td>{{ book.title }}</td>
            <td>{{ book.author.firstName + " " + book.author.lastName }}</td>
            <td>{{ book.pages }}</td>
            <td>{{ book.rented === null ? "Dostępna" : "Wypożyczona: " + book.rented }}</td>
            <td>
              <router-link :to="{name: 'Books Rent', params: {id: book.id} }" class="btn btn-primary" >Zarządzaj wypożyczeniem</router-link>
              <router-link :to="{name: 'Books Edit', params: {id: book.id} }" class="btn btn-primary" >Edytuj</router-link>
              <button type="submit" class="btn btn-danger" @click="deleteBook(book.id)">Usuń</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </form>
  </div>
</template>

<script setup>
import {onBeforeMount} from 'vue';
import router from "@/router/index.js";
import {useToast} from "vue-toast-notification";
import {useBookstoreStore} from "@/stores/BookstoreStore.js";

onBeforeMount(async () => {
  await bookstoreStore.getBooks();
});

const bookstoreStore = useBookstoreStore();
const $toast = useToast();

const deleteBook = async (bookId) => {
  await bookstoreStore.deleteBook(bookId);
  let toast = $toast.success('Pomyślnie usunięto książkę');
  setTimeout(() => {
    toast.dismiss();
  }, 3000);
};

</script>


<style scoped>
.header {
  display: flex;
  align-items: center;
  margin: 20px;
}

.dropdown {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.dropdown-container {
  margin-left: 10px;
}

.spacer {
  flex: 1;
}

.buttons {
  display: flex;
  align-items: center;
}

.button-spacer {
  margin-left: 10px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.blue-bg {
  background-color: #007bff;
  color: white;
}
</style>