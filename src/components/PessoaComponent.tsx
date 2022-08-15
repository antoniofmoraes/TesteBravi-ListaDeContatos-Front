import { Pessoa, Contato } from "../App";
import {
  EnvelopeSimple,
  WhatsappLogo,
  Phone,
  CaretDown,
  Plus,
} from "phosphor-react";
import { PessoaIconComponent } from "./PessoaIconComponent";
import { ContatoIconComponent } from "./ContatoIconComponent";
import { Disclosure, Transition } from "@headlessui/react";
import { useState } from "react";
import { ContatosComponent } from "./ContatosComponent";
import axios from "axios";

type PessoaProp = {
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

export function PessoaComponent({
  pessoa,
  handleDeletePessoa,
  handleDeleteContato,
  handleAddContato,
  handleEditContato,
  handleEditPessoa,
}: PessoaProp) {
  const iconsSize = "20";

  return (
    <div className="mx-auto">
      <Disclosure>
        {({ open }) => (
          <>
            <div className="">
              <Disclosure.Button
                className="w-full flex flex-row justify-between items-center gap-2
                            transition-colors duration-200
                            bg-indigo-100 px-4 py-4 text-left text-sm font-medium 
                            text-indigo-900 hover:bg-indigo-50 hover:shadow-lg focus:outline-none focus-visible:ring 
                            focus-visible:ring-indigo-500 focus-visible:ring-opacity-75
                            "
              >
                <div className="flex items-center gap-4">
                  <PessoaIconComponent nome={pessoa.nome} key={pessoa.id} />
                  <div className="text-base">{pessoa.nome}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex gap-4">
                    {pessoa.contatos.map((c) => {
                      return (
                        <ContatoIconComponent
                          tipo={c.tipo}
                          iconsSize={iconsSize}
                        />
                      );
                    })}
                  </div>
                  <CaretDown
                    size={iconsSize}
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-indigo-800`}
                  />
                </div>
              </Disclosure.Button>
              <Transition
                show={open}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="shadow-inner shadow-lg bg-indigo-200 transition-transform px-4 pt-4 pb-2 text-sm text-gray-500">
                  <ContatosComponent
                    pessoa={pessoa}
                    handleDeletePessoa={handleDeletePessoa}
                    handleDeleteContato={handleDeleteContato}
                    handleAddContato={handleAddContato}
                    handleEditContato={handleEditContato}
                    handleEditPessoa={handleEditPessoa}
                  />
                </Disclosure.Panel>
              </Transition>
            </div>
          </>
        )}
      </Disclosure>
    </div>
  );
}
