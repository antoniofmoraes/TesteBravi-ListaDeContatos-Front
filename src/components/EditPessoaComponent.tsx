import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";
import { PencilSimple } from "phosphor-react";
import InputMask from "react-input-mask";
import { Contato, Pessoa } from "../App";

type EditContatoProp = {
  handleEditPessoa: (id: number, nome: string) => void;
  pessoa: Pessoa;
};

export function EditPessoaComponent({
  handleEditPessoa,
  pessoa,
}: EditContatoProp) {
  const [nomeState, setNomeState] = useState(pessoa.nome);

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function editPessoa(e: React.FormEvent) {
    e.preventDefault();
    setNomeState("");

    const target = e.target as typeof e.target & {
      nome: { value: string };
    };

    handleEditPessoa(pessoa.id, target.nome.value);
  }

  return (
    <>
      <div className="">
        <button
          type="button"
          className="transition-color duration-200 inline-flex justify-center rounded-md border border-transparent bg-indigo-700 px-4 py-2 text-sm font-medium text-indigo-50 hover:bg-indigo-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          onClick={openModal}
        >
          Alterar nome
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
                    editPessoa(p);
                    closeModal();
                  }}
                  className="w-full space-y-4 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all"
                >
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Alterar Nome
                  </Dialog.Title>
                  <div className="flex items-center w-full gap-2">
                    <div className="relative z-0 w-full group">
                      <input
                        id="nome"
                        name="nome"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-indigo-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-800 peer"
                        placeholder=" "
                        onChange={(e) => setNomeState(e.target.value)}
                        value={nomeState}
                        required
                      />
                      <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-indigo-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      ></label>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="font-bold py-2 px-4 rounded bg-indigo-500 text-white hover:bg-indigo-700"
                      >
                        Salvar
                      </button>
                    </div>
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
