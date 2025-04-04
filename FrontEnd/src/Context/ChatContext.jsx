import axios from 'axios';
import {createContext, useContext, useEffect, useState} from 'react'
import { server } from '../main';
import toast from 'react-hot-toast';

const ChatContext = createContext();

export const ChatProvider = ({children}) => {
    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState("");
    const [newRequestLoading, setNewRequestLoading] = useState(false);
    const [selected, setSelected] = useState(null);
    const [chats, setChats] = useState([]);
    const [createLod, setCreateLod] = useState(false);
    const [Loading, setLoading] = useState(false);

    async function fetchResponse() {
        if(!prompt.trim()) return toast.error("Please enter a prompt");
        if(!selected) return toast.error("No chat selected");
        
        setNewRequestLoading(true);
        try {
            const response = await axios({
                url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyC0fC5z40Z_W04axVP8ZeGE-0xw71giHXc",
                method: "post",
                data: {
                    contents: [{parts: [{text: prompt}] }],
                }
            });

            const message = {
                question: prompt,
                answer: response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response",
            };

            setMessages(prev => [...prev, message]);
            setPrompt("");
            
            await axios.post(`${server}/api/chat/${selected}`, {
                question: prompt,
                answer: message.answer,
            }, {
                headers: {
                    token: localStorage.getItem("token"),
                }
            });
            
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setNewRequestLoading(false);
        }
    }

    async function fetchChats(){
        try {
            const {data} = await axios.get(`${server}/api/chat/all`, {
                headers: {
                    token: localStorage.getItem("token"),
                }
            });
    
            setChats(data);
            if(data.length > 0 && !selected) {
                setSelected(data[0]._id);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch chats");
        }
    }

    async function createChat() {
        setCreateLod(true);
        try {
            const {data} = await axios.post(`${server}/api/chat/new`, {}, {
                headers: {
                    token: localStorage.getItem("token"),
                }
            });
            await fetchChats();
            setSelected(data._id); // Select the newly created chat
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create chat");
        } finally {
            setCreateLod(false);
        }
    }

    async function fetchMessages(){
        if(!selected) return;
        
        setLoading(true);
        try {
            const {data} = await axios.get(`${server}/api/chat/${selected}`, {
                headers: {
                    token: localStorage.getItem("token"),
                }
            });
            setMessages(data);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch messages");
        } finally {
            setLoading(false);
        }
    }

    async function deleteChat(id){
        try {
            const {data} = await axios.delete(`${server}/api/chat/${id}`,{
                headers: {
                    token: localStorage.getItem("token"),
                }
            })
            toast.success(data.message);
            fetchChats();
            window.location.reload();
        } catch (error) {

            alert("Something went wrong")
        }
    }

    useEffect(() => {
        fetchChats();
    }, []);

    useEffect(() => {
        fetchMessages();
    }, [selected]);

    return (
        <ChatContext.Provider value={{
            fetchResponse, 
            messages, 
            prompt, 
            setPrompt, 
            newRequestLoading, 
            chats, 
            createChat, 
            createLod, 
            selected, 
            setSelected,
            Loading,
            deleteChat,
            fetchChats
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export const ChatData = () => useContext(ChatContext);

// import axios from 'axios';
// import {createContext, useContext, useEffect, useState} from 'react'
// import { server } from '../main';
// import toast from 'react-hot-toast';

// const ChatContext = createContext();

// export const ChatProvider = ({children}) => {
//     const [messages, setMessages] = useState([]);
//     const [prompt, setPrompt] = useState("");
//     const [newRequestLoading, setNewRequestLoading] = useState(false);

//     async function fetchResponse() {
//         if(prompt === "") return alert("Write prompt");
//         setNewRequestLoading(true)
//         setPrompt("");
//         try {
//             console.log(prompt);
//             const response = await axios(
//             {
//                 url:"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyC0fC5z40Z_W04axVP8ZeGE-0xw71giHXc",
//                 method: "post",
//                 data:{
//                     contents: [{parts: [{text: prompt}] }],
//                 }
//             });


//             const message = {
//                 question: prompt,
//                 answer: response["data"]["candidates"][0]["content"]["parts"][0]["text"],
//             }

//             setMessages((prev) => [...prev, message]);
//             setNewRequestLoading(false);

//             const {data} = axios.post(`${server}/api/chat/${selected}`,{
//                 question: prompt,
//                 answer: response["data"]["candidates"][0]["content"]["parts"][0]["text"],
 
//             })
//         } catch (error) {
//             alert(error);
//             // console.log(error.message);
//             setNewRequestLoading(false);
//         }
//     }

//     const [selected, setSelected] = useState(null);

//     const [chats, setChats] = useState([]);

//     async function fetchChats(){
//         try {
//             const {data} = await axios.get(`${server}/api/chat/all`,{
//                 headers: {
//                     token: localStorage.getItem("token"),
//                 }
//             });
    
//             setChats(data);
//             setSelected(data[0]._id);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const [createLod, setCreateLod] = useState(false);
//     async function createChat() {
//         setCreateLod(true);
//         try {
//             const {data} = await axios.post(`${server}/api/chat/new`,{},
//                 {
//                     headers: {
//                         token: localStorage.getItem("token"),
//                     }
//                 }
//             )
//             fetchChats();
//             setCreateLod(false);
//         } catch (error) {
//             toast.error("Something went wrong !")
//             setCreateLod(false);
//         }
//     }

//     const [Loading, setLoading]  = useState(false);

//     async function fetchMessages(){
//         setLoading(true);
//         setLoading(true);
//         try{
//             const {data} = await axios.get(`${server}/api/chat/${selected}`,
//                 {
//                     headers:{
//                         token: localStorage.getItem("token"),
//                     }
//                 }
//             )
//             setMessages(data);
//             setLoading(false);
//         }catch(error){
//             console.log(error);
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         fetchChats();
//     }, [])

//     useEffect(() => {
//         fetchMessages();
//     }, [selected])

//     return (
//         <ChatContext.Provider value = {{fetchResponse, messages, prompt, setPrompt, newRequestLoading, chats, 
//         createChat, createLod, selected, setSelected,Loading, setLoading, }}>
//             {children}
//         </ChatContext.Provider>
//     )
// }


// export const ChatData = () => useContext(ChatContext)

