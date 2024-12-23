import React from 'react'
import './Aboutus.css';
import AboutusLayout from '../components/shared/Layout/AboutusLayout';


const Aboutus = () => {
    return (
        <AboutusLayout>

          <div className="container my-5">
            {/* Mission and Vision */}
            <section className="mb-5">
            <h2 className="text-center text-light mb-4 ">About HemoCare Blood Bank</h2>
            <img src="./assets/images/banner2.jpg" className="card-img-top" alt="blood donation condition" width="80px" height="350px" />
              
              <div className="row">
                <div className="col-md-6 mt-4 text-light">
                  <h4>Our Mission</h4>
                  <p>
                    At Hemocare, our mission is to ensure the safe and timely availability of blood and blood components to those in need. We strive to promote voluntary blood donation and maintain a robust and efficient blood supply chain.
                  </p>
                </div>
                <div className="col-md-6 mt-4 text-light">
                  <h4>Our Vision</h4>
                  <p>
                    We envision a world where every individual has access to safe blood transfusions, and blood donation is a communal responsibility embraced by all. Our goal is to lead in blood management practices and innovate to save lives.
                  </p>
                </div>
              </div>
            </section> 
 

    
            {/* Our Team */}
            <section className="mb-5 text-light">
              <h2 className="text-center mb-4">Meet Our Team</h2>
              <div className="row">
                {/* Team Member 1 */}
                <div className="col-md-3 text-center">
                  <img
                    src="./assets/images/profile1.jpg"
                    alt="Team Member 1"
                    className="rounded-circle mb-3"
                    style={{ width: '150px', height: '150px' }}
                  />
                  <h5>M. Fathima Samla </h5>
                  <p>Full Stack</p>
                </div>
                {/* Team Member 2 */}
                <div className="col-md-3 text-center">
                  <img
                    src="./assets/images/profile1.jpg"
                    alt="Team Member 2"
                    className="rounded-circle mb-3"
                    style={{ width: '150px', height: '150px' }}
                  />
                  <h5>H. Shaffron Wazny</h5>
                  <p>Front-End</p>
                </div>
                {/* Team Member 3 */}
                <div className="col-md-3 text-center">
                  <img
                    src="./assets/images/profile2.jpg"
                    alt="Team Member 3"
                    className="rounded-circle mb-3"
                    style={{ width: '150px', height: '150px' }}
                  />
                  <h5>I.L. Mohamed Kamil</h5>
                  <p>Back-End</p>
                </div>
                {/* Team Member 4 */}
                <div className="col-md-3 text-center">
                  <img
                    src="./assets/images/profile2.jpg"
                    alt="Team Member 3"
                    className="rounded-circle mb-3"
                    style={{ width: '150px', height: '150px' }}
                  />
                  <h5>A.M.M. Sajeeth</h5>
                  <p>Back-End</p>
                </div>
              </div>
            </section>
    
            {/* Contact Information */}
            <section>
              <h2 className="text-center text-light mb-4">Contact Us</h2>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label text-light">
                        Name
                      </label>
                      <input type="text" className="form-control " id="name" placeholder="Your Name" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label text-light">
                        Email Address
                      </label>
                      <input type="email" className="form-control" id="email" placeholder="name@example.com" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label text-light">
                        Message
                      </label>
                      <textarea className="form-control" id="message" rows="4" placeholder="Your Message"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </section>
          </div>
          </AboutusLayout>
      );
    };
    


export default Aboutus
