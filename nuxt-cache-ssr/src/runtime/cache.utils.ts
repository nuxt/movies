
export const isUrlCacheable = (req, pages = [])=>{

    const {url} = req
    let isCacheable = false

    pages.forEach(page =>{
        if(url?.startsWith(page)) {
            isCacheable = true
        }
    });


    return isCacheable

}