"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';

const MentorChatPage = () => {
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (id) {
            fetchMessages(id);
        }
    }, [id]);

    const fetchMessages = async (projectId) => {
        const q = query(collection(db, "projects", projectId, "chat"), orderBy("createdAt", "asc"));
        const querySnapshot = await getDocs(q);
        const messagesArray = querySnapshot.docs.map(doc => ({
            id: doc.id, 
            ...doc.data(), 
            createdAt: doc.data().createdAt?.toDate() 
        }));
        setMessages(messagesArray);
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() === '' || !currentUser) return;
        const chatRef = collection(db, "projects", id, "chat");
        await addDoc(chatRef, {
            message: newMessage,
            username: currentUser.displayName,
            userRole: 'mentor',
            createdAt: serverTimestamp()
        });
        setNewMessage('');
        fetchMessages(id);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Chat</h1>
            <div className="chat-box mb-4 bg-white p-4 rounded-lg shadow-lg h-96 overflow-y-scroll">
                {messages.map(msg => (
                    <div 
                        key={msg.id} 
                        className={`chat-message p-2 my-2 rounded-md max-w-xs ${msg.username === currentUser.displayName ? 'ml-auto bg-blue-100 text-right' : 'mr-auto bg-gray-100 text-left'}`}
                    >
                        <p className="font-semibold">
                            {msg.username} {msg.userRole === 'mentor' ? '(Mentor)' : ''}
                            <span className="text-gray-500 text-sm ml-2">{msg.createdAt ? formatDistanceToNow(msg.createdAt) + ' ago' : 'Just now'}</span>
                        </p>
                        <p>{msg.message}</p>
                    </div>
                ))}
            </div>
            <div className="input-group flex">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="input input-bordered w-full p-2 rounded-l-md"
                />
                <button onClick={handleSendMessage} className="btn btn-primary rounded-r-md">Send</button>
            </div>
        </div>
    );
};

export default MentorChatPage;
