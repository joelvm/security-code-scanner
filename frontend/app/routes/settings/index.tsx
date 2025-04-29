import { deleteVulnerabilityTypes, getVulnerabilityTypes } from "lib/actions"
import type { Route } from "../+types/home"
import { NavLink, redirect, useNavigate, useSubmit } from "react-router";
import { useCallback } from "react";
import Button from "~/components/form/Button";
import { XCircleIcon } from "@heroicons/react/24/outline";

export async function loader() {
  const vulnerabilityTypes =  await getVulnerabilityTypes()
  return  { vulnerabilityTypes }
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData)

    const res = await deleteVulnerabilityTypes(data.id as string)
    if(res.error)
        return res
    else return redirect('/settings')
  } catch (error) {
    console.error('Erro em saveRegisto:', error);
    return { error: { message: 'Erro interno do servidor' } }; // Retorne um erro para o componente
  }
}

export default function Settings({ loaderData }: Route.ComponentProps) {
  
  const navigate = useNavigate();
  const submit = useSubmit();

  const remove = useCallback((id: string) => {
    submit( { id: id }, { action: '/settings', method: "post" })
  }, [])

  return <div className="w-full rounded-sm border-stroke bg-white px-5 pb-2.5 pt-6 sm:px-7.5 xl:pb-1">
    <div className="w-full flex mb-4 mt-2">
      <div className="w-1/2">
          <h2 className="text-xl font-semibold text-purple-700">Vulnerability Types</h2>
      </div>
    </div>
    <div className="w-full flex mb-4 mt-2 justify-end">
      <NavLink to={'/settings/new'}><Button label='New' /></NavLink>
    </div>
      
    <div className="w-full flex pb-2">
      <div className="w-1/3 py-2 font-medium text-gray-700 border-b-1 border-purple-700">Name</div>
      <div className="w-1/3 py-2 font-medium text-gray-700 border-b-1 border-purple-700">Excludes</div>
      <div className="w-1/3 py-2 font-medium text-gray-700 border-b-1 border-purple-700">Includes</div>
      <div className="w-8 border-b-1 border-purple-700"></div>
    </div>

    {loaderData.vulnerabilityTypes?.map(t => 
      <div className="w-full flex pb-2 cursor-pointer" onClick={() =>navigate(`/settings/${t.id}`)}>
        <div className="w-1/3 py-2 font-medium text-gray-700 border-b-1 border-gray-500">{t.name}</div>
        <div className="w-1/3 py-2 font-medium text-gray-700 border-b-1 border-gray-500">{t.includes}</div>
        <div className="w-1/3 py-2 font-medium text-gray-700 border-b-1 border-gray-500">{t.excludes}</div>
        <div className="w-8 border-b-1 border-gray-500">
          <XCircleIcon className="size-8 text-purple-700" onClick={(e) => { e.stopPropagation(); remove(t.id) }}/>
        </div>
      </div>
    )}
  </div>
}