"use client"
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Sparkles } from 'lucide-react';
import { nanoid } from 'nanoid';

const AIChatbox = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState('disconnected');
    const [loading, setLoading] = useState(false);
    const [selectedText, setSelectedText] = useState('');
    const [selectionPosition, setSelectionPosition] = useState({ x: 0, y: 0 });
    const [showAskButton, setShowAskButton] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const askButtonRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        setSessionId(nanoid(18));

        return () => {
            setSessionId(null);
        }
    }, [])

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Text selection handlers
    useEffect(() => {
        const handleSelection = () => {
            const selection = window.getSelection();
            const text = selection.toString().trim();
            
            if (text && text.length > 0) {
                const range = selection.getRangeAt(0);
                const rect = range.getBoundingClientRect();
                
                setSelectedText(text + "\n\n help we with this thing.");
                setSelectionPosition({
                    x: rect.left + rect.width / 2,
                    y: rect.top - 10
                });
                setShowAskButton(true);
            } else {
                setShowAskButton(false);
                setSelectedText('');
            }
        };

        const handleClickOutside = (event) => {
            if (askButtonRef.current && !askButtonRef.current.contains(event.target)) {
                const selection = window.getSelection();
                if (!selection.toString().trim()) {
                    setShowAskButton(false);
                    setSelectedText('');
                }
            }
        };

        document.addEventListener('mouseup', handleSelection);
        document.addEventListener('selectionchange', handleSelection);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mouseup', handleSelection);
            document.removeEventListener('selectionchange', handleSelection);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleAskAI = () => {
        setInputValue(selectedText);
        setIsOpen(true);
        setShowAskButton(false);
        
        // Clear the selection
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
        
        // Focus input after a short delay to ensure the modal is rendered
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
                inputRef.current.setSelectionRange(selectedText.length, selectedText.length);
            }
        }, 100);
    };

    const fetchConfig = async () => {
        setLoading(true);
        try {
            const configData = await fetch('/api/config');
            const configJson = await configData.json();
            console.log('Configuration fetched:', configJson);
            return configJson;
        } catch (error) {
            console.error('Error fetching configuration:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const streamMessage = async (userMessage) => {
        try {
            setConnectionStatus('connecting');
            setIsStreaming(true);

            const { baseURl, workspaceSlug, API_KEY } = await fetchConfig();
            const url = `${baseURl}/workspace/${workspaceSlug}/chat`;
            console.log('Streaming to URL:', url);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                    'Accept': 'text/event-stream',
                },
                body: JSON.stringify({
                    message: userMessage,
                    mode: 'chat',
                    sessionId: `session-${Date.now()}`,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setConnectionStatus('connected');

            // Create assistant message
            const assistantMessageId = Date.now() + 1;
            setMessages(prev => [...prev, {
                id: assistantMessageId,
                role: 'assistant',
                content: '',
                timestamp: new Date().toISOString(),
                isStreaming: true
            }]);

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            let accumulatedContent = '';

            while (true) {
                const { done, value } = await reader.read();

                if (done) break;

                // Decode the chunk and add to buffer
                buffer += decoder.decode(value, { stream: true });

                // Try to parse complete JSON objects
                let startIndex = 0;
                let braceCount = 0;
                let inString = false;
                let escaped = false;

                for (let i = 0; i < buffer.length; i++) {
                    const char = buffer[i];

                    if (escaped) {
                        escaped = false;
                        continue;
                    }

                    if (char === '\\' && inString) {
                        escaped = true;
                        continue;
                    }

                    if (char === '"') {
                        inString = !inString;
                        continue;
                    }

                    if (!inString) {
                        if (char === '{') {
                            braceCount++;
                        } else if (char === '}') {
                            braceCount--;

                            if (braceCount === 0) {
                                // Found complete JSON object
                                const jsonStr = buffer.slice(startIndex, i + 1);

                                try {
                                    const data = JSON.parse(jsonStr);
                                    console.log('Parsed JSON data:', data);

                                    // Handle AnythingLLM response format
                                    if (data.type === 'textResponse' && data.textResponse) {
                                        // Complete response
                                        accumulatedContent = data.textResponse;
                                        setMessages(prev => prev.map(msg =>
                                            msg.id === assistantMessageId
                                                ? { ...msg, content: accumulatedContent, isStreaming: false }
                                                : msg
                                        ));
                                        return; // Exit streaming loop
                                    } else if (data.type === 'textResponseChunk' && data.textResponse) {
                                        // Streaming chunk
                                        accumulatedContent += data.textResponse;
                                        setMessages(prev => prev.map(msg =>
                                            msg.id === assistantMessageId
                                                ? { ...msg, content: accumulatedContent }
                                                : msg
                                        ));
                                    } else if (data.choices && data.choices[0] && data.choices[0].delta) {
                                        // Handle OpenAI-style streaming
                                        const deltaContent = data.choices[0].delta.content;
                                        if (deltaContent) {
                                            accumulatedContent += deltaContent;
                                            setMessages(prev => prev.map(msg =>
                                                msg.id === assistantMessageId
                                                    ? { ...msg, content: accumulatedContent }
                                                    : msg
                                            ));
                                        }
                                    }

                                } catch (parseError) {
                                    console.warn('Failed to parse JSON:', jsonStr, parseError);
                                }

                                // Move to next potential JSON object
                                startIndex = i + 1;
                                braceCount = 0;
                            }
                        }
                    }
                }

                // Keep remaining incomplete data in buffer
                if (startIndex > 0) {
                    buffer = buffer.slice(startIndex);
                }
            }

            // Try to parse any remaining buffer content
            if (buffer.trim()) {
                try {
                    const data = JSON.parse(buffer.trim());
                    console.log('Final buffer parse:', data);

                    if (data.type === 'textResponse' && data.textResponse) {
                        accumulatedContent = data.textResponse;
                        setMessages(prev => prev.map(msg =>
                            msg.id === assistantMessageId
                                ? { ...msg, content: accumulatedContent }
                                : msg
                        ));
                    }
                } catch (parseError) {
                    console.warn('Failed to parse remaining buffer:', buffer, parseError);
                    // Treat as plain text if JSON parsing fails
                    if (buffer.trim() && !accumulatedContent) {
                        accumulatedContent = buffer.trim();
                        setMessages(prev => prev.map(msg =>
                            msg.id === assistantMessageId
                                ? { ...msg, content: accumulatedContent }
                                : msg
                        ));
                    }
                }
            }

            setMessages(prev => prev.map(msg =>
                msg.id === assistantMessageId
                    ? { ...msg, isStreaming: false }
                    : msg
            ));

        } catch (error) {
            console.error('Streaming error:', error);
            setConnectionStatus('error');

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                role: 'assistant',
                content: `Sorry, I encountered an error while processing your message: ${error.message}. Please check your AnythingLLM configuration and try again.`,
                timestamp: new Date().toISOString(),
                isError: true
            }]);
        } finally {
            setIsStreaming(false);
        }
    };

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isStreaming) return;

        const userMessage = {
            id: Date.now(),
            role: 'user',
            content: inputValue.trim(),
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');

        await streamMessage(userMessage.content);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const getStatusColor = () => {
        switch (connectionStatus) {
            case 'connected': return 'bg-green-500';
            case 'connecting': return 'bg-yellow-500';
            case 'error': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    const getStatusText = () => {
        switch (connectionStatus) {
            case 'connected': return 'Connected';
            case 'connecting': return 'Connecting...';
            case 'error': return 'Connection Error';
            default: return 'Disconnected';
        }
    };

    return (
        <>
            {children}
            
            {/* Ask AI Button for selected text */}
            {showAskButton && (
                <div
                    ref={askButtonRef}
                    className="fixed z-[60] transform -translate-x-1/2 -translate-y-full"
                    style={{
                        // Position the Ask AI button near the selected text
                        left: `${Math.min(Math.max(selectionPosition.x, 80), window.innerWidth - 80)}px`,
                        top: `${Math.max(selectionPosition.y, 60)}px`,
                    }}
                >
                    <button
                        onClick={handleAskAI}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 text-sm font-medium animate-in fade-in-0 zoom-in-95 duration-200"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span>Ask AI</span>
                    </button>
                    {/* Arrow pointing down */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-full">
                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-purple-600"></div>
                    </div>
                </div>
            )}

            {/* Floating Chat Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center"
            >
                <MessageCircle className="w-6 h-6" />
            </button>

            {/* Chat Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="w-full max-w-lg h-[600px] bg-white rounded-lg shadow-xl flex flex-col animate-in fade-in-0 zoom-in-95 duration-300">
                        {/* Modal Header */}
                        <div className="border-b rounded-t-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                        <Bot className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">AI Assistant</h3>
                                        <div className="flex items-center space-x-2 mt-1">
                                            {/* Connection status indicator */}
                                            <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
                                            <span className="text-xs opacity-90">{getStatusText()}</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Close Modal Button */}
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white hover:bg-white/20 h-8 w-8 rounded-full flex items-center justify-center transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col">
                            {/* Chat Messages Area */}
                            <div className="flex-1 p-4 h-[512px]">
                                {messages.length === 0 ? (
                                    // Empty state
                                    <div className="text-center text-gray-500 mt-8">
                                        <Bot className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                        <p className="text-lg font-medium mb-2">Start a conversation</p>
                                        <p className="text-sm">Ask me anything, and I'll help you out!</p>
                                        <p className="text-xs mt-2 text-gray-400">💡 Tip: Select any text on the page to ask AI about it</p>
                                    </div>
                                ) : (
                                    // Render chat messages
                                    <div className="space-y-4 h-[480px] overflow-y-scroll">
                                        {messages.map((message) => (
                                            <div
                                                key={message.id}
                                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div className={`flex items-start space-x-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                                    {/* Avatar */}
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'user'
                                                        ? 'bg-purple-600 text-white'
                                                        : 'bg-gray-100 text-gray-600'
                                                        }`}>
                                                        {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                                    </div>
                                                    {/* Message Bubble */}
                                                    <div className={`rounded-2xl px-4 py-2 ${message.role === 'user'
                                                        ? 'bg-purple-600 text-white'
                                                        : message.isError
                                                            ? 'bg-red-50 text-red-800 border border-red-200'
                                                            : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                                        {/* Streaming typing indicator */}
                                                        {message.isStreaming && (
                                                            <div className="flex items-center space-x-1 mt-2">
                                                                <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
                                                                <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
                                                                <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {/* Dummy div for scroll-to-bottom */}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="border-t p-4 bg-gray-50">
                                <div className="flex space-x-2">
                                    <input
                                        ref={inputRef}
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Type your message..."
                                        disabled={isStreaming}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!inputValue.trim() || isStreaming}
                                        className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                                {/* Typing indicator */}
                                {isStreaming && (
                                    <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
                                        <span>AI is typing...</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AIChatbox;