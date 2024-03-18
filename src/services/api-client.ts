import axios from "axios";
 export default axios.create({
    baseURL:'https://api.rawg.io/api',
    params:{
        key: '0bf7be074a4146b1b65883b14730fb79'
    }
})