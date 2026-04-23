import React from 'react'

function Contact() {
    return (
        <div>
            <section className="mt-30 max-w-6xl mx-auto px-6 sm:px-10 grid gap-10 lg:grid-cols-2">

                {/* CONTACT INFO */}
                <div className="hidden lg:block space-y-6">
                    <div className="border border-black/20 rounded-2xl shadow-[0_18px_40px_rgba(15,118,110,0.45)] p-6">
                        <h3 className="text-black font-medium text-lg mb-2">Contact Information</h3>
                        <p className="text-sm text-slate-700 mb-4">
                            Reach out to us anytime. Our team will respond as soon as possible.
                        </p>

                        <div className="space-y-3 text-sm text-slate-700">
                            <p><span className="text-teal-600">Email:</span> support@jobportal.com</p>
                            <p><span className="text-teal-600">Phone:</span> +91 98765 43210</p>
                            <p><span className="text-teal-600">Location:</span> India</p>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-black/20 rounded-2xl shadow-[0_18px_40px_rgba(15,118,110,0.45)] p-6">
                        <h3 className="text-black font-medium mb-2">Support Hours</h3>
                        <p className="text-sm text-slate-700">
                            Monday - Friday: 9:00 AM - 6:00 PM
                            <br />
                            Saturday - Sunday: Closed
                        </p>
                    </div>

                    <div className="bg-white/5 border border-black/20 shadow-[0_18px_40px_rgba(15,118,110,0.45)] rounded-2xl p-6">
                        <h3 className="text-black font-medium mb-2">Quick Help</h3>
                        <p className="text-sm text-slate-700 mb-4">
                            Need immediate assistance? Explore our help resources or raise a support request.
                        </p>

                        <div className="space-y-2 text-sm text-slate-700">
                            <p>• FAQs & Common Issues</p>
                            <p>• Account & Login Help</p>
                            <p>• Job Posting & Applications</p>
                        </div>
                    </div>
                </div>

                {/* CONTACT FORM */}

                <div className="border border-black/20 bg-white/50 shadow-[0_18px_40px_rgba(15,118,110,0.45)] rounded-2xl px-9 py-8">
                    <h3 className="text-slate-900 font-bold text-3xl mb-1">
                        Get in <span className="text-teal-600">touch</span>
                    </h3>
                    <p className="text-sm text-slate-600 mb-8">
                        The information will only be used to reach out to you for JobPortal related services.
                    </p>

                    <form className="space-y-5" method="post" action="/jobseeker/contact" id="gform">
                        <div>
                            <label className="block text-sm text-slate-800 mb-2">Full Name</label>
                            <input type="text" name="name" id="name" placeholder="Your name"
                                className="w-full px-4 py-3 rounded-xl border border-black/40 placeholder-slate-400 focus:outline-none focus:border-teal-400"/>
                                <p id="nameFeedback" className="text-red-500 hidden text-sm"></p>
                        </div>

                        <div>
                            <label className="block text-sm text-slate-800 mb-2">Email Address</label>
                            <input type="email" name="email" id="email" placeholder="you@example.com"
                                className="w-full px-4 py-3 rounded-xl border border-black/40 placeholder-slate-400 focus:outline-none focus:border-teal-400"/>
                                <p id="emailFeedback" className="text-red-500 hidden text-sm"></p>
                        </div>

                        <div>
                            <label className="block text-sm text-slate-800 mb-2">Message</label>
                            <textarea rows="4" name="message" id="message" placeholder="Write your message here..."
                                className="w-full px-4 py-3 rounded-xl border border-black/40 placeholder-slate-400 focus:outline-none focus:border-teal-400"/>
                            <p id="messageFeedback" className="text-red-500 hidden text-sm"></p>
                        </div>

                        <button type="submit"
                            className="w-full px-6 py-3 rounded-xl bg-teal-700/90 text-white font-medium hover:bg-teal-600/70 transition">
                            Send Message
                        </button>
                    </form>
                    <p className="text-red-500 hidden text-sm mt-2" id="feedback"></p>
                </div>
            </section>
        </div>
    )
}

export default Contact