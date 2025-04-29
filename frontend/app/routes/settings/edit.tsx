import { deleteVulnerabilityTypes, getVulnerabilityType, getVulnerabilityTypes } from "lib/actions"
import type { Route } from "../+types/home"
import { redirect, useNavigate, useSubmit } from "react-router";
import { useCallback, useState } from "react";
import Input from "~/components/form/Input";
import Button from "~/components/form/Button";
import { XCircleIcon } from "@heroicons/react/24/outline";

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id
  const vulnerabilityType =  await getVulnerabilityType(id as string)
  return vulnerabilityType
}

export default function EditSettings({ loaderData, actionData }: Route.ComponentProps) {
  
  const submit = useSubmit();

  const [patterns, setPatterns] = useState(actionData?.patterns ?? loaderData.patterns ?? [])

  const removePattern = useCallback((i: number) => {
    const aux = [...patterns]
    aux.splice(i,1)
    setPatterns(aux)
  }, [])

  const handleNew = () => {
    setPatterns([...patterns, {}])
  }

  return <div className="w-full rounded-sm border-stroke bg-white px-5 pb-2.5 pt-6 sm:px-7.5 xl:pb-1">
    <div className="w-full flex flex-wrap mb-4 mt-2">
      <div className="w-full">
          <h2 className="text-xl font-semibold text-purple-700">Edit Vulnerability Type</h2>
      </div>
      <div className="w-full">
        <Input label="Name" name="name"/>
        <div className="w-full">
          <div className="w-full mt-2 pl-2 gap-1">
            <h3 className="text-lg font-semibold text-purple-700">Patterns to Search</h3>
            { patterns?.map((c: string,i: number) => <div className="w-full flex gap-1">

              <Input label="Pattern" name="pattern"/>
              <Input label="Includes" name="includes"/>
              <Input label="Excludes" name="excludes"/>
              <div className="h-5 mt-3">
                <XCircleIcon className="p-1 size-10 text-purple-700" onClick={removePattern.bind(this, i)}/>
              </div>

            </div>)}
          </div>

          <div className="w-full pt-1 flex mb-2 pl-2">
            <Button label='New Pattern' onClick={handleNew}/>
          </div>
          <div className="w-full pt-1 flex mt-4 pl-2 justify-end">
            <Button label='Save' onClick={handleNew}/>
          </div>
        </div>
      </div>
    </div>
  </div>
}