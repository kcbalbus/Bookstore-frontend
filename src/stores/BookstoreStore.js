import {defineStore} from 'pinia';
import ApiService from '../services/ApiService';

export const useBookstoreStore = defineStore({
    id: 'bookstore',
    state: () => ({
        books: undefined,
        authors: undefined
    }),
    getters: {
        bookstoreBookstore: state => state.school,
    },
    actions: {
        async getBooks() {
            this.books = await ApiService.getBooks();
        },
        async deleteBook(id) {
            await ApiService.deleteBook(id);
            this.books = await ApiService.getBooks();
        },
        async updateBook(book) {
            await ApiService.updateBook(book);
            this.books = await ApiService.getBooks();
        },
        async addBook(book) {
            await ApiService.addBook(book);
            this.books = await ApiService.getBooks();
        },
        async getAuthors() {
            this.authors = await ApiService.getAuthors();
        },
        async deleteAuthor(id) {
            await ApiService.deleteAuthor(id);
            this.authors = await ApiService.getAuthors();
        },
        async updateAuthor(author) {
            console.log(author)
            await ApiService.updateAuthor(author);
            this.authors = await ApiService.getAuthors();
        },
        async addAuthor(author) {
            await ApiService.addAuthor(author);
            console.log("autor - STORE", author.firstName);
            this.authors = await ApiService.getAuthors();
        },
    },
});

// Export the store for use in the application
export default useBookstoreStore;
