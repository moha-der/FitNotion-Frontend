'use client'
export default function Page() {
    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-24">
                    <div className="flex items-center lg:mb-0 mb-10">
                        <div>
                            <h4 className="text-webColor text-base font-medium leading-6 mb-4 lg:text-left text-center">Contactános</h4>
                            <h2 className="text-gray-900 font-manrope text-4xl font-semibold leading-10 mb-9 lg:text-left text-center">Rellena el formulario</h2>
                            <form onSubmit={(e) => e.preventDefault()}> {/* Add form submission handling */}
                                <input 
                                    type="text" 
                                    className="w-full h-14 shadow-sm text-gray-600 placeholder-text-400 text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none py-2 px-4 mb-8" 
                                    placeholder="Nombre" 
                                    required 
                                />
                                <input 
                                    type="email" 
                                    className="w-full h-14 shadow-sm text-gray-600 placeholder-text-400 text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none py-2 px-4 mb-8" 
                                    placeholder="Email" 
                                    required 
                                />
                                <textarea 
                                    id="message" 
                                    className="w-full h-48 shadow-sm resize-none text-gray-600 placeholder-text-400 text-lg font-normal leading-7 rounded-2xl border border-gray-200 focus:outline-none px-4 py-4 mb-8" 
                                    placeholder="Mensaje" 
                                    required 
                                ></textarea>
                                <button 
                                    type="submit" 
                                    className="w-full h-12 text-center text-white text-base font-semibold leading-6 rounded-full bg-webColor shadow transition-all duration-700 hover:bg-indigo-800"
                                >
                                    Enviar
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="lg:max-w-xl w-full h-[450px] flex mx-auto items-center justify-center bg-cover bg-no-repeat" style={{ backgroundImage: "url('https://restaurantecasaantonio.net/wp-content/uploads/2018/08/10-consejos-para-una-alimentaci%C3%B3n-saludable.jpg')" }} aria-label="Contact Background Image">
                    </div>
                </div>
            </div>
        </section>
    );
}
