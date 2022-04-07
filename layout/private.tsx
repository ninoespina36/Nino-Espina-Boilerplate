import { useState } from 'react';
import { useRouter } from "next/router";
import Link from 'next/link';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/reducers/authReducer';
import Button from '../components/form/Button';

interface Props {
    children: JSX.Element
}

const PrivateLayout = ({ children }: Props) =>{

    const router = useRouter();
    const { isAuthenticated } = useAppSelector(state => state.auth);
    const [ loading, setLoading ] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    if (!isAuthenticated) {
        router.replace("/");
        return null;
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
                        onClick={handleLogout}
                        loading={loading} 
                        loadingText="Logging out..."
                    >
                        {isAuthenticated ? 'Logout' : 'Login'}
                    </Button>
                </div>
            </header>

            {children}
        </div>
    )
}

export default PrivateLayout;