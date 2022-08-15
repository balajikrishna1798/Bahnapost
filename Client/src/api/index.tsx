import axios from 'axios'
const API = axios.create({baseURL:"http://localhost:5000"})
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})
export const fetchPosts = () => API.get("/posts")
export const fetchPost = (id:any) => API.get(`/posts/${id}`)
export const fetchPostsBySearch = (search:any) => API.get(`/posts/search?title=${search} `)
export const createPosts = (postData:any) => API.post("/posts",postData)
export const updatePosts = (id:any,postData:any) => API.patch(`/posts/${id}`,postData)
export const deletePosts = (id:any) => API.delete(`/posts/${id}`)
export const likePosts = (id:any) => API.patch(`/posts/${id}/likePost`)
export const commentPosts = (value:any,id:any) => API.patch(`/posts/${id}/commentPost`,{value})


export const signIn = (formData:any) => API.post("/users/signin",formData)
export const signUp = (formData:any) => API.post("/users/signup",formData)
export const googleSignIn = (result:any) => API.post("/users/googleSignIn",result)

