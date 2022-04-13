import { useState } from 'react';
import { useRouter } from "next/router";
import Link from 'next/link';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/reducers/authReducer';

interface Props {
    children: JSX.Element
}

const PrivateLayout = ({ children }: Props) =>{

    const router = useRouter();
    const { isAuthenticated } = useAppSelector(state => state.auth);
    const [ loading, setLoading ] = useState<string>('');
    const dispatch = useAppDispatch();

    if (!isAuthenticated) {
        router.replace("/");
        return null;
    }

    const handleLogout = () =>{
        setLoading('Logging out...');
        setTimeout(()=>{
            dispatch(logout());
            router.replace('/');
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
                        onClick={handleLogout}
                        disabled={!!loading}
                    >
                        {loading ? loading : 'Logout'}
                    </button>
                </div>
            </header>

            {/* Body */}
            <div className="flex-grow">
                {children}
            </div>

            {/* Footer */}
            <footer className="border-t">
                <div className="container mx-auto p-5">
                    <p className="text-sm">&copy; All rights reserved {new Date().getFullYear()}</p>
                </div>
            </footer>
        </div>
    )
}

export default PrivateLayout;