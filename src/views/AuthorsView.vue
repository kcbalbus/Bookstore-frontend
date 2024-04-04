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
          <tr v-for="author in bookstoreStore.authors" :key="author.id">
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
  </div>
</template>

<script setup>
import {onBeforeMount} from 'vue';
import router from "@/router/index.js";
import {useToast} from "vue-toast-notification";
import {useBookstoreStore} from "@/stores/BookstoreStore.js";

onBeforeMount(async () => {
  await bookstoreStore.getAuthors();
});

const bookstoreStore = useBookstoreStore();
const $toast = useToast();

const deleteAuthor = async (authorId) => {
  await bookstoreStore.deleteAuthor(authorId);
  let toast = $toast.success('Pomyślnie usunięto autora');
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