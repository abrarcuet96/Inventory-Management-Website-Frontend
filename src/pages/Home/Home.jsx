// import Accordian from "../../components/Accordian/Accordian";
import Banner from "../../components/Banner/Banner";
import CreateStoreSection from "../../components/CreateStoreSection/CreateStoreSection";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";
import MeetPeople from "../../components/MeetPeople/MeetPeople";
import RegistrationSection from "../../components/RegistrationSection/RegistrationSection";
// import Testimonials from "../../components/Testimonials/Testimonials";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Features></Features>
            <CreateStoreSection></CreateStoreSection>
            <MeetPeople></MeetPeople>
            <RegistrationSection></RegistrationSection>
            {/* <Accordian></Accordian> */}
            {/* <Testimonials></Testimonials> */}
            <Footer></Footer>
        </div>
    );
};

export default Home;