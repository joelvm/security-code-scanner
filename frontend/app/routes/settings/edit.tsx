import { getVulnerabilityType, saveVulnerabilityTypes } from "lib/actions"
import type { Route } from "../+types/home"
import {  Form, redirect, useNavigate, useSubmit } from "react-router";
import { useState } from "react";
import Input from "~/components/form/Input";
import Button from "~/components/form/Button";
import { XCircleIcon } from "@heroicons/react/24/outline";
import OutlineButton from "~/components/form/OutlineButton";
import type { SearchPattern, VulnerabilityType } from "types/vulnerability-type";
import Loader from "~/components/Loader";
import Error from "~/components/Error";

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id
  const vulnerabilityType =  await getVulnerabilityType(id as string)
  return { vulnerabilityType }
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData)
    const vulnerabilityType = JSON.parse(data.vulnerabilityType as string);
    const res = await saveVulnerabilityTypes(vulnerabilityType)
    if(res.error)
        return res
    else return redirect('/settings')
   
  } catch (error) {
    console.error('Erro em saveRegisto:', error);
    return { error: { message: 'Erro interno do servidor' } }; // Retorne um erro para o componente
  }
}

export default function EditSettings({ loaderData, actionData }: Route.ComponentProps) {
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>(actionData?.error)

  const submit = useSubmit();
  const doSavePedido = async () => {
    setError('')
    setIsLoading(true)

    if(!name) {
      setError("Name is required")
      setIsLoading(false)
    }
    else if(patterns?.length === 0) {
      setError("You must define at least one pattern")
      setIsLoading(false)
    }
    else if(patterns.some((s: { pattern: string }) => s.pattern === null)){
      setError("You must define the pattern of all lines")
      setIsLoading(false)
    }
    else {
      //stringify the object to submit
      submit({ vulnerabilityType: JSON.stringify({ name: name, patterns: patterns, ...(loaderData.vulnerabilityType?.id !== 'new' ? { id: loaderData.vulnerabilityType?.id } : {})}) }, { action: `/settings/${loaderData.id}`, method: "post" })
    }
  }

  const navigate = useNavigate();

  const [patterns, setPatterns] = useState(actionData?.vulnerabilityType?.patterns ?? loaderData.vulnerabilityType?.patterns ?? [])
  const [name, setName] = useState(actionData?.vulnerabilityType?.name ?? loaderData.vulnerabilityType?.name ?? '')
  
  const removePattern = (i: number) => {
    const aux = [...patterns]
    aux.splice(i,1)
    setPatterns(aux)
  }

  const handleNew = () => {
    setPatterns([...patterns, {}])
  }

  const handlePatternChange = (i: number, val: string) => {
    const aux = [...patterns]
    aux[i].pattern = val
    setPatterns(aux)
  }

  const handleExcludesChange = (i: number, val: string) => {
    const aux = [...patterns]
    aux[i].excludes = val
    setPatterns(aux)
  }

  const handleIncludesChange = (i: number, val: string) => {
    const aux = [...patterns]
    aux[i].includes = val
    setPatterns(aux)
  }

  return  isLoading ? <Loader/> : <div className="w-full rounded-sm border-stroke bg-white px-5 pb-2.5 pt-6 sm:px-7.5 xl:pb-1">
    <div className="w-full flex flex-wrap mb-4 mt-2">
      <div className="w-full">
          <h2 className="text-xl font-semibold text-purple-700">Edit Vulnerability Type</h2>
      </div>
      <div className="w-full">
        { error && <Error message={error}/> }
        <Input label="Name" name="name" value={name} onChange={setName}/>
        <div className="w-full">
          <div className="w-full mt-2 pl-2 gap-1">
            <h3 className="text-lg font-semibold text-purple-700">Patterns to Search</h3>

            <div className="w-full flex pb-2">
              <div className="w-1/3 py-2 font-medium text-gray-700 border-b-1 border-purple-700">Name</div>
              <div className="w-1/3 py-2 font-medium text-gray-700 border-b-1 border-purple-700">Excludes</div>
              <div className="w-1/3 py-2 font-medium text-gray-700 border-b-1 border-purple-700">Includes</div>
              <div className="w-8 border-b-1 border-purple-700"></div>
            </div>

            { patterns?.map((c: SearchPattern,i: number) => <div className="w-full flex gap-1 mb-1" key={`pattern-${i}`}>

              <Input value={c.pattern} onChange={val => handlePatternChange(i, val)} />
              <Input value={c.includes} onChange={val => handleIncludesChange(i, val)} />
              <Input value={c.excludes} onChange={val => handleExcludesChange(i, val)} />
              <div className="h-5">
                <XCircleIcon className="p-1 size-10 text-purple-700" onClick={() => removePattern(i)}/>
              </div>

            </div>)}
          </div>

          <div className="w-full pt-1 flex mb-2 pl-2">
            <Button label='New Pattern' onClick={handleNew}/>
          </div>
          <div className="w-full pt-1 flex mt-4 pl-2 justify-end">
            <OutlineButton label='Back' onClick={() => { navigate('/settings') }} background="white" type="button"/>
            <Button label='Save' onClick={doSavePedido}/>
          </div>
        </div>
      </div>
    </div>
  </div>
}