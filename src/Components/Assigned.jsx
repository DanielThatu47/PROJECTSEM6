import React from 'react'
// import { useNavigate } from 'react-router-dom';


const Assigned = () => {
    
  return (
    <>
    <body className="bg-zinc-100 font-sans leading-normal tracking-normal">
    <div className="container mx-auto">
        <div className="flex flex-wrap">
            
            <div className="w-full">
                <ul className="flex border-b">
                    <li className="-mb-px mr-1">
                        <a className="bg-white inline-block py-2 px-4 text-blue-500 font-semibold" href='/Assigned ' style={{textDecoration : 'none'}}/>Assigned
                    </li>
                    <li className="mr-1">
                        <a className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="/Remaining">Missing</a>
                    </li>
                    <li className="mr-1">
                        <a className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="/Done">Done</a>
                    </li>
                </ul>
            </div>
            
            <div className="w-full p-4">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <div className="flex justify-between">
                        <select className="p-2 bg-white border rounded">
                            <option>All classes</option>
                        </select>
                        <div className="text-blue-500">
                            13 &#x25B2;
                        </div>
                    </div>
                    <div className="mt-4">
                        
                        <div className="mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="text-orange-500">
                                    &#128196;
                                </div>
                                <div>
                                    <p className="font-bold">JavaLab-A1,A3,B2</p>
                                    <p className="text-sm text-zinc-600">SEITB (July-Dec 2022)</p>
                                    <p className="text-xs text-zinc-500">Posted Wednesday, Aug 17, 2022</p>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="mb-4 mt-4">
                            <div className="flex items-center space-x-3">
                                <div className="text-orange-500">
                                    &#128196;
                                </div>
                                <div>
                                    <p className="font-bold">Assignment 2</p>
                                    <p className="text-sm text-zinc-600">PCPF, CPPL (SE IT B)</p>
                                    <p className="text-xs text-zinc-500">Posted Tuesday, Sep 20, 2022</p>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="text-orange-500">
                                    &#128196;
                                </div>
                                <div>
                                    <p className="font-bold">CPPL Tutorial1</p>
                                    <p className="text-sm text-zinc-600">PCPF, CPPL (SE IT B)</p>
                                    <p className="text-xs text-zinc-500">Posted Tuesday, Dec 27, 2022</p>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="text-orange-500">
                                    &#128196;
                                </div>
                                <div>
                                    <p className="font-bold">Exp1: Data Warehousing</p>
                                    <p className="text-sm text-zinc-600">TEIT-B (JAN-JUN 24)</p>
                                    <p className="text-xs text-zinc-500">Posted Monday, Jan 15</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    </body>

</>
  )
}
export default Assigned;
