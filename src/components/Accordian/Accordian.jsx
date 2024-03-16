const Accordian = () => {
    const highlightText = {
        background: 'linear-gradient(to bottom, transparent 70%, #32E0C4 30%)'
    }
    return (
            <div className="max-w-screen-md mx-auto my-20">
                <p className="text-center text-5xl font-semibold mb-10 text-[#222831]"><span style={highlightText} >Frequently Asked Questions</span></p>
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
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        How do I participate in book discussions and connect with other readers?
                    </div>
                    <div className="collapse-content">
                        <p>Varies by vendor, features, and business size; affordable options available.</p>
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
    );
};

export default Accordian;