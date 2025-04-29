import { useNavigate } from "react-router";
import type { ScanResultType } from "types/vulnerability-type";
import OutlineButton from "./form/OutlineButton";
import Message from "./Message";

const getHighlightedCode = (match: string, code: string) => {
    return code.replace(match, `<mark class="bg-yellow-300 dark:bg-yellow-600">${match}</mark>`)
  };

const ScanResults = (props: { results: ScanResultType[], type?: string, path: string }) => {
    const navigate = useNavigate();

    return <div className="flex-1 flex flex-col gap-4 min-h-0">
        <h2 className="text-xl font-semibold text-purple-700">Scan Results</h2>
        <div className="w-full border-b border-purple-700">
            <div className="flex w-full lg:w-1/2">
                <label className="text-lg font-semibold text-gray-700">Scan Type:</label><p className="pl-2 text-lg text-gray-700">{props.type}</p>
            </div>
            <div className="flex w-full lg:w-1/2">
                <label className="text-lg font-semibold text-gray-700">Path:</label><p className="pl-2 text-lg text-gray-700">{props.path}</p>
            </div>
        </div>
        {
            props.results.length === 0 ? <Message message="Your scan didn't show any vulnerabilities"/>
            : props.results?.map( r => <>
                <h3>Path: {r.path}</h3>
                {
                    r.matches?.map(m => <>
                            <h4>Match: {m.match}</h4>
                            <div className="relative overflow-hidden rounded-lg shadow-md">
                                <div className="overflow-auto">
                                    <div className="flex">
                                    <div className="px-4 py-4 text-right bg-gray-100 dark:bg-gray-800 select-none">
                                        {m.fragments.map((f) => (
                                            <div key={f.number} className="text-gray-500 dark:text-gray-400 font-mono text-sm">
                                                {f.number}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap px-4 py-4 text-sm">
                                        {m.fragments.map(f => <span className="w-full"><pre className={`${ f.content.includes(m.match) ? 'text-yellow-700' : '' }`}>{f.content}</pre></span> )}
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
                </>
            )
        }
        <div className="w-full pt-1 flex mt-4 pl-2 justify-end">
            <OutlineButton label='Back' onClick={() => { navigate('/') }} background="white" type="button"/>
        </div>
    </div>
};

export default ScanResults;