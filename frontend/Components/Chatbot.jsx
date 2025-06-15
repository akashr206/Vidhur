"use client"
import React, { useState, useRef, useEffect, use } from 'react';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getConfig } from '@/lib/getConfig';

const AIChatbox = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState('disconnected');
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
     
    const { baseURl, workspaceSlug, API_KEY } = use(getConfig());

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const streamMessage = async (userMessage) => {
        try {
            setConnectionStatus('connecting');
            setIsStreaming(true);

            const response = await fetch(`${baseURl}/workspace/${workspaceSlug}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
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
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            // Add assistant message placeholder
            const assistantMessageId = Date.now() + 1;
            setMessages(prev => [...prev, {
                id: assistantMessageId,
                role: 'assistant',
                content: '',
                timestamp: new Date().toISOString(),
                isStreaming: true
            }]);

            let accumulatedContent = '';

            while (true) {
                const { done, value } = await reader.read();

                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));

                            if (data.type === 'textResponseChunk') {
                                accumulatedContent += data.textResponse;

                                // Update the streaming message
                                setMessages(prev => prev.map(msg =>
                                    msg.id === assistantMessageId
                                        ? { ...msg, content: accumulatedContent }
                                        : msg
                                ));
                            }
                        } catch (e) {
                            // Handle non-JSON lines
                            accumulatedContent += line;
                            setMessages(prev => prev.map(msg =>
                                msg.id === assistantMessageId
                                    ? { ...msg, content: accumulatedContent }
                                    : msg
                            ));
                        }
                    }
                }
            }

            // Mark streaming as complete
            setMessages(prev => prev.map(msg =>
                msg.id === assistantMessageId
                    ? { ...msg, isStreaming: false }
                    : msg
            ));

        } catch (error) {
            console.error('Streaming error:', error);
            setConnectionStatus('error');

            // Add error message
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                role: 'assistant',
                content: 'Sorry, I encountered an error while processing your message. Please check your AnythingLLM configuration and try again.',
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
            {/* Floating Chat Button */}
            <Button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
                size="icon"
            >
                <MessageCircle className="w-6 h-6" />
            </Button>

            {/* Chat Dialog */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-lg h-[600px] flex flex-col animate-in fade-in-0 zoom-in-95 duration-300">
                        <CardHeader className="border-b bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                        <Bot className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">AI Assistant</CardTitle>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
                                            <span className="text-xs opacity-90">{getStatusText()}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(false)}
                                    className="text-white hover:bg-white/20 h-8 w-8"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardHeader>

                        <CardContent className="flex-1 p-0 flex flex-col">
                            <ScrollArea className="flex-1 p-4">
                                {messages.length === 0 ? (
                                    <div className="text-center text-gray-500 mt-8">
                                        <Bot className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                        <p className="text-lg font-medium mb-2">Start a conversation</p>
                                        <p className="text-sm">Ask me anything, and I'll help you out!</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {messages.map((message) => (
                                            <div
                                                key={message.id}
                                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div className={`flex items-start space-x-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'user'
                                                        ? 'bg-purple-600 text-white'
                                                        : 'bg-gray-100 text-gray-600'
                                                        }`}>
                                                        {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                                    </div>
                                                    <div className={`rounded-2xl px-4 py-2 ${message.role === 'user'
                                                        ? 'bg-purple-600 text-white'
                                                        : message.isError
                                                            ? 'bg-red-50 text-red-800 border border-red-200'
                                                            : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                                        {message.isStreaming && (
                                                            <div className="flex items-center space-x-1 mt-2">
                                                                <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
                                                                <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-100" />
                                                                <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-200" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </ScrollArea>

                            <div className="border-t p-4 bg-gray-50">
                                <div className="flex space-x-2">
                                    <Input
                                        ref={inputRef}
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Type your message..."
                                        disabled={isStreaming}
                                        className="flex-1"
                                    />
                                    <Button
                                        onClick={handleSendMessage}
                                        disabled={!inputValue.trim() || isStreaming}
                                        className="bg-purple-600 hover:bg-purple-700"
                                        size="icon"
                                    >
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                                {isStreaming && (
                                    <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
                                        <span>AI is typing...</span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    );
};

export default AIChatbox;