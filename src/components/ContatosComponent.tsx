import {
  EnvelopeSimple,
  WhatsappLogo,
  Phone,
  CaretDown,
  Plus,
  PencilSimple,
} from "phosphor-react";
import React, { useEffect, useState } from "react";
import { Contato, Pessoa } from "../App";
import { ContatoIconComponent } from "./ContatoIconComponent";
import { EditContatoComponent } from "./EditContatoComponent";
import { DeleteContatoModalComponent } from "./DeleteContatoModalComponent";
import { DeletePessoaModalComponent } from "./DeletePessoaModalComponent";
import { EditPessoaComponent } from "./EditPessoaComponent";
import InputMask from "react-input-mask";
import axios from "axios";

type ContatosProp = {
  pessoa: Pessoa;
  handleDeletePessoa: (pessoaId: number) => void;
  handleDeleteContato: (contatoId: number) => void;
  handleAddContato: (
    pessoaId: number,
    contatoTipo: string,
    contatoDado: string
  ) => void;
  handleEditContato: (contato: Contato) => void;
  handleEditPessoa: (id: number, nome: string) => void;
};

export function ContatosComponent({
  pessoa,
  handleDeletePessoa,
  handleDeleteContato,
  handleAddContato,
  handleEditContato,
  handleEditPessoa,
}: ContatosProp) {
  const iconsSize = "32";

  const [dadoState, setDadoState] = useState("");
  const [tipoState, setTipoState] = useState("Telefone");

  function addContato(e: React.FormEvent) {
    e.preventDefault();
    setDadoState("");

    const target = e.target as typeof e.target & {
      tipo: { value: string };
      dado: { value: string };
    };

    handleAddContato(pessoa.id, target.tipo.value, target.dado.value);
  }

  return (
    <div className="space-y-3 text-indigo-900">
      <div className=" text-indigo-900">
        {pessoa.contatos.map((c) => {
          return (
            <div className="flex flex-row justify-between items-center rounded-lg hover:bg-indigo-300 transition-colors duration-250 my-2">
              <div className="flex flex-row items-center gap-4">
                <div className="m-2">
                  <ContatoIconComponent tipo={c.tipo} iconsSize={iconsSize} />
                </div>
                <span>{c.dado}</span>
              </div>
              <div className="flex flex-row justify-center items-center gap-2 mx-2">
                <EditContatoComponent
                  handleEditContato={handleEditContato}
                  contato={c}
                />
                <DeleteContatoModalComponent
                  contato={c}
                  pessoa={pessoa}
                  handleDeleteContato={handleDeleteContato}
                />
              </div>
            </div>
          );
        })}
      </div>
      <form className="flex items-center w-auto gap-3" onSubmit={addContato}>
        <select
          id="tipo"
          name="tipo"
          onChange={(e) => setTipoState(e.target.value)}
          value={tipoState}
          className="w-2/6 bg-indigo-200 text-sm  text-indigo-400 duration-300 transition-transform hover:text-indigo-600"
        >
          <option className="bg-indigo-50" selected value="Telefone">
            Telefone
          </option>
          <option className="bg-indigo-50" value="Email">
            Email
          </option>
          <option className="bg-indigo-50" value="Whatsapp">
            Whatsapp
          </option>
        </select>
        <div className="relative z-0 w-full group">
          <InputMask
            id="dado"
            name="dado"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-indigo-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
            placeholder=" "
            mask={
              tipoState === "Telefone" || tipoState === "Whatsapp"
                ? "(99) 99999-9999"
                : ""
            }
            onChange={(e) => setDadoState(e.target.value)}
            value={dadoState}
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-indigo-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          />
        </div>
        <button>
          <Plus
            className="text-indigo-400 hover:text-indigo-600"
            size="28"
            aria-hidden="true"
            type="submit"
          />
        </button>
      </form>
      <div className="flex w-full justify-between px-1 pt-2 pb-3">
        <EditPessoaComponent
          handleEditPessoa={handleEditPessoa}
          pessoa={pessoa}
        />
        <DeletePessoaModalComponent
          pessoa={pessoa}
          handleDeletePessoa={handleDeletePessoa}
        />
      </div>
    </div>
  );
}
