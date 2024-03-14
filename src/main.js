import './cover'//静态依赖，必须和打包文件一起使用
import('./movie') //动态依赖，表示刚开始不着急打包；会打包为一个独立的文件
import './global.css'
