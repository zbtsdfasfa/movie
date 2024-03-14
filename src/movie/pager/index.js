import $ from 'jquery'
import styles from './index.module.less'
import { getMovies } from '../../api/movie'
import { createMovies } from '../list/index'

let container;
function init() {
    container = $('<div>').addClass(styles.pager).appendTo('#app')
}

init()



// 创建分页函数，传入当前页码page，容量limit，和总页数
export function createPagers(page, limit, total) {

    container.empty();
    /*
    辅助函数，负责帮忙创建标签
    text：标签文本
    status：标签状态，空字符串-普通状态，disabled-禁用状态，active-选中状态
    */
    function createTag(text, status, targetPage) {
        const span = $('<span>').appendTo(container).text(text)
        const className = styles[status]
        span.addClass(className)
        // 只有是普通状态的时候才添加点击事件
        if (status == '') {
            span.on('click', async function () {
                // 点击要做三件事情
                // 1,重新获取数据
                const res = await getMovies(targetPage, limit)
                // 2,重新生成列表区域
                createMovies(res.data.movieList)
                // 3,重新生成分页区域
                createPagers(targetPage, limit, res.data.movieTotal)
            })
        }
    }
    let maxPage = Math.ceil(total / limit);//最大页码
    // 创建首页
    createTag('首页', page === 1 ? 'disabled' : '', 1)
    // 创建上一页
    createTag('上一页', page === 1 ? 'disabled' : '', page - 1)
    // 创建数字页码
    const maxCount = 10; //最大页码数量
    let min = Math.floor(page - maxCount / 2)
    if (min < 1) {
        min = 1
    }
    let max = min + maxCount - 1
    if (max > maxPage) {
        max = maxPage
    }
    // 循环创建
    for (let i = min; i < max; i++) {
        createTag(i, page == i ? 'active' : '', i)
    }
    // createTag('1', 'active', 1)
    // 创建下一页
    createTag('下一页', page === maxPage ? 'disabled' : '', page + 1)
    // 创建尾页
    createTag('尾页', page === maxPage ? 'disabled' : '', maxPage)
}