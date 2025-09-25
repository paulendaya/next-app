"use client";
import { useEffect } from "react";
import "@n8n/chat/style.css";
import { createChat } from "@n8n/chat";

const ChatBot = () => {
  useEffect(() => {
    createChat({
      webhookUrl:
        /* "https://paulendaya-boxon.app.n8n.cloud/webhook/5cd6b798-a8ee-43d8-a331-e952ac4f5868/chat", */
        "https://paulendaya-boxon.app.n8n.cloud/webhook/adce3535-31c0-4857-bc5e-66ba066b7863/chat",
      initialMessages: [
        "Hi there! 👋",
        "My name is PearlGuide and I'm your Bahrain Tourism helpful assistant. ",
        "Type your name to start.",
      ],
      i18n: {
        en: {
          title: "👋 I'm PearlGuide!",
          subtitle: "Start a chat. We're here to help you 24/7.",
          footer: "",
          getStarted: "New Conversation",
          inputPlaceholder: "Type your question..",
        },
      },
    });
  }, []);
  return <div></div>;
};

export default ChatBot;
