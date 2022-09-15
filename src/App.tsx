import './styles/main.css';


import logoImg from './assets/Logo.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { GameController } from 'phosphor-react';
interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count:{
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => setGames(data));
  }, []);

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt='logo' />
      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span> esta aqui
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>

        {games.map(game=>{
          return (
            <GameBanner 
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          )
        })}
        <GameBanner
          bannerUrl='/image 1.png'
          title='League of Legends'
          adsCount={2}
        />
        
      </div>

      <Dialog.Root>
        <CreateAdBanner/> 

        <Dialog.Portal>
          <Dialog.Overlay className='fixed inset-0 bg-black/60'/>
          <Dialog.Content className='fixed text-white bg-[#2a2634] py-8 px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
            <Dialog.Title className='text-3xl font-black'>Publique um Anuncio</Dialog.Title>
            <Dialog.Content>
              <form action="">
                <div>
                  <label htmlFor="game">Qual o Game?</label>
                  <input id="game" type="text" placeholder="Seleciona o game que deseja jogar" />
                </div>

                <div>
                  <label htmlFor="name">Seu nome (ou nickname)</label>
                  <input id="name" type="text" placeholder="Como te chamam dentro do game?" />
                </div>
                <div>                
                  <div>
                    <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                    <input id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                  </div>
                  <div>
                    <label htmlFor="discord">Qual seu discord?</label>
                    <input id="discord" type="number" placeholder="Usuario#0000" />
                  </div>
                </div>
                <div>                
                  <div>
                    <label htmlFor="weekDays">Quando costuma jogar?</label>
                  </div>
                  <div>
                    <label htmlFor="hourStart">Quyal horario do dia?</label>
                    <div>
                      <input type="time" name="hourStart" id="hourStart" placeholder="De" />
                      <input type="time" name="hourEnd" id="hourEnd" placeholder="Ate" />
                    </div>
                  </div>
                  <div>
                    <input type="checkbox" />
                    Custumo me conectar ao CHat de voz
                  </div>

                  <footer>
                    <button>Cancelar</button>
                    <button type="submit">
                      <GameController/>
                      Encontrar duo
                    </button>
                  </footer>
                </div>
              </form>
            </Dialog.Content>
            </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>    
    </div>
  )
}

export default App
