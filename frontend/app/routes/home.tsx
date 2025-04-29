import type { Route } from "./+types/home";
import { getVulnerabilityTypes, runScan } from "lib/actions";
import { useLocation, useNavigation } from "react-router";
import Loader from "~/components/Loader";
import Select from "~/components/form/Select";
import Input from "~/components/form/Input";
import Button from "~/components/form/Button";
import { z } from "zod";
import { validateData } from "lib/validation";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Secure Code Scanner" },
    { name: "description", content: "Secure Code Scanner" },
  ];
}

export async function loader() {
  
  const vulnerabilityTypes = await getVulnerabilityTypes()
  return { vulnerabilityTypes: vulnerabilityTypes }
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData)

    const errors = validateData(z.object({
      type: z.string().nonempty('required'),
      path: z.string().nonempty('required')
    }), data)

    if (errors)
      return { ...data, errors : errors.errors }
    else {
      const res = await runScan(data)
      if(res.error)
        return { error: res.error, ...data }
      else {
        if(data.confirmar)
          return redirect('/area-reservada/pedidos/novo');
        else return redirect('/area-reservada');
      }
    }
  } catch (error) {
    console.error('Erro em saveRegisto:', error);
    return { error: { message: 'Erro interno do servidor' } }; // Retorne um erro para o componente
  }
}

export default function Home({ loaderData, actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const location = useLocation();
  
  return isSubmitting ? <Loader/> : <div className="flex-1 flex flex-col gap-4 min-h-0">
        <h2 className="text-xl font-semibold text-purple-700">Run Scan</h2>
        <Select label="Vulnerability Type" name="type" value={actionData.type}
          options={[ {value: '', label: ''}, ...loaderData.vulnerabilityTypes?.map(t => { return { value: t.id, label: t.name }})]}/>
        <Input label="Path" name="path" value={actionData.path}/>
        <Input label="Parameters" name="parameters"/>

        <div className="w-full pt-1 flex mt-4 pl-2 justify-end">
          <Button label='Scan' type="submit"/>
        </div>
      </div>
    
}