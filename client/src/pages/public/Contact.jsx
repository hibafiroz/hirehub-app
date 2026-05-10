import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import API from '../../api/axios'
import AnimatedSection from '../../components/AnimatedSection'
import toast from 'react-hot-toast'

function Contact() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [formData, setFormData] = useState({
        name: "", email: "", message: ""
    })
    const [formErr, setFormErr] = useState({})
    const [sending, setSending] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })

        // remove error for that field
        setFormErr((prev) => ({
            ...prev,
            [`${name}Err`]: ""
        }))

        // remove full form error if user starts typing
        setFormErr((prev) => ({
            ...prev,
            fullErr: ""
        }))

    }

    const handleForm = async (e) => {
        e.preventDefault()
        let errors = {}

        if (!formData.name && !formData.email && !formData.message) {
            errors.fullErr = 'Please fill the form'
            setFormErr(errors)
            return
        }

        if (!formData.name) {
            errors.nameErr = 'Enter your full name'
        }

        if (!formData.email) {
            errors.emailErr = 'Enter your email'
        }

        if (!formData.message) {
            errors.messageErr = 'Enter your message here'
        }

        if (Object.keys(errors).length > 0) {
            setFormErr(errors)
            return
        }

        setSending(true)

        try {
            const sendMessage = await API.post('/contact', formData)
            toast.success('Thanks! We will get back to you soon')
            setFormData({ name: "", email: "", message: "" })
        } catch (err) {
            toast.success('Failed to send message!')
        } finally {
            setSending(false)
        }
    }

    return (
        <div>
            <div className="fixed inset-0 bg-cover bg-center -z-10" style={{ backgroundImage: "url('/ui/background3.png')" }}></div>
            <div className="fixed inset-0 bg-white/70 -z-10"></div>

            <AnimatedSection>
                <section className="mt-50 md:flex justify-center items-center h-screen sm:mt-28 lg:mt-30 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 items-start place-items-center lg:place-items-stretch">
                        <div className="hidden lg:block space-y-6">
                            <div className="border border-black/20 bg-white/50 shadow-[0_18px_40px_rgba(15,118,110,0.45)] rounded-2xl px-5 sm:px-7 lg:px-9 py-6 sm:py-8 w-full max-w-md sm:max-w-xl lg:max-w-none">
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



                        <div className="border border-black/20 bg-white/50 shadow-[0_18px_40px_rgba(15,118,110,0.45)] rounded-2xl px-5 sm:px-7 lg:px-9 py-6 sm:py-8 w-full max-w-2xl mx-auto lg:max-w-none">
                            <h3 className="text-2xl sm:text-3xl text-slate-900 font-bold mb-1 leading-snug">
                            Get in <span className="text-teal-600">touch</span>
                        </h3>
                        <p className="text-sm text-slate-600 mb-6 sm:mb-8 leading-relaxed">
                            The information will only be used to reach out to you for JobPortal related services.
                        </p>

                        <form className="space-y-4 sm:space-y-5" onSubmit={handleForm}>
                            <div>
                                <label className="block text-sm text-slate-800 mb-2">Full Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name"
                                    className="w-full px-4 py-3 text-sm sm:text-base rounded-xl border border-black/40 placeholder-slate-400 focus:outline-none focus:border-teal-400" />
                                <p id="nameFeedback" className="text-red-500 text-sm">{formErr.nameErr}</p>
                            </div>

                            <div>
                                <label className="block text-sm text-slate-800 mb-2">Email Address</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com"
                                    className="w-full px-4 py-3 text-sm sm:text-base rounded-xl border border-black/40 placeholder-slate-400 focus:outline-none focus:border-teal-400" />
                                <p id="emailFeedback" className="text-red-500 text-sm">{formErr.emailErr}</p>
                            </div>

                            <div>
                                <label className="block text-sm text-slate-800 mb-2">Message</label>
                                <textarea rows="4" name="message" value={formData.message} onChange={handleChange} placeholder="Write your message here..."
                                    className="w-full px-4 py-3 text-sm sm:text-base rounded-xl border border-black/40 placeholder-slate-400 focus:outline-none focus:border-teal-400" />
                                <p id="messageFeedback" className="text-red-500 text-sm">{formErr.messageErr}</p>
                                <p className="text-red-500 text-sm mt-2" id="feedback">{formErr.fullErr}</p>
                            </div>

                            <button type="submit"
                                disabled={sending}
                  className={`w-full py-3 rounded-xl text-white transition font-medium 
              ${sending ? "bg-teal-400 cursor-not-allowed" : "bg-teal-700/90 hover:bg-teal-400"}`}
                >
                  {sending ? "Sending..." : "Send Message"}
                            </button>
                        </form>

                    </div>
                </div>
                </section>
            </AnimatedSection>
        </div>
    )
}

export default Contact