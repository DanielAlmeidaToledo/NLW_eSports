import { useState, useEffect } from 'react' 
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import * as Dialog from '@radix-ui/react-dialog'
import logoImg from './assets/logo-nlwesports.svg'
import { CreateAdModal } from './components/Form/CreateAdModal'
import axios from 'axios'
import './styles/main.css'

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(response => {
        setGames(response.data)
      })
  }, [])


  return (
    <div className="max-w-[1280px] mx-auto flex flex-col items-center my-10">
      
      <img src={logoImg}></img>
      <h1 className="text-6xl text-white font-black mt-10">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl} 
              title={game.title} 
              adsCount={game._count.ads}
            />
          )
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />  
        <CreateAdModal />
      </Dialog.Root>
      
    </div>
  )
}

export default App
