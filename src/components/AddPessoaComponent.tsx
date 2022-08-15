import { Popover, Transition, Dialog } from "@headlessui/react";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  DetailedHTMLProps,
  FormHTMLAttributes,
  Fragment,
  useState,
} from "react";
import { Plus } from "phosphor-react";
import InputMask from "react-input-mask";
import { Pessoa } from "../App";
import axios from "axios";

type propsAddPessoa = {
  handleAddPessoa: (nome: string, tipo: string, dado: string) => void;
};

export function AddPessoaComponent({ handleAddPessoa }: propsAddPessoa) {
  const [dadoLabelState, setDadoLabelState] = useState("Telefone");
  const [phone, setPhone] = useState("");

  const handlePhoneInput = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setPhone(target.value);

  function addPessoa(e: React.FormEvent) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      nome: { value: string };
      tipo: { value: string };
      dado: { value: string };
    };

    handleAddPessoa(target.nome.value, target.tipo.value, target.dado.value);
  }

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="">
        <button
          type="button"
          className="group inline-flex items-center text-indigo-200 rounded-md hover:bg-indigo-200 hover:text-indigo-800 transition-color duration-200 px-3 py-2 text-base font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          onClick={openModal}
        >
          <Plus className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
          Adicionar Contato
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  as="form"
                  onSubmit={(p: any) => {
                    addPessoa(p);
                    closeModal();
                  }}
                  className="w-full space-y-4 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all"
                >
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Novo Contato
                  </Dialog.Title>
                  <div className="relative z-0 w-full group">
                    <input
                      name="nome"
                      id="nome"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-indigo-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_email"
                      className="peer-focus:font-medium absolute text-sm text-indigo-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Nome
                    </label>
                  </div>
                  <div className="flex items-center w-full gap-2">
                    <select
                      name="tipo"
                      id="tipo"
                      className="w-1/3 text-sm text-indigo-400 hover:text-orange-600 duration-300 transition-transform"
                      onChange={(e) => {
                        setDadoLabelState(e.target.value);
                      }}
                    >
                      <option selected value="Telefone">
                        {" "}
                        Telefone{" "}
                      </option>
                      <option value="Email">Email</option>
                      <option value="Whatsapp">Whatsapp</option>
                    </select>
                    <div className="relative z-0 w-2/3 group">
                      <InputMask
                        name="dado"
                        id="dado"
                        mask={
                          dadoLabelState === "Whatsapp" ||
                          dadoLabelState === "Telefone"
                            ? "(99) 99999-9999"
                            : ""
                        }
                        value={phone}
                        onChange={handlePhoneInput}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-indigo-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-indigo-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      ></label>
                    </div>
                  </div>
                  <div className="">
                    <button
                      type="submit"
                      className="font-bold py-2 px-4 rounded bg-indigo-500 text-white hover:bg-indigo-700"
                    >
                      Adicionar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
