import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";
import { PencilSimple } from "phosphor-react";
import InputMask from "react-input-mask";
import { Contato } from "../App";

type EditContatoProp = {
  handleEditContato: (contato: Contato) => void;
  contato: Contato;
};

export function EditContatoComponent({
  handleEditContato,
  contato,
}: EditContatoProp) {
  const [dadoState, setDadoState] = useState(contato.dado);
  const [tipoState, setTipoState] = useState(contato.tipo);
  const [openState, setOpenState] = useState(false);

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function editContato(e: React.FormEvent) {
    e.preventDefault();
    setDadoState("");

    const target = e.target as typeof e.target & {
      tipo: { value: string };
      dado: { value: string };
    };

    let contatoEditado: Contato = {
      id: contato.id,
      tipo: target.tipo.value,
      dado: target.dado.value,
    };

    handleEditContato(contatoEditado);
  }

  return (
    <>
      <div className="">
        <button onClick={openModal}>
          <PencilSimple
            className=" text-indigo-900 hover:text-indigo-200"
            size="24"
            aria-hidden="true"
          />
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
                  onSubmit={(c) => {
                    editContato(c);
                    closeModal();
                  }}
                  className="w-full space-y-4 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all"
                >
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Editar Contato
                  </Dialog.Title>
                  <div className="flex items-center w-full gap-2">
                    <select
                      id="tipo"
                      name="tipo"
                      onChange={(e) => setTipoState(e.target.value)}
                      value={tipoState}
                      className="w-24 text-sm text-indigo-400 hover:text-indigo-800 duration-300 transition-transform"
                    >
                      <option value="Telefone"> Telefone </option>
                      <option value="Email">Email</option>
                      <option value="Whatsapp">Whatsapp</option>
                    </select>
                    <div className="relative z-0 w-full group">
                      <InputMask
                        id="dado"
                        name="dado"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-indigo-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-800 peer"
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
