import axios from "axios";
import router from "@/router";

export const ROOT_URL = 'http://localhost:8080';
export const URLS = {
    books: `${ROOT_URL}/books`,
    authors: `${ROOT_URL}/authors`,
};


class RestService {
    static async ajax(url, method, queryParams, data, headers) {
        url = this.setQueryParams(url, queryParams);
        const config = {
            url,
            method,
            data,
            headers: {...headers},
        };
        try {
            return await axios.request(config).then((response) => {
                return response.data;
            });
        } catch (e) {
            throw e;
        }
    }

    static setQueryParams(url, queryParams) {
        if (queryParams) {
            return `${url}?${queryParams.toString()}`;
        }
        return url;
    }
}

export default RestService;