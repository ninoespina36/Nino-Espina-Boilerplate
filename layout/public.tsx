import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login, logout } from '../store/reducers/authReducer';

interface Props {
    children: JSX.Element
}

const PublicLayout = ({ children }: Props) =>{

    const { isAuthenticated } = useAppSelector(state => state.auth);
    const [ loading, setLoading ] = useState<string>('');
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogin = () =>{
        const user = {
            name: 'John',
            id: '129032948924',
            email: 'john@email.com',
            token: '1340920490424-token'
        }
        setLoading('Logging in...');
        setTimeout(()=>{
            dispatch(login(user));
            router.replace('/dashboard');
            setLoading('');
        }, 3000)
    }

    const handleLogout = () =>{
        setLoading('Logging out...');
        setTimeout(()=>{
            dispatch(logout());
            router.replace('/dashboard');
            setLoading('');
        }, 3000)
    }

    return (
        <div className="min-h-screen flex flex-col">

            {/* Public Header */}
            <header className="border-b">
                <div className="container mx-auto flex justify-between p-5 items-center">
                    <Link href="/"><a><h1><b>Nino Espina</b> Boilerplate</h1></a></Link>
                    <button
                        className={`btn no-animation ${loading && 'loading'}`} 
                        onClick={()=> isAuthenticated ? handleLogout() : handleLogin()}
                        disabled={!!loading}
                    >
                        {loading ? loading : isAuthenticated ?  'Log out' : 'Log in'}
                    </button>
                </div>
            </header>

            {/* Body */}
            <div className="flex-grow">
                {children}
            </div>

            {/* Footer */}
            <footer>
                <div className="container mx-auto p-5">
                    <p className="text-sm">&copy; All rights reserved {new Date().getFullYear()}</p>
                </div>
            </footer>
        </div>
    )
}

export default PublicLayout;