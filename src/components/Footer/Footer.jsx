
const Footer = () => {
    return (
        <div>
            <footer className="footer p-10 bg-[#353e4b] text-slate-200">
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Inventory Tracking and Management</a>
                    <a className="link link-hover">Forecasting and Demand Planning</a>
                    <a className="link link-hover">Inventory Optimization</a>
                    <a className="link link-hover">Order Fulfillment</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Explore</h6>
                    <a className="link link-hover">Features</a>
                    <a className="link link-hover">Enterprise</a>
                    <a className="link link-hover">Security</a>
                    <a className="link link-hover">Pricing</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Apps</h6>
                    <a className="link link-hover">Mac</a>
                    <a className="link link-hover">Windows</a>
                    <a className="link link-hover">iPhone</a>
                    <a className="link link-hover">Android</a>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;