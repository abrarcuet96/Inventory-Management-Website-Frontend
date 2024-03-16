import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

const RegistrationSection = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_0y6tdqa', 'template_6agneep', form.current, '4N5pmSTsoRg7yh2YL')
            .then((result) => {
                console.log(result.text);
                form.current.reset();
                toast.success("message sent successfully");

            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <div className='bg-[#353e4b]'>
            <div className="hero min-h-[60vh] max-w-screen-2xl mx-auto bg-[#222831] rounded-b-full">
                <div className="hero-content flex p-10">
                    <div>
                        <p className="text-7xl font-semibold mb-10 text-white"><span>Want more insights?</span></p>
                        <p className="max-w-screen-xl text-white text-2xl mb-10 mx-auto">Send us an email.</p>
                    </div>
                    <div
                        className="card shrink-0 w-full max-w-sm shadow-2xl backdrop-blur-sm bg-[#353e4b] rounded-md">
                        <form className="card-body" ref={form} onSubmit={sendEmail}>
                            <input className='bg-[#222831]  text-lg text-black p-5' placeholder='Full Name' type="text" name="user_name" />
                            <input className='bg-[#222831]  text-lg text-black p-5' placeholder='Your Email' type="email" name="user_email" />
                            <textarea className='bg-[#222831] text-lg text-black p-5' placeholder='Details' name="message" />
                            <div className='text-center mt-6'>
                                <button type="submit" className='btn btn-ghost btn-lg text-xl btn-outline text-gray-400 w-full'>Send</button>

                            </div>
                        </form>
                    </div>
                </div>
                <Toaster />
            </div>
        </div>
    );
};

export default RegistrationSection;