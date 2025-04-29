import { deleteVulnerabilityTypes, getVulnerabilityTypes } from "lib/actions"
import type { Route } from "../+types/home"
import { NavLink, redirect, useNavigate, useSubmit } from "react-router";
import { useCallback } from "react";
import Button from "~/components/form/Button";
import { XCircleIcon } from "@heroicons/react/24/outline";

export async function loader() {
  const vulnerabilityTypes =  await getVulnerabilityTypes()
  return vulnerabilityTypes
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData)

    const res = await deleteVulnerabilityTypes(data.id as string)
    if(res.error)
        return res
    else return redirect('/settgins')
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
      
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-2 text-left border-purple-700">
          <th className="px-2 py-2 font-medium text-purple-700 xl:pl-11">Name</th>
          <th className="px-2 py-2 font-medium text-purple-700">Excludes</th>
          <th className="px-2 py-2 font-medium text-purple-700">Includes</th>
        </tr>
      </thead>
      <tbody>
        {loaderData.vulnerabilityTypes?.map(t => (
          <tr key={`vulnerability-type-${t.id}`} className='cursor-pointer' onClick={() =>navigate(`/settings/${t.id}`)}>
            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
              <p className="text-black">{t.name}</p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-black">{t.includes}</p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-black">{t.excludes}</p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => remove(t.id)}/>
              <XCircleIcon className="size-8 text-purple-700" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
}