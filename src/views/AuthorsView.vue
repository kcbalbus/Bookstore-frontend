<<template>
  <div>
    <form>
      <div class="header">
        <h1>
          Autorzy
        </h1>

        <div class="spacer"></div>

        <div class="buttons">
          <router-link  to="/authors/add" class="btn btn-primary">Dodaj autora</router-link>
        </div>
      </div>

      <div class="table-container">
        <table class="table">
          <thead>
          <tr>
            <th class="blue-bg">ID</th>
            <th class="blue-bg">Imię</th>
            <th class="blue-bg">Nazwisko</th>
            <th class="blue-bg">Rok urodzenia</th>
            <th class="blue-bg">Kraj pochodzenia</th>
            <th class="blue-bg">Akcje</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="author in paginatedAuthors" :key="author.id">
            <td>{{ author.id }}</td>
            <td>{{ author.firstName }}</td>
            <td>{{ author.lastName }}</td>
            <td>{{ author.birthYear }}</td>
            <td>{{ author.country }}</td>
            <td>
              <router-link :to="{name: 'Authors Edit', params: {id: author.id} }" class="btn btn-primary" >Edytuj</router-link>
              <button type="submit" class="btn btn-danger" @click="deleteAuthor(author.id)">Usuń</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </form>

    <div class="pagination">
      <button class="btn btn-secondary" @click="previousPage" :disabled="currentPage === 1">Poprzednia</button>
      <span>{{ currentPage }}</span>
      <button class="btn btn-secondary" @click="nextPage" :disabled="currentPage === totalPages">Następna</button>
    </div>
  </div>
</template>

<script setup>
import {computed, onBeforeMount, ref} from 'vue';
import router from "@/router/index.js";
import {useToast} from "vue-toast-notification";
import {useBookstoreStore} from "@/stores/BookstoreStore.js";

onBeforeMount(async () => {
  await bookstoreStore.getAuthors();
});

const currentPage = ref(1);
const pageSize = 10;
const bookstoreStore = useBookstoreStore();
const $toast = useToast();

const deleteAuthor = async (authorId) => {
  await bookstoreStore.deleteAuthor(authorId);
  let toast = $toast.success('Pomyślnie usunięto autora');
  setTimeout(() => {
    toast.dismiss();
  }, 3000);
};

const paginatedAuthors = computed(() => {
  if (!bookstoreStore.authors) {
    return [];
  }

  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return bookstoreStore.authors.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(bookstoreStore.authors.length / pageSize);
});

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
}

.pagination button:hover {
  background-color: #0056b3;
}

.pagination span {
  margin: 0 5px;
  font-weight: bold;
}

</style>