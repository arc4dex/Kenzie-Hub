
import Header from '../../components/header'
import MiniCard from '../../components/miniCard'
import { Container, ContainerMain } from './styles'
import Api from '../../services/api'
import { useState } from 'react'
import { useEffect } from 'react'
import Modal from '../../components/modal'

function Home(){

  const [ users, setUsers ] = useState([])
  const [ techsUser, setTechsUser ] = useState([])

  const [ modal, setModal ] = useState(false)

useEffect(() => {

  const userID = JSON.parse(localStorage.getItem('@kenzieHub:id'))
  const userToken = JSON.parse(localStorage.getItem('@kenzieHub:token'))
  
  console.log(userID)

  Api
  .get(`users/${userID}`)
  .then((res) => {
   setUsers(res.data)
  })
}, [])

console.log(users)

const onSubmitFunctionCadastro = ({title, status }) => {
  const techs = { title, status}

  const token = JSON.parse(localStorage.getItem('@kenzieHub:token'))

  Api
  .post(`users/techs`, techs, {
    headers: {
    Authorization: `Bearer ${token}
    `
    }
  })
  .then((response) => {
    setTechsUser(response.data)
    console.log(response.data)})
  .catch((err) => console.log(err))
}

function openModal(){
  setModal(true)
}

  return(
    <ContainerMain>
    {modal && <Modal titulo={'Cadastrar Tecnologia'} tecnologia = {'Nome'} placeholderTech = {'Digite uma tecnolgia'} nivel={'Selecionar status'} children = {'Cadastrar Tecnologia'} techsUser = {techsUser} setTechsUser = {setTechsUser} onSubmitFunction={onSubmitFunctionCadastro} modal={modal} setModal={setModal}/>}
     <Header children='Sair'/>
     <div className='containerUsuario'>
      <h2 className='BemVindo'>Olá, {users.name}</h2>
      <button className="btnAdd" onClick={openModal}>+</button>
     </div>
      <Container>
        <MiniCard techs={users.techs || []}/>
      </Container>
    </ContainerMain>
  )
}

export default Home