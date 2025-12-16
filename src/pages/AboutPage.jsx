import React from 'react'

const AboutPage = () => {
  return (
    <>
        <section className="min-h-[85vh] bg-main text-zinc-100 flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-heading mb-4">
          About <span className="text-btn">Blogify</span>
        </h1>

        <p className="text-zinc-300 text-lg leading-relaxed mb-6">
          <span className="text-btn font-semibold">Blogify</span> is a modern
          full-stack blog web app built using the{" "}
          <span className="text-white font-semibold">MERN stack</span> and{" "}
          <span className="text-white font-semibold">Appwrite</span> as the
          backend service. It was created as a{" "}
          <span className="text-white font-semibold">college project</span> to
          explore real-world development workflows — from authentication and
          database management to storage, API integration, and responsive UI
          design.
        </p>

        <p className="text-zinc-400 leading-relaxed mb-8">
          Blogify allows users to create, manage, and share blogs effortlessly.
          It focuses on clean design, smooth interactivity, and efficient data
          handling powered by Appwrite. Each feature — from profile management
          to comments — is designed to mimic real production-level blog
          platforms while keeping the code modular and beginner-friendly.
        </p>

        <p className="text-zinc-400 text-sm mt-8">
          Designed and developed by{" "}
          <span className="text-btn font-semibold">Ranjan Singh</span> 
        </p>
      </div>
    </section>
  
    </>
  )
}

export default AboutPage
