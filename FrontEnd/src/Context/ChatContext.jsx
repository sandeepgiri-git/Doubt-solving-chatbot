import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";
import toast from "react-hot-toast";
// import { useUserData } from "./UserContext";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [newRequestLoading, setNewRequestLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [chats, setChats] = useState([]);
  const [createLod, setCreateLod] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  //   const { isAuth } = useUserData();

  async function fetchResponse() {
    if (!prompt.trim()) return toast.error("Please enter a prompt");
    if (!selected) return toast.error("No chat selected");

    // Store the prompt in a constant so we can clear the input field immediately
    const userQuestion = prompt;
    setPrompt(""); // Clear input field immediately for better UX

    // Step 1: Add the user's question to the UI immediately
    // We leave 'answer' as an empty string or null for now
    const temporaryMessage = {
      question: userQuestion,
      answer: null,
    };
    setMessages((prev) => [...prev, temporaryMessage]);
    setNewRequestLoading(true); // Show the "Thinking..." indicator

    try {
      // Step 2: GROQ API call
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: userQuestion }],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiAnswer =
        response.data?.choices?.[0]?.message?.content || "No response";

      // Step 3: Update the last message in the list with the AI's answer
      setMessages((prev) => {
        const updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1].answer = aiAnswer;
        return updatedMessages;
      });

      setFetched(true); // Trigger Typewriter
      setNewRequestLoading(false); // Hide "Thinking..."

      // Step 4: Backend API call to save
      await axios.post(
        `${server}/api/chat/${selected}`,
        { question: userQuestion, answer: aiAnswer },
        { headers: { token: localStorage.getItem("token") } }
      );
    } catch (error) {
      // Remove the empty message if the API fails so the UI stays clean
      setMessages((prev) => prev.slice(0, -1));
      toast.error(
        error.response?.data?.error?.message || "Something went wrong"
      );
    } finally {
      setNewRequestLoading(false);
    }
  }
  // async function fetchResponse() {
  //   if (!prompt.trim()) return toast.error("Please enter a prompt");
  //   if (!selected) return toast.error("No chat selected");

  //   setNewRequestLoading(true);

  //   try {
  //     // 1. Artificial delay (optional)
  //   //   await new Promise((resolve) => setTimeout(resolve, 1000));

  //     // 2. GROQ API call
  //     const response = await axios.post(
  //       "https://api.groq.com/openai/v1/chat/completions",
  //       {
  //         model: "llama-3.3-70b-versatile",
  //       //   model: "llama3-70b-8192",
  //         messages: [
  //           {
  //             role: "user",
  //             content: prompt,
  //           },
  //         ],
  //         temperature: 0.7,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     const message = {
  //       question: prompt,
  //       answer: response.data?.choices?.[0]?.message?.content || "No response",
  //     };

  //     // 3. Optional delay
  //   //   await new Promise((resolve) => setTimeout(resolve, 500));

  //     // 4. Add message first while still loading to trigger typewriter
  //     setFetched(true);
  //     setNewRequestLoading(false);
  //     setMessages((prev) => [...prev, message]);
  //     setPrompt("");

  //     // 5. Backend API call
  //     await axios.post(
  //       `${server}/api/chat/${selected}`,
  //       {
  //         question: prompt,
  //         answer: message.answer,
  //       },
  //       {
  //         headers: {
  //           token: localStorage.getItem("token"),
  //         },
  //       }
  //     );

  //     // 6. Then stop loading
  //   } catch (error) {
  //     if (error.response?.status === 429) {
  //       toast.error("Too many requests. Please wait a moment.");
  //     } else {
  //       toast.error(
  //         error.response?.data?.error?.message || "Something went wrong"
  //       );
  //     }
  //   } finally {
  //     setNewRequestLoading(false);
  //   }
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
        fetched,
        setFetched,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatData = () => useContext(ChatContext);
