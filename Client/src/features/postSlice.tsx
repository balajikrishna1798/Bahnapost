import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api'

const initialState= {
    posts:[],
    userPosts:[],
    tagTours:[],
    error:"",
    loading:false
}

export const createPost:any = createAsyncThunk("post/createPost",async(data:any,{rejectWithValue})=>{
    const {postData,navigate} = data
    try {
        const response = await api.createPosts(postData)
        navigate("/posts")
        return response.data
    } catch (error) {
        
    }
}) 
export const getPosts:any = createAsyncThunk("post/getPosts",async(_,{rejectWithValue})=>{
    try {
        const response = await api.fetchPosts()
        console.log(response);
        return response.data
    } catch (error) {
        
    }
}) 
export const deletePost:any = createAsyncThunk("post/deletePost",async(data:any,{rejectWithValue})=>{
    const {id,navigate} = data
    try {
        const response = await api.deletePosts(id)
        return response.data
    } catch (error) {
        
    }
}) 
export const likePost:any = createAsyncThunk("post/likePost",async(id,{rejectWithValue})=>{
    try {
        const response = await api.likePosts(id)
        return response.data
    } catch (error) {
        
    }
}) 

export const commentPost:any = createAsyncThunk("post/commentPost",async(data:any,{rejectWithValue})=>{
    const {postId,text} = data

    try {
        const response = await api.makeComment(postId,text)
        console.log(postId,text);
        return response.data
    } catch (error) {
        
    }
}) 

export const updatePost:any = createAsyncThunk("post/updatePost",async(data:any,{rejectWithValue})=>{
    const {id,postData,navigate} = data
    try {
        const response = await api.updatePosts(id,postData)
        navigate("/posts")
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
}) 
export const getPost:any = createAsyncThunk("post/getPost",async(data:any,{rejectWithValue})=>{
    const {id,navigate} = data

    try {
        const response = await api.fetchPost(id)
        console.log(response.data);
        
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
}) 

export const getPostByUser:any = createAsyncThunk("post/getPostByUser",async(userId,{rejectWithValue})=>{
    try {
        const response = await api.fetchPostsByUser(userId)
        return response.data
    } catch (error) {
        
    }
}) 

export const getPostByGoogleUser:any = createAsyncThunk("post/getPostByGoogleUser",async(googleUserId,{rejectWithValue})=>{
    try {
        const response = await api.fetchPostsByGoogleUser(googleUserId)
        return response.data
    } catch (error) {
        
    }
}) 


export const getPostBySearch:any = createAsyncThunk("post/getPostBySearch",async(search,{rejectWithValue})=>{
    try {
        const response = await api.fetchPostsBySearch(search)
        return response.data
    } catch (error) {
        
    }
}) 

export const getPostByTag:any = createAsyncThunk("post/getPostByTag",async(tag,{rejectWithValue})=>{
    try {
        const response = await api.fetchPostsByTag(tag)
        return response.data
    } catch (error) {
        
    }
}) 



const postSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{},
        extraReducers:{
            [createPost.pending]:(state)=>{
                 state.loading = true
            },
            [createPost.fulfilled]:(state,action)=>{
                state.loading = false
                 state.posts.push(action.payload)
            },
            [createPost.rejected]:(state,action)=>{
                state.loading = false
                state.error= action.payload.message
            },
            [getPosts.pending]:(state)=>{
                state.loading = true
           },
            [getPosts.fulfilled]:(state,action)=>{
               state.loading = false
                state.posts = action.payload
           },
           [getPosts.rejected]:(state,action)=>{
               state.loading = false
               state.error= action.payload.message
           },
           [getPost.pending]:(state)=>{
            state.loading = true
       },
       [getPost.fulfilled]:(state,action)=>{
           state.loading = false
            state.posts = action.payload
       },
       [getPost.rejected]:(state,action)=>{
           state.loading = false
           state.error= action.payload.message
       },
       [getPostByUser.pending]:(state)=>{
        state.loading = true
   },
   [getPostByUser.fulfilled]:(state,action)=>{
       state.loading = false
        state.userPosts = action.payload
   },
   [getPostByUser.rejected]:(state,action)=>{
       state.loading = false
       state.error= action.payload.message
   },
   [getPostByGoogleUser.pending]:(state)=>{
    state.loading = true
},
[getPostByGoogleUser.fulfilled]:(state,action)=>{
   state.loading = false
    state.userPosts = action.payload
},
[getPostByGoogleUser.rejected]:(state,action)=>{
   state.loading = false
   state.error= action.payload.message
},
       [getPostBySearch.pending]:(state)=>{
        state.loading = true
   },
   [getPostBySearch.fulfilled]:(state,action)=>{
       state.loading = false
        state.posts = action.payload.data
   },
   [getPostBySearch.rejected]:(state,action)=>{
       state.loading = false
       state.error= action.payload.message
   },

   [getPostByTag.pending]:(state)=>{
    state.loading = true
},
[getPostByTag.fulfilled]:(state,action)=>{
   state.loading = false
    state.tagTours = action.payload.data
},
[getPostByTag.rejected]:(state,action)=>{
   state.loading = false
   state.error= action.payload.message
},

           [deletePost.pending]:(state)=>{
            state.loading = true
       },
       [deletePost.fulfilled]:(state,action)=>{
        const {
            arg: { id },
          } = action.meta;
           state.loading = false
           state.posts = state.posts.filter((post) => post["_id"] !== id)
        },
       [deletePost.rejected]:(state,action)=>{
           state.loading = false
           state.error= action.payload.message
       },
       [likePost.pending]:(state)=>{
        state.loading = true
   },
   [likePost.fulfilled]:(state,action)=>{
       state.loading = false
       state.posts = state.posts.map((post)=>post["_id"] ===action.payload._id ? action.payload : post)  
    },
   [likePost.rejected]:(state,action)=>{
       state.loading = false
       state.error= action.payload.message
   },
   [commentPost.pending]:(state)=>{
    state.loading = true
},
[commentPost.fulfilled]:(state,action)=>{
   state.loading = false
   state.posts = state.posts.filter((post)=>post["_id"] !==action.payload["_id"] )  
},
[commentPost.rejected]:(state,action)=>{
   state.loading = false
   state.error= action.payload.message
},
   [updatePost.pending]:(state)=>{
    state.loading = true
},
[updatePost.fulfilled]:(state,action)=>{
    
   state.loading = false
   state.posts = state.posts.map((post) => post["_id"] === action.payload._id ? action.payload : post)
},
[updatePost.rejected]:(state,action)=>{
   state.loading = false
   state.error= action.payload.message
},
    }
})
export default postSlice.reducer