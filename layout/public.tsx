import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Button from '../components/form/Button';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login, logout } from '../store/reducers/authReducer';

interface Props {
    children: JSX.Element
}

const PublicLayout = ({ children }: Props) =>{

    const { isAuthenticated } = useAppSelector(state => state.auth);
    const [ loading, setLoading ] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogin = () =>{
        const user = {
            name: 'John',
            id: '129032948924',
            email: 'john@email.com',
            token: '1340920490424-token'
        }
        setLoading(true);
        setTimeout(()=>{
            dispatch(login(user));
            router.replace('/dashboard');
            setLoading(false);
        }, 3000)
    }

    const handleLogout = () =>{
        setLoading(true);
        setTimeout(()=>{
            dispatch(logout());
            router.replace('/dashboard');
            setLoading(false);
        }, 3000)
    }

    return (
        <div>
            <header className="border-b">
                <div className="container mx-auto flex justify-between p-5 items-center">
                    <Link href="/"><a><h1><b>Nino Espina</b> Boilerplate</h1></a></Link>
                    <Button 
                        onClick={()=> isAuthenticated ? handleLogout() : handleLogin()}
                        loading={loading} 
                        loadingText={isAuthenticated ? 'Logging out...' : 'Logging in...'}
                    >
                        {isAuthenticated ? 'Logout' : 'Login'}
                    </Button>
                </div>
            </header>

            {children}

            <footer className="container mx-auto p-5">
                &copy; All rights reserved. <b>Nino Espina</b> Boilerplate
            </footer>
        </div>
    )
}

export default PublicLayout;