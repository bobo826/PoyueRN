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
                console.log(error)
            })
    }
    //监听路由声明周期
    //addListener，接受navigation属性;
    //listentype,监听类型1
    //callback，监听回调
    ListenRouteLife(addListener,listentype,callback){
        addListener(
            listentype,
            callback
        );
    }


}

