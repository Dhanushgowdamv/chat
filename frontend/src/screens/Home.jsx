/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user.context";
import axios from '../config/axios.js'


const Home = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName,setProjectName] = useState(null)
  const [project,setProject]= useState(null)
  function createProject(e) {
    e.preventDefault()
    console.log({ projectName });

    axios.post('/project/create', 
      { name: projectName }, 
      
  ).then((res) => {
      console.log(res);
      setIsModalOpen(false);
  }).catch((error) => {
      console.log("Error:", error.response?.data || error.message);
  });


  }

  useEffect(()=>{
    axios.get('/project/all').then((res)=>{
     setProject(res.data.project)
    }).catch(err=>{
      console.log(err)
    })
  },[])

  return (
    <main className="p-4">
      <div className="projects flex">
        <button 
        onClick={() =>setIsModalOpen(true)}
        className="project p-4 border border-slate-300 rounded-md">
          New Project
          <i className="ri-link ml-3"></i>
        </button>
       
       {
        project.map((project)=>(
          <div key={project._id}>
            {project.name}
          </div>

        ))
       }






      </div>

      {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-1/3">
                        <h2 className="text-xl mb-4">Create New Project</h2>
                        <form onSubmit={createProject}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                                <input
                                    onChange={(e) => setProjectName(e.target.value)}
                                    value={projectName}
                                    type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                            <div className="flex justify-end">
                                <button type="button" className="mr-2 px-4 py-2 bg-gray-300 rounded-md" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

    </main>
  );
};

export default Home;
