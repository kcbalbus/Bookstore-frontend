import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import BooksView from "@/views/BooksView.vue";
import AuthorsView from "@/views/AuthorsView.vue";
import AuthorsFormView from "@/views/AuthorsFormView.vue";
import BooksFormView from "@/views/BooksFormView.vue";
import BooksRentFormView from "@/views/BooksRentFormView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView,
        },
        {
            path: '/books',
            name: 'Books',
            component: BooksView
        },
        {
            path: '/books/add',
            name: 'Books Add',
            component: BooksFormView
        },
        {
            path: '/books/:id/edit',
            name: 'Books Edit',
            component: BooksFormView
        },
        {
            path: '/books/:id/rent',
            name: 'Books Rent',
            component: BooksRentFormView
        },
        {
            path: '/authors',
            name: 'Authors',
            component: AuthorsView
        },
        {
            path: '/authors/add',
            name: 'Authors Add',
            component: AuthorsFormView
        },
        {
            path: '/authors/:id/edit',
            name: 'Authors Edit',
            component: AuthorsFormView
        },
    ]
})

export default router
