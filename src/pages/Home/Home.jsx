import Accordian from "../../components/Accordian/Accordian";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import RegistrationSection from "../../components/RegistrationSection/RegistrationSection";
import Testimonials from "../../components/Testimonials/Testimonials";

const Home = () => {
    return (
        <div className="">
            <Banner></Banner>
            <RegistrationSection></RegistrationSection>
            <Accordian></Accordian>
            <Testimonials></Testimonials>
            <Footer></Footer>
        </div>
    );
};

export default Home;