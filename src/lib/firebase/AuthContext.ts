'use client'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from './firebase'
import { useState, useEffect } from 'react'

const AuthContext = () => {
    const [user, setUser] = useState<User | null>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
    
        return unsubscribe;
      }, []);

    return { user, loading }
}

export default AuthContext