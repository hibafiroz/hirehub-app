import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { UserContext } from "../../context/UserContext";

function Register() {
    const navigate = new useNavigate()
    const { setUser } = useContext(UserContext)

    const [formData, setFormData] = useState({
        name: '', email: '', role: '', password: '', confirmPassword: ''
    })

    const [formErr, setFormErr] = useState({
        nameErr: '', emailErr: '', roleErr: '', passwordErr: '', confirmPasswordErr: '', FullErr: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        let newErr = {}
        
        if (!formData.password && !formData.confirmPassword && !formData.name && !formData.email && !formData.role) {
            newErr.fullErr = 'Please fill the form'
            return
        }

        if (!formData.name) newErr.nameErr = 'Please enter your name'
        if (!formData.email) newErr.emailErr = 'Please enter your email'
        if (!formData.role) newErr.roleErr = 'Please Select a role'
        if (!formData.password) newErr.passwordErr = 'Please enter your password'
        if (formData.password !== formData.confirmPassword) newErr.passwordErr = 'Password do not match'
        
        if (Object.keys(newErr).length > 0) {
            setFormErr(newErr)
            return
        }

        try {
            const res = await API.post('/authentication/register', formData)
            setUser(res.data.user)
            navigate('/browseJobs')
        } catch (err) {
            console.log(err.data.message)
        }
    }

    return (
        <div className="mt-3 relative min-h-screen flex bg-center bg-cover bg-no-repeat items-center gap-36 justify-center px-4"
            style={{ backgroundImage: "url('/ui/background3.png')" }}>
            <div className="absolute inset-0 bg-white/60"></div>

            <div className="relative z-10 flex gap-36 justify-center items-center">

                <div className="sm:hidden md:block flex flex-col">
                    <div className="relative z-10 space-y-6 py-12">
                        <h1 className="text-5xl text-slate-900 font-semibold space-y-2">
                            <div>Create your account</div>
                            <div> & unlock <span className="text-teal-700"> new career</span></div>
                            <div className="text-teal-600">opportunities</div>
                        </h1>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Track applications, save jobs, and get noticed by recruiters <br /> with a clean professional profile.
                        </p>
                    </div>

                    <div className="relative z-10 space-y-3">
                        <div className="flex items-center border border-black/20 bg-white/20 p-2 rounded-2xl shadow-[0_18px_40px_rgba(15,118,110,0.45)] gap-3 text-sm">
                            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center border border-black/20 text-salte-900 text-xs">
                                01
                            </div>
                            <p className="text-teal-600">Apply faster with saved profile & resume.</p>
                        </div>

                        <div className="flex items-center gap-3 bg-white/20 text-sm border border-black/20 p-2 rounded-2xl shadow-[0_18px_40px_rgba(15,118,110,0.45)]">
                            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center border border-black/20 text-salte-900 text-xs">
                                02
                            </div>
                            <p className="text-teal-600">Get matched with jobs that fit your skills.</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 mt-12 w-[26rem] rounded-3xl bg-white shadow-[0_18px_50px_rgba(15,118,110,0.45)]">
                    <div>
                        <h2 className="text-lg sm:text-3xl font-semibold text-salte-900 leading-tight">
                            <span className="text-teal-600">Create</span> your account
                        </h2>
                        <p className="text-xs text-slate-600 mb-6 mt-2">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-teal-600 font-medium hover:underline hover:text-teal-400"
                            >
                                Login
                            </Link>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="text-[13px] text-slate-700">Full name</label>
                            <input name="name" onChange={handleChange} type="text" placeholder="Enter your name" className="w-full rounded-lg border border-black/30 bg-white/80 px-3.5 py-2 text-[13px] outline-none shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                            <p className="font-semibold mt-1 text-xs text-red-500">{formErr.nameErr}</p>
                        </div>

                        <div className="mb-3">
                            <label className="block text-[13px] text-slate-700">Email</label>
                            <input name="email" onChange={handleChange} type="email" placeholder="Enter your email" className="w-full rounded-lg border border-black/30 bg-white/80 px-3.5 py-2 text-[13px] outline-none shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                            <p className="text-xs font-semibold mt-1 text-red-500">{formErr.emailErr}</p>
                        </div>

                        <div className="mb-3">
                            <label className="block text-[13px] text-slate-700">Your role</label>
                            <select name="role" onChange={handleChange} className="w-full rounded-lg border border-black/30 bg-white/80 px-3.5 py-2 text-[13px] outline-none shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                                <option>Select role</option>
                                <option value="jobseeker">Job Seeker</option>
                                <option value="recruiter">Recruiter</option>
                            </select>
                            <p className="text-xs font-semibold text-red-500">{formErr.roleErr}</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3">
                            <div className="mb-3">
                                <label className="block text-[13px] text-slate-700">Password</label>
                                <input onChange={handleChange} name="password" type="password" placeholder="••••••••" className="w-full rounded-lg border border-black/30 bg-white/80 px-3.5 py-2 text-[13px] outline-none shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                                <p className="text-xs mt-1 font-semibold text-red-600">{formErr.passwordErr}</p>
                            </div>

                            <div className="mb-3">
                                <label className="block text-[13px] text-slate-700">Confirm Password</label>
                                <input onChange={handleChange} name="confirmPassword" type="password" placeholder="••••••••" className="w-full rounded-lg border border-black/30 bg-white/80 px-3.5 py-2 text-[13px] outline-none shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                                <p className="mt-1 font-semibold text-xs text-red-600">{formErr.confirmPasswordErr}</p>
                            </div>
                        </div>

                        <button type="submit" className="w-full mt-2 rounded-lg bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(15,118,110,0.45)] hover:scale-[1.03] transition">Create Account</button>
                        <p name='fullErr' className="text-red-600 font-semibold text-xs mt-1">{formErr.allErr}</p>
                        <p className="text-[10.5px] text-slate-600 text-center mt-2">By creating an account, you'll be able to save jobs, track your applications, and get better matches.</p>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Register