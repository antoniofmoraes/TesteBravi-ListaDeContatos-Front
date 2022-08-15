import axios from "axios";
import { useEffect, useState } from "react";
import { Disclosure } from '@headlessui/react';
import { AddPessoaComponent } from "./components/AddPessoaComponent";
import { PessoaComponent } from "./components/PessoaComponent";
import { ErrorComponent } from "./components/ErrorComponent";
import { Modal } from "react-bootstrap";

export type Contato = {
  id: number,
  tipo: string,
  dado: string
}

export type Pessoa = {
  id: number,
  nome: string,
  contatos: Contato[],
}


function App() {
  const [pessoasState,setPessoasState] = useState<Pessoa[]>(new Array<Pessoa>);
  const [errorModalState,setErrorModalState] = useState<boolean>(false);
  const [errorMessageState,setErrorMessageState] = useState<string>("Erro inesperado");

  function openErrorModal(){
    setErrorModalState(errorModalState => true)
  }
  function closeErrorModal(){
    setErrorModalState(errorModalState => false)
  }

  function sortPessoaAndSet(pessoas: Pessoa[]){
    setPessoasState(pessoas.sort((a,b) => (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0)))
  }
  
  useEffect(() => {
    async function use() {
      await axios.get(import.meta.env.VITE_API_URL+"Pessoas").then((res) => {
        let pessoas: Pessoa[] = res.data || pessoasState;
        sortPessoaAndSet(pessoas);
      });
    };
    use();
  },[]) ;

  function handleAddPessoa(nome: string, tipo: string, dado: string){
    const pessoa = {
      nome: nome,
      contatos: [
        {
          tipo: tipo,
          dado: dado
        }
      ]
    }

    axios
      .post(import.meta.env.VITE_API_URL + "Pessoas", pessoa)
      .then((response) => {
        const newPessoa = response.data as Pessoa;
    
        sortPessoaAndSet([newPessoa,...pessoasState]);
      })
      .catch(async (error) => {
        setErrorMessageState(error.response.data.message);
        return openErrorModal();
      });
  };

  function handleDeletePessoa(pessoaId: number){
    axios.delete(import.meta.env.VITE_API_URL + "Pessoas/" + pessoaId.toString());

    let pessoas = pessoasState;

    pessoas = pessoas.filter(p => p.id != pessoaId);

    sortPessoaAndSet(pessoas);
  };

  function handleDeleteContato(contatoId: number) {
    axios
      .delete(import.meta.env.VITE_API_URL + "Contatos/" + contatoId)
      .then(() => {
        let pessoas = pessoasState.map((pessoa) => {
          let contatos = pessoa.contatos.filter((c) => c.id !== contatoId);
          pessoa.contatos = contatos
          return pessoa
        });
        
        setPessoasState(pessoas);
      })
      .catch(async (error) => {
        setErrorMessageState(error.response.data.message);
        return openErrorModal();
      });
  }
  
  function handleAddContato(
    pessoaId: number,
    contatoTipo: string,
    contatoDado: string
  ){
    const body = {
      tipo: contatoTipo,
      dado: contatoDado
    }
    
    async function use() {
      await axios
        .post(import.meta.env.VITE_API_URL + "Contatos/Pessoas/" + pessoaId + "/Contatos", body)
        .then((res) => {
          let newContato: Contato
          newContato = {
            id: res.data.id,
            tipo: res.data.tipo,
            dado: res.data.dado
          }

          const pessoas = pessoasState.map((pessoa) => {
            if (pessoa.id === pessoaId){
              pessoa.contatos.push(newContato)
            }
            return pessoa
          })

          return setPessoasState(pessoas)
        })
        .catch(async (error) => {
          setErrorMessageState(error.response.data.message);
          return openErrorModal();
        })
      }
      use();    
  }

  function handleEditPessoa(
    id: number,
    nome: string
  ){
    const body = {
      nome: nome
    }

    axios
      .put(import.meta.env.VITE_API_URL + "Pessoas/" + id, body)
      .then((res) => {
        let newPessoa: Pessoa

        newPessoa = {
          id: res.data.id,
          nome: res.data.nome,
          contatos: res.data.contatos
        }

        const pessoas = pessoasState.map((pessoa) => {
          if (pessoa.id === newPessoa.id){
            return newPessoa
          }
          return pessoa
        })

        setPessoasState(pessoas)
      })
      .catch(async (error) => {
        setErrorMessageState(error.response.data.message);
        return openErrorModal();
      });    
  }

  function handleEditContato(contato: Contato) {
    const body = {
      id: contato.id,
      tipo: contato.tipo,
      dado: contato.dado
    }

    axios
      .put(import.meta.env.VITE_API_URL + "Contatos/" + contato.id, body)
      .then((res) => {
        let pessoas = pessoasState.map((pessoa) => {
          let index = pessoa.contatos.findIndex((c) => c.id === contato.id)

          if (index >= 0){
            pessoa.contatos[index] = res.data;
          }

          return pessoa
        })
        
        setPessoasState(pessoas);
      })
      .catch(async (error) => {
        setErrorMessageState(error.response.data.message);
        return openErrorModal();
      })
  }

  function ModalError(props) {
    const errorModalState = props.errorModalState;
    if (errorModalState) {
      return (
      <>
        <ErrorComponent errorMessage={errorMessageState + ". Tente Novamente"}/>
      </>
      );
    }
    else{
      return <></>
    }
  }

  return (
    <div className="mx-auto max-w-4xl pt-4 container px-auto flex justify-center h-full">
      
      <div className="w-2/3 p-12">
        <ModalError errorModalState={errorModalState} errorMessageState={errorMessageState}/>
        
        <div className="mb-2"><AddPessoaComponent handleAddPessoa={handleAddPessoa}/></div>
        <div className="rounded-lg overflow-hidden bg-indigo-100 shadow-xl">
        {
          pessoasState.map((p) => (
            <PessoaComponent pessoa={p} key={p.id} handleDeletePessoa={handleDeletePessoa}
              handleDeleteContato={handleDeleteContato}
              handleAddContato={handleAddContato}
              handleEditContato={handleEditContato}
              handleEditPessoa={handleEditPessoa}/>
          ))
        }
        </div>
      </div>
    </div>
  )
}

export default App