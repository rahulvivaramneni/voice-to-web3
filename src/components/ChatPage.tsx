import React, { useState, useEffect, useRef } from "react";
import { ChatControls } from "./ChatControls";
import { ChatMessage } from "./ChatMessage";
import { Confetti } from "./Confetti";
import { QuickActions } from "./QuickActions";
import { generateUUID } from "../utils/uuid";
import { speakResponse } from "../utils/speech";

const API_URL = "https://onchain-agent-demo-backend.replit.app";

export function ChatPage() {
  const [messages, setMessages] = useState<
    Array<{ text: string; isUser: boolean }>
  >([]);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(
    typeof window !== "undefined" &&
      /Mobi|Android/i.test(window.navigator.userAgent)
  );
  const [isTypingMode, setIsTypingMode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [conversationId] = useState(generateUUID());
  const recognition = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      recognition.current = new (window as any).webkitSpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;

      recognition.current.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        handleUserInput(text);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isMuted || isListening) {
      window.speechSynthesis.cancel();
    }
  }, [isMuted, isListening]);

  const handleUserInput = async (input: string) => {
    const projectId = "eeaa2500-ba9b-4ffd-9fdb-70635b7da166";

    const link = `https://pay.coinbase.com/buy/select-asset?appId=${projectId}&destinationWallets=[{"address":"0x3C9df7A3aa2565F6C891758638FDEeC36fd7D29a","blockchains":["ethereum"]}]&defaultAsset=ETH&defaultPaymentMethod=CARD&fiatCurrency=USD&presetFiatAmount=10&quoteId=ae77980c-f656-4c69-b380-cb5cf99276a9`;

    setMessages((prev) => [...prev, { text: input, isUser: true }]);
    setIsTypingMode(false);

    // Check if the input contains "on ramp USDC" or "buy USDC"
    if (/on ramp usdc|buy usdc|buy eth| buy eid| buy/i.test(input)) {
      const predefinedResponse = `You can buy it from here <a href=${link} target="_blank" class="text-blue-500 underline">this link</a>`;
      setMessages((prev) => [
        ...prev,
        { text: predefinedResponse, isUser: false },
      ]);
      await speakResponse(
        "You can buy it from here, check the link I sent.",
        isMuted,
        isListening
      );
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, conversation_id: conversationId }),
      });

      const reader = response.body?.getReader();
      let partialResponse = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = new TextDecoder().decode(value);
          const lines = (partialResponse + chunk).split("\n");
          partialResponse = lines.pop() || "";

          for (const line of lines) {
            if (line.trim()) {
              try {
                const parsed = JSON.parse(line);
                if (parsed.event === "agent" && parsed.data) {
                  setMessages((prev) => [
                    ...prev,
                    { text: parsed.data, isUser: false },
                  ]);
                  await speakResponse(parsed.data, isMuted, isListening);
                  if (parsed.data.toLowerCase().includes("congratulations")) {
                    setShowConfetti(true);
                    setTimeout(() => setShowConfetti(false), 3000);
                  }
                }
              } catch (e) {
                console.error("Error parsing JSON:", e);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.current?.stop();
    } else {
      setIsMuted(true);
      recognition.current?.start();
      setIsListening(true);
      setIsTypingMode(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    window.speechSynthesis.cancel();
  };

  const toggleTyping = () => {
    setIsTypingMode(!isTypingMode);
    if (isListening) {
      recognition.current?.stop();
    }
  };

  const handleQuickAction = (action: string) => {
    handleUserInput(action);
  };

  return (
    <div className="min-h-[calc(100vh-56px)] bg-gray-50 flex flex-col">
      <div className="flex-1 max-w-4xl w-full mx-auto overflow-y-auto">
        {messages.length === 0 ? (
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
              Quick Actions
            </h2>
            <QuickActions onActionSelect={handleQuickAction} />
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message.text}
                isUser={message.isUser}
              />
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatControls
        isListening={isListening}
        isMuted={isMuted}
        isTypingMode={isTypingMode}
        onToggleListening={toggleListening}
        onToggleMute={toggleMute}
        onToggleTyping={toggleTyping}
        onSendMessage={handleUserInput}
      />
      {showConfetti && <Confetti />}
    </div>
  );
}
