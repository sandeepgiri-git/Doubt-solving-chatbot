import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";
import toast from "react-hot-toast";
import { useUserData } from "./UserContext";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [newRequestLoading, setNewRequestLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [chats, setChats] = useState([]);
  const [createLod, setCreateLod] = useState(false);
  const [Loading, setLoading] = useState(false);
  const { isAuth } = useUserData();

  async function fetchResponse() {
    if (!prompt.trim()) return toast.error("Please enter a prompt");
    if (!selected) return toast.error("No chat selected");

    setNewRequestLoading(true);

    try {
      // 1. Artificial delay (optional)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 2. GROQ API call
      console.log(import.meta.env.VITE_GROQ_API_KEY)
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama-3.3-70b-versatile",
        //   model: "llama3-70b-8192",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const message = {
        question: prompt,
        answer: response.data?.choices?.[0]?.message?.content || "No response",
      };

    //   console.log(message);

      setMessages((prev) => [...prev, message]);
      setPrompt("");

      // 3. Optional delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 4. Backend API call
      await axios.post(
        `${server}/api/chat/${selected}`,
        {
          question: prompt,
          answer: message.answer,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error("Too many requests. Please wait a moment.");
      } else {
        toast.error(
          error.response?.data?.error?.message || "Something went wrong"
        );
      }
    } finally {
      setNewRequestLoading(false);
    }
  }

  // async function fetchResponse() {
  //     if(!prompt.trim()) return toast.error("Please enter a prompt");
  //     if(!selected) return toast.error("No chat selected");

  //     setNewRequestLoading(true);
  //     try {
  //         // 1. Add artificial delay to prevent rate limiting
  //         await new Promise(resolve => setTimeout(resolve, 1000));

  //         // 2. Gemini API call
  //         const response = await axios({
  //             url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAg0HLWsyUs9V0dqmTDE_j8eeVnQMJVLRs",
  //             method: "post",
  //             data: {
  //                 contents: [{parts: [{text: prompt}] }],
  //             }
  //         });

  //         const message = {
  //             question: prompt,
  //             answer: response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response",
  //         };

  //         setMessages(prev => [...prev, message]);
  //         setPrompt("");

  //         // 3. Optional: Add delay before backend call
  //         await new Promise(resolve => setTimeout(resolve, 500));

  //         // 4. Backend API call
  //         await axios.post(`${server}/api/chat/${selected}`, {
  //             question: prompt,
  //             answer: message.answer,
  //         }, {
  //             headers: {
  //                 token: localStorage.getItem("token"),
  //             }
  //         });

  //     } catch (error) {
  //         if (error.response?.status === 429) {
  //             toast.error("Too many requests. Please wait a moment before trying again.");
  //         } else {
  //             toast.error(error.response?.data?.message || "Something went wrong");
  //         }
  //     } finally {
  //         setNewRequestLoading(false);
  //     }
  // }

  async function fetchChats() {
    if (!localStorage.getItem("token")) {
      return;
    }
    try {
      const { data } = await axios.get(`${server}/api/chat/all`, {
        headers: {
          token: localStorage.getItem("token") || null,
        },
      });

      setChats(data);
      if (data.length > 0 && !selected) {
        setSelected(data[0]._id);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch chats");
    }
  }

  async function createChat() {
    setCreateLod(true);
    try {
      const { data } = await axios.post(
        `${server}/api/chat/new`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      await fetchChats();
      setSelected(data._id); // Select the newly created chat
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create chat");
    } finally {
      setCreateLod(false);
    }
  }

  async function fetchMessages() {
    if (!selected) return;

    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/chat/${selected}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setMessages(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  }

  async function deleteChat(id) {
    try {
      const { data } = await axios.delete(`${server}/api/chat/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      toast.success(data.message);
      fetchChats();
      window.location.reload();
    } catch (error) {
      alert("Something went wrong");
    }
  }

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [selected]);

  return (
    <ChatContext.Provider
      value={{
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
        fetchChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatData = () => useContext(ChatContext);
