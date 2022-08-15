import { useEffect, useState } from "react"

type PessoaIconProp = {
    nome: string
}

export function PessoaIconComponent({nome}: PessoaIconProp) {
    return(
        <div className="w-12 h-12 rounded-full bg-sky-500 flex justify-center items-center font-bold">
            {nome.charAt(0)}
        </div>  
    )
}