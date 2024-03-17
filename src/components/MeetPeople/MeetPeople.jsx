import { useEffect, useState } from "react";

const MeetPeople = () => {
    const highlightText1 = {
        background: 'linear-gradient(to bottom, transparent 80%, #32E0C4 20%)'
    }
    const highlightText2 = {
        background: 'linear-gradient(to bottom, transparent 70%, #32E0C4 30%)'
    }
    const [peoples, setPeople] = useState([]);
    useEffect(() => {
        fetch("employee.json")
            .then(res => res.json())
            .then(data => setPeople(data))
    }, []);
    return (
        <div className="max-w-screen-2xl mx-auto my-20">
            <div>
                <p className="text-center text-4xl lg:text-6xl font-semibold mb-10 text-[#222831]"><span style={highlightText2} >Meet Our Team</span></p>
                <p className="max-w-screen-xl text-center px-2 text-xl lg:text-2xl mb-10 mx-auto">Meet Our Team of Passionate Professionals Leading the Way in Inventory Management Solutions!</p>
            </div>
            <div className="grid p-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {
                    peoples.map(people =>
                            <div key={people.id} className="card lg:w-80 lg:h-96  shadow-xl border-2 border-dashed border-black">
                                <div className="card-body flex items-center">
                                    <h2 className="card-title text-3xl font-bold my-7 text-black"><span  style={highlightText1} >{people.name}</span></h2>
                                    <p className="text-black text-lg">{people.designation}</p>
                                </div>
                                <figure><img className="w-full" src={people.image} alt="Shoes" /></figure>
                            </div>
                        )
                }
            </div>
        </div>
    );
};

export default MeetPeople;