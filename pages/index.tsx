import Image from 'next/image';
import Link from 'next/link';
import Head from "next/head";

import PublicLayout from '../layout/public';
import { useAppSelector } from '../store/hooks';

const Home = () => {

  const { isAuthenticated } = useAppSelector(state => state.auth);

  const TECHS = [
    {
      name: 'React v18.0.0',
      image: '/logos/react.png'
    },
    {
      name: 'NextJS v12.1.4',
      image: '/logos/next.png'
    },
    {
      name: 'TypeScript v4.6.3',
      image: '/logos/ts.png'
    },
    {
      name: 'Redux v4.1.2',
      image: '/logos/redux.png'
    },
    {
      name: 'Tailwind v3.0.23',
      image: '/logos/tailwind.png'
    }
  ]

  return (
    <PublicLayout>
      <main>
        <Head><title>Welcome to Nino Espina Boilerplate</title></Head>

        <div className="container mx-auto p-5">

            <div className="text-center mb-10">
              <h1 className="text-4xl mt-20"><strong>Nino Espina</strong> Boilerplate</h1>
              <h5 className="mb-3 text-gray-600 mt-5">This Boilerplate is made with:</h5>
            </div>

            <ul className="text-xl flex justify-center flex-wrap gap-5 mb-10">
              {TECHS.map((item, index)=>(
                <li key={index}>
                  <div className="flex flex-col items-center bg-white p-5 rounded-xl w-40 h-40 justify-between">
                    <Image 
                      src={item.image}
                      width={100}
                      height={100}
                    />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                </li>
              ))}
            </ul>
            
            {isAuthenticated && (
              <Link href="/dashboard">
                <a>
                  <h5 className="text-center font-bold flex items-center justify-center text-sky-500">Go to Dashboard <span className="material-icons-outlined ml-2">arrow_forward_ios</span></h5>
                </a>
              </Link>
            )}

        </div>

        <div className="bg-white">

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#f3f4f6" fillOpacity="1" d="M0,0L80,5.3C160,11,320,21,480,48C640,75,800,117,960,117.3C1120,117,1280,75,1360,53.3L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
          </svg>

          <div className="container mx-auto lg:-mt-40 p-5 pb-10 lg:grid grid-cols-2 gap-x-10">
            <div className="col-span-1 flex flex-col justify-center">
              <h5 className="text-lg mb-3">Boilerplate Inclusion</h5>
              <h1 className="text-4xl font-bold mb-3">Built with advanced flow.</h1>
              <h5 className="text-xl font-medium text-gray-400">This Boilerplate includes not only a simple state management but also Redux Persist. Made from scratch by yours truly.</h5>
            </div>
            <div className="col-span-1 flex items-center justify-center pt-10 lg:pt-0">
              <Image 
                src="/logos/diagram.png"
                width={400}
                height={400}
              />
            </div>
          </div>

        </div>
      </main>
    </PublicLayout>
  )
}

export default Home;
