import RestService, {URLS} from "./RestService";
class ApiService {

    static async getBooks() {
        try {
            return await RestService.ajax(
                `${URLS.books}`,
                "GET",
                null,
                null
            );
        } catch (error) {
            console.error("Failed to fetch books:", error);
        }
    }

    static async addBook(book) {
        try {
            return await RestService.ajax(
                `${URLS.books}`,
                "POST",
                null,
                book
            );
        } catch (error) {
            console.error("Failed to add " + id.toString() + " book:", error);
        }
    }

    static async deleteBook(id) {
        try {
            return await RestService.ajax(
                `${URLS.books}/${id}`,
                "DELETE",
                null,
                null
            );
        } catch (error) {
            console.error("Failed to delete " + id.toString() + " book:", error);
        }
    }

    static async updateBook(book) {
        console.log("update-book-api", book)

        try {
            return await RestService.ajax(
                `${URLS.books}`,
                "PUT",
                null,
                book
            );
        } catch (error) {
            console.error("Failed to update " + book.id.toString() + " book:", error);
        }
    }

    static async getAuthors() {
        try {
            return await RestService.ajax(
                `${URLS.authors}`,
                "GET",
                null,
                null
            );
        } catch (error) {
            console.error("Failed to fetch authors:", error);
        }
    }

    static async addAuthor(author) {
        try {
            console.log("autor - API", author.firstName);
            return await RestService.ajax(
                `${URLS.authors}`,
                "POST",
                null,
                author
            );
        } catch (error) {
            console.error("Failed to add " + author.id.toString() + " author:", error);
        }
    }

    static async deleteAuthor(id) {
        try {
            return await RestService.ajax(
                `${URLS.authors}/${id}`,
                "DELETE",
                null,
                null
            );
        } catch (error) {
            console.error("Failed to delete " + id.toString() + " author:", error);
        }
    }

    static async updateAuthor(author) {
        try {
            return await RestService.ajax(
                `${URLS.authors}`,
                "PUT",
                null,
                author
            );
        } catch (error) {
            console.error("Failed to update " + author.id.toString() + " author:", error);
        }
    }
}

export default ApiService;
