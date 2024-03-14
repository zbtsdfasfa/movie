import axios from "axios";
export async function getMovies(page, size) {
    let res = await axios.get('http://study.duyiedu.com/api/movies', {
        params: {
            page,
            size
        }
    })
    return res.data
}