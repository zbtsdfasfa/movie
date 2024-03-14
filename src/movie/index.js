import { createMovies } from './list'
import { getMovies } from '@/api/movie'
import { createPagers } from './pager'
async function init() {
    let res = await getMovies(1, 30)
    createMovies(res.data.movieList)
    let resutl = await createPagers(1, 30, res.data.movieTotal)
}
init()