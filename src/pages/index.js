import React, { useState, useEffect } from 'react';
import MainGrid from '../components/MainGrid'
import Box from '../components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../components/ProfileRelations';
import { alurakutFriends, currentAlurakutUser } from '../services/api';
import ProfileSidebar from '../components/ProfileSideBar';



export default function Home() {
  const [user, setUser] = useState({});
  const [amigos, setAmigos] = useState([]);
  const [comunidades, setComunidades] = useState([{
    id: 'erhfierjkkn',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);

  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]



  useEffect(() => {
    currentAlurakutUser()
    .then(response => setUser(response))
    .catch(err => console.error(err))

    alurakutFriends()
    .then(response => setAmigos(response))
  }, []);




  return (
    <>
      <AlurakutMenu githubUser={user} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={user} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a), {user.name}
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle" >O que você deseja fazer?</h2>
            <form onSubmit={(event) => {
              event.preventDefault();
              const dadosDoForm = new FormData(event.target);

              const comunidade = {
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image')
              }

              const maisComunidades = [...comunidades, comunidade];
              setComunidades(maisComunidades);
              }}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?" 
                  type="text"
                />
              </div>
              <div>
                <input 
                  placeholder="Coloque uma URL para usarmos de capa" 
                  name="image" 
                  aria-label="Coloque uma URL para usarmos de capa" 
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Meus amigos ({amigos.length})
            </h2>

            <ul>
              {amigos.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={itemAtual.html_user}>
                      <img src={itemAtual.avatar_url} />
                      <span>{itemAtual.name}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              MInhas comunidades ({comunidades.length})
            </h2>
            <ul>
                {comunidades.map((itemAtual) => {
                  return (
                    <li key={itemAtual.id}>
                      <a href={`/users/${itemAtual.title}`}>
                        <img src={itemAtual.image} />
                        <span>{itemAtual.title}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}