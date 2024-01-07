import SectionContainer from "../Container/SectionContainer";

const Accordian = () => {
    return (
        <SectionContainer>
            <div className=" mx-auto my-10 border-2 p-10 rounded-lg">
                <h2 className="text-center text-5xl font-bold mb-5 text-blue-800">Frequently Asked Questions</h2>
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" checked="checked" />
                    <div className="collapse-title text-xl font-medium">
                    What are the benefits of using inventory management software?
                    </div>
                    <div className="collapse-content">
                        <p>Enhanced accuracy, reduced costs, increased efficiency, and improved decision-making.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                    What features should I look for in inventory management software?
                    </div>
                    <div className="collapse-content">
                        <p>Real-time inventory tracking, stock replenishment, order processing, and comprehensive reporting.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        How do I participate in book discussions and connect with other readers?
                    </div>
                    <div className="collapse-content">
                        <p>Varies by vendor, features, and business size; affordable options available.</p>
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
};

export default Accordian;