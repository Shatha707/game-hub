import axios from "axios";
 export default axios.create({
    baseURL:'https://api.rawg.io/api',
    params:{
        key: 'c8956a3b735d4a299dd410cba3902ab9'
    }
})