'use client'
import React, { useEffect, useState } from 'react'
import { auth } from '@/lib/firebase/firebase'
import AuthContext from '@/lib/firebase/AuthContext'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
    const { user } = AuthContext()
    const router = useRouter()

    const [newUser, setNewUser] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }
        
        try{
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (err: any){
            setError(err.message || "Problem occured during signup")
        } finally {
            setLoading(false)
        }
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        
        try{
            await signInWithEmailAndPassword(auth, email, password)
        } catch (err: any){
            setError(err.message || "Problem occured during signup")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setError("")
    },[newUser])

    useEffect(() => {
        if(user)
            router.push('/')
    },[user])

    return(
        <div className='w-[99%] mx-auto bg-amber-50 p-4 py-12'>
            <div className='md:w-lg mx-auto bg-white p-4 rounded shadow-md'>
                {newUser? (
                    <div>
                        <h1 className='text-4xl font-bold text-center'>Create Account</h1>
                        <form className='flex flex-col gap-4 mt-4'>
                            <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='border border-gray-300 p-2 rounded' />
                            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='border border-gray-300 p-2 rounded' />
                            <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='border border-gray-300 p-2 rounded' />
                            {error && <p className='text-red-500'>{error}</p>}
                            <button onClick={(e) => handleSignUp(e)} className='bg-nepBlue text-white p-2 rounded'>
                                {loading?
                                    <div className='w-6 h-6 mx-auto border-x-2 rounded-full border-x-white animate-spin'></div>
                                :
                                    <>
                                        Create Account
                                    </>
                                } 
                            </button>
                        </form>
                        <p className='text-center mt-4'>Already have an account? <span className='text-nepBlue cursor-pointer' onClick={() => setNewUser(false)}>Login</span></p>
                    </div>
                ):(
                    <div>
                        <h1 className='text-4xl font-bold text-center'>Login</h1>
                        <form className='flex flex-col gap-4 mt-4'>
                            <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='border border-gray-300 p-2 rounded' />
                            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='border border-gray-300 p-2 rounded' />
                            {error && <p className='text-red-500'>{error}</p>}
                            <button onClick={(e) => handleLogin(e)} className='bg-nepBlue text-white p-2 rounded'>
                                {loading?
                                    <div className='w-6 h-6 mx-auto border-x-2 rounded-full border-x-white animate-spin'></div>
                                :
                                    <>
                                        Login
                                    </>
                                }
                            </button>
                        </form>
                        <p className='text-center mt-4'>Don't have an account? <span className='text-nepBlue cursor-pointer' onClick={() => setNewUser(true)}>Create Account</span></p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LoginPage