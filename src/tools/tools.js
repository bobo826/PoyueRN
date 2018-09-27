export default class Tools {
    Post(url,post_param,success){
        const param = post_param;
        const paramStr = JSON.stringify(param);
        // post请求描述
        const requestDesc = {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:paramStr
        };
        // 发送post请求
        fetch(url,requestDesc)
            .then((response)=>response.json())
            .then(success)
            .catch((error)=>{
                console.warn(error)
            })
    }
}

