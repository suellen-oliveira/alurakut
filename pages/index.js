import React, { useState, useEffect } from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { alurakutFriends, currentAlurakutUser } from '../src/services/github';
import ProfileSidebar from '../src/components/ProfileSideBar';

export default function Home() {
  const [user, setUser] = useState({});
  const [amigos, setAmigos] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const [moreResults, setMoreResults] = useState(false);

  useEffect(() => {
    currentAlurakutUser()
    .then(response => setUser(response))
    .catch(err => console.error(err))

    alurakutFriends()
    .then(response => setAmigos(response))

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `49825ca773eb331462a377cb5f3456`,
      },
      body: JSON.stringify({
        query: `query {
          allCommunities {
            title
            id
            imageUrl
            creatorSlug
          }
        }`
      }),
    })
    .then((response) => response.json())
    .then(respostaCompleta => {
      console.log(respostaCompleta.data.allCommunities)
      const todasAsComunidades = respostaCompleta.data.allCommunities;
      setComunidades(todasAsComunidades);
    })

  }, []);

  const handleShowMoreResults = (event) => {
    event.preventDefault();
    setMoreResults(!moreResults);
  }



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
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: user.login
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const comunidade = dados.registroCriado;
                const maisComunidades = [...comunidades, comunidade];
                setComunidades(maisComunidades);
              })

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
        <ProfileRelationsBoxWrapper moreResults={moreResults}>
          <h2 className="smallTitle">
            Meus amigos ({amigos.length})
          </h2>
          <ul>
              {amigos.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={itemAtual.html_url}>
                      <img src={itemAtual.avatar_url} />
                      <span>{itemAtual.login}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
            {amigos.length > 6 && (
              <>
                <hr />
                <button
                  className="toggleButton"
                  onClick={(e) => handleShowMoreResults(e)}
                >
                  {moreResults ? 'Ver menos' : 'Ver mais'}
                </button>
              </>
            )}
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper moreResults={moreResults}>
            <h2 className="smallTitle">
              Minhas comunidades ({comunidades.length})
            </h2>
            <ul>
                {comunidades.map((itemAtual) => {
                  return (
                    <li key={itemAtual.id}>
                      <a href={`/comunidades/${itemAtual.id}`}>
                        <img src={itemAtual.imageUrl} />
                        <span>{itemAtual.title}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
              {comunidades.length > 6 && (
              <>
                <hr />
                <button
                  className="toggleButton"
                  onClick={(e) => handleShowMoreResults(e)}
                >
                  {moreResults ? 'Ver menos' : 'Ver mais'}
                </button>
              </>
            )}
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}