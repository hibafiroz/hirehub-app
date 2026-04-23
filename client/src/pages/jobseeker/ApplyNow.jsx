import React from 'react'

function ApplyNow() {
  return (
      <div>
          <div class="flex flex-col lg:flex-row justify-center gap-8 px-4 sm:px-6 lg:px-10 w-full items-start">

       {/* JOB-INFO */}
      <div class="hidden lg:block rounded-2xl w-1/2 sticky top-28 p-8">
        <h1 class="text-4xl text-slate-700 font-semibold">
          job.title
        </h1>
        <p class="text-slate-600 mt-1">
          job.company • job.jobLocation
        </p>
        <p class="text-slate-700 text-lg mt-7 font-medium mb-2">Job Description</p>
        <p class="text-slate-600 text-sm">
          job.describeRole
        </p>
        <p class="text-slate-700 mt-6 text-lg">Skills</p>
        <p class="text-slate-600 mt-1 text-sm">
          job.skills
        </p>
        <p class="text-slate-700 mt-6 text-lg">Experience</p>
        <p class="text-slate-600 mt-1 text-sm">
          job.experience of experience in job.title
        </p>
        <div class="mt-6">
          <a href="/jobseeker/job-Detail/job._id"
            class="text-xs text-white px-4 py-3 rounded-xl bg-teal-700 hover:bg-teal-500">View Details</a>
        </div>
      </div>

       {/* APPLY FORM */}
      <div
        class="w-full lg:w-1/2 bg-white/30 shadow-[0_18px_40px_rgba(15,118,110,0.45)] rounded-2xl mb-10 mt-24 p-6 sm:p-8 border border-white/10">
        <form id="form" action="/jobseeker/apply/job._id" method="POST" enctype="multipart/form-data"
          class="space-y-4">

          <h2 class="text-2xl font-medium text-slate-700 mb-8">Application <span class="text-teal-600">form</span></h2>

           {/* FULL NAME */}
          <div>
            <label class="block text-sm text-slate-500 mb-1">Full Name</label>
            <input type="text" id="name" name="name" value=" user.name "
              class="w-full px-4 py-2 rounded-xl bg-white/20 border border-black/20 text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-400"/>
            <p id="nameFeedback" class="hidden text-sm text-red-500"></p>
          </div>

           {/* EMAIL */}
          <div>
            <label class="block text-sm text-slate-500 mb-1">Email</label>
            <input type="email" id="email" name="email" value=" user.email "
              class="w-full px-4 py-2 rounded-xl border border-black/20 text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-400"/>
            <p id="emailFeedback" class="hidden text-sm text-red-500"></p>
          </div>

                      {/* PHONE */}
          <div>
            <label class="block text-sm text-slate-500 mb-1">Phone</label>
            <input type="number" id="phone" name="phone" placeholder="Enter your phone number"
              class="w-full px-4 py-2 rounded-xl border border-black/20 text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-400"/>
            <p id="phoneFeedback" class="hidden text-sm text-red-500"></p>
          </div>

           {/* RESUME */}
          <div>
            <label class="block text-sm text-slate-500 mb-1">Resume (PDF)</label>
            <input type="file" id="resume" name="resume"
              class="w-full text-sm text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-teal-700/90 file:text-white hover:file:bg-teal-700/70"/>
            <p id="resumeFeedback" class="hidden text-sm text-red-500"></p>
          </div>

          {/* COVER LETTER */}
          <div>
            <label class="block text-sm text-slate-500 mb-1">Cover Letter</label>
            <textarea name="coverLetter" id="message" rows="4"
              class="w-full px-4 py-2 rounded-xl border border-black/20 text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-400"
              placeholder="Why should we hire you?"/>
            <p id="messageFeedback" class="hidden text-sm text-red-500"></p>
          </div>

           {/* bUTTON */}
          <button type="submit"
            class="w-full py-3 rounded-xl text-white bg-teal-700/90 hover:bg-teal-400 transition font-medium">
            Submit Application
          </button>
          <p id="feedback" class="text-red-500 hidden text-sm"></p>
        </form>
      </div>
    </div>
    </div>
  )
}

export default ApplyNow