ajax({
    url: '/mi/homepage/main/v1002',
    type: 'post',
    data: {
        platform: 'pc'
    },
    success(res) {
        
        res=JSON.parse(res)
        console.log(res)
    }
})