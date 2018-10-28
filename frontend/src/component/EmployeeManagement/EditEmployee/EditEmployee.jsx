import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class EditEmployee extends Component {
  state = {
    certifications: [
      {
        certificationName: 'Conductor',
        certificationDate: '11-11-1111',
      }
    ],
  };

  render() {
    return (
      <section>
        <h2>Edit Employee</h2>
        <form>
          <div>
            <label>First Name:
              <div>
                <input type="text" defaultValue="John" />
              </div>
            </label>
          </div>
          <div>
            <label>Last Name:
              <div>
                <input type="text" defaultValue="Doe"/>
              </div>
            </label>
          </div>
          <div>
            <label>Home Base:
               <div>
                <select>
                  <option value="">List of Terminals</option>
                </select>
              </div>
            </label>
          </div>
          <div>
            <label>Certifications:
              <div>
                {this.state.certifications[0].certificationName}   {this.state.certifications[0].certificationDate}
                <button>Remove Certification</button>
              </div>
            </label>
            <select name="" id="">
              <option value="">List of available certs from database</option>
            </select>
            <label>Certification Date: </label>
            <input type="date" name="" id=""/>
            <button>Add Certification</button>
          </div>
          <div>
            <button>Submit</button>
            <Link to="/employees">Cancel</Link>
          </div>
        </form>
      </section>
    );
  }
}

export default EditEmployee;