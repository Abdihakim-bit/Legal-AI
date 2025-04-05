import { create } from "zustand";

const isValidMessage = (message) => {
    return (
      typeof message === "object" &&
      message !== null &&
      ["user", "ai"].includes(message.sender) &&  // Check sender
      typeof message.text === "string" &&         // Check message content
      typeof message.timestamp === "string"      // Check timestamp format
    );
  };

const useMessageStore = create((set) => {
    const storedMessages = JSON.parse(sessionStorage.getItem("messages")) || [];

    return {
        messages: storedMessages,
        addMessage: (message) => {
            if (!isValidMessage(message)) {
                console.error("Invalid message structure:", message);
                return;
            }
            set((state) => {
                const newMessages = [...state.messages, message];
                sessionStorage.setItem("messages", JSON.stringify(newMessages));
                return { messages : newMessages};
            });
        },
        resetSession: () => {
            set(() => {
                sessionStorage.removeItem("messages");
                return { messages: [] };
            });
        }
    };
});

export default useMessageStore;
