// import { useRouter } from "next/router";
import Head from "next/head";

import PrivateLayout from "../layout/private";
// import { useAppSelector } from "../store/hooks";
import TodoList from '../components/TodoList';

const Dashboard = () =>{

    // const { user } = useAppSelector(state => state.auth);
    // const router = useRouter();

    return (
        <PrivateLayout>
            <main>
                <Head><title>Dashboard</title></Head>
                <div className="container mx-auto p-5">
                    <TodoList />
                </div>
            </main>
        </PrivateLayout>
    )
}

export default Dashboard;